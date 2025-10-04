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
    const { message, history, sessionId } = await req.json()

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

    // Build conversation context
    const systemPrompt = `You are Memory Keeper AI, a friendly, warm, and empathetic assistant designed to help grandparents preserve their precious memories. Your role is to:

1. Ask thoughtful, guided questions about their life experiences
2. Show genuine interest and empathy in their stories
3. Follow up on interesting details they share
4. Help them explore different aspects of their life (childhood, family, career, life lessons, memorable events)
5. Create a comfortable, conversational atmosphere
6. Remember context from previous messages in the conversation

Guidelines:
- Be warm, patient, and encouraging
- Ask one question at a time
- Show genuine curiosity about their experiences
- Use follow-up questions to dive deeper into interesting stories
- Be respectful of their privacy and comfort level
- If they seem hesitant, gently encourage but don't pressure
- Celebrate their memories and experiences

Current conversation context: ${JSON.stringify(history.slice(-10))}`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-10).map(msg => ({
        role: msg.sender === 'USER' ? 'user' : 'assistant',
        content: msg.message
      })),
      { role: 'user', content: message }
    ]

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 500,
      temperature: 0.8,
    })

    const aiResponse = completion.choices[0].message.content

    // Save the conversation to database
    await supabaseClient
      .from('chat_history')
      .insert([
        {
          user_id: (await supabaseClient.auth.getUser()).data.user?.id,
          message: message,
          sender: 'USER',
          session_id: sessionId,
          timestamp: new Date().toISOString(),
        },
        {
          user_id: (await supabaseClient.auth.getUser()).data.user?.id,
          message: aiResponse,
          sender: 'AI',
          session_id: sessionId,
          timestamp: new Date().toISOString(),
        }
      ])

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error generating AI response:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
