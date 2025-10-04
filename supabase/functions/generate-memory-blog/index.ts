import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from 'https://esm.sh/openai@4.20.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { memoryId } = await req.json()

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get chat history for the memory
    const { data: chatHistory, error: chatError } = await supabaseClient
      .from('chat_history')
      .select('*')
      .eq('session_id', memoryId)
      .order('timestamp', { ascending: true })

    if (chatError) throw chatError

    // Get user info
    const { data: user } = await supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Generate blog content
    const blogPrompt = `Transform this conversation into a beautiful, well-structured blog post that captures the essence of the memories shared. 

Conversation:
${chatHistory.map(msg => `${msg.sender}: ${msg.message}`).join('\n')}

Please create:
1. A compelling title
2. A brief introduction
3. Well-organized sections based on the topics discussed
4. A meaningful conclusion
5. Suggested tags
6. A summary

Format the response as JSON with the following structure:
{
  "title": "Blog title",
  "content": "Full blog content in markdown format",
  "summary": "Brief summary",
  "tags": ["tag1", "tag2", "tag3"],
  "excerpt": "Short excerpt for preview"
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a skilled writer who creates beautiful, engaging blog posts from personal conversations.' },
        { role: 'user', content: blogPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    })

    const blogData = JSON.parse(completion.choices[0].message.content)

    // Save memory to database
    const { data: memory, error: memoryError } = await supabaseClient
      .from('memories')
      .insert({
        user_id: user.user.id,
        title: blogData.title,
        content: blogData.content,
        summary: blogData.summary,
        tags: blogData.tags,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (memoryError) throw memoryError

    return new Response(
      JSON.stringify({ 
        success: true, 
        memory: memory,
        blog: blogData 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error generating memory blog:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
