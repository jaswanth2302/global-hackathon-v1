// API functions for communicating with Supabase Edge Functions

const API_BASE_URL = import.meta.env.VITE_SUPABASE_URL + '/functions/v1'

export const api = {
  // Generate AI response for chat
  async generateAIResponse(message, history, sessionId) {
    const response = await fetch(`${API_BASE_URL}/generate-ai-response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        message,
        history,
        sessionId,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate AI response')
    }

    return response.json()
  },

  // Generate memory blog from chat history
  async generateMemoryBlog(memoryId) {
    const response = await fetch(`${API_BASE_URL}/generate-memory-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ memoryId }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate memory blog')
    }

    return response.json()
  },

  // Export memory as PDF
  async exportMemoryPDF(memoryId) {
    const response = await fetch(`${API_BASE_URL}/export-memory-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ memoryId }),
    })

    if (!response.ok) {
      throw new Error('Failed to export PDF')
    }

    return response.blob()
  },

  // Create shareable link for memory
  async createShareableLink(memoryId) {
    const response = await fetch(`${API_BASE_URL}/create-shareable-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ memoryId }),
    })

    if (!response.ok) {
      throw new Error('Failed to create shareable link')
    }

    return response.json()
  }
}
