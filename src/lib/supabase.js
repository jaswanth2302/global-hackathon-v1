import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database helper functions
export const db = {
  // Users
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Memories
  async createMemory(memory) {
    const { data, error } = await supabase
      .from('memories')
      .insert(memory)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserMemories(userId) {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getMemory(memoryId) {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .eq('id', memoryId)
      .single()
    
    if (error) throw error
    return data
  },

  // Chat History
  async saveChatMessage(message) {
    const { data, error } = await supabase
      .from('chat_history')
      .insert(message)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getChatHistory(userId, sessionId = null) {
    let query = supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: true })
    
    if (sessionId) {
      query = query.eq('session_id', sessionId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data
  },

  // Blog Exports
  async createBlogExport(exportData) {
    const { data, error } = await supabase
      .from('blog_exports')
      .insert(exportData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getBlogExport(memoryId) {
    const { data, error } = await supabase
      .from('blog_exports')
      .select('*')
      .eq('memory_id', memoryId)
      .single()
    
    if (error) throw error
    return data
  }
}
