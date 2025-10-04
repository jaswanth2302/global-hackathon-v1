import React, { createContext, useContext, useState } from 'react'
import { db } from '../lib/supabase'
import { useAuth } from './AuthContext'

const MemoryContext = createContext({})

export const useMemory = () => {
  const context = useContext(MemoryContext)
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider')
  }
  return context
}

export const MemoryProvider = ({ children }) => {
  const { user } = useAuth()
  const [memories, setMemories] = useState([])
  const [currentMemory, setCurrentMemory] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const loadMemories = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const userMemories = await db.getUserMemories(user.id)
      setMemories(userMemories)
    } catch (error) {
      console.error('Error loading memories:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadChatHistory = async (sessionId = null) => {
    if (!user) return
    
    try {
      const history = await db.getChatHistory(user.id, sessionId)
      setChatHistory(history)
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  const saveMemory = async (memoryData) => {
    if (!user) return
    
    try {
      const memory = await db.createMemory({
        ...memoryData,
        user_id: user.id,
      })
      setMemories(prev => [memory, ...prev])
      return memory
    } catch (error) {
      console.error('Error saving memory:', error)
      throw error
    }
  }

  const saveChatMessage = async (message, sessionId) => {
    if (!user) return
    
    try {
      const savedMessage = await db.saveChatMessage({
        ...message,
        user_id: user.id,
        session_id: sessionId,
      })
      setChatHistory(prev => [...prev, savedMessage])
      return savedMessage
    } catch (error) {
      console.error('Error saving chat message:', error)
      throw error
    }
  }

  const generateMemoryBlog = async (memoryId) => {
    try {
      const response = await fetch('/api/generate-memory-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memoryId }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate memory blog')
      }
      
      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error generating memory blog:', error)
      throw error
    }
  }

  const exportMemoryPDF = async (memoryId) => {
    try {
      const response = await fetch('/api/export-memory-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memoryId }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to export PDF')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `memory-${memoryId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      throw error
    }
  }

  const value = {
    memories,
    currentMemory,
    chatHistory,
    loading,
    loadMemories,
    loadChatHistory,
    saveMemory,
    saveChatMessage,
    generateMemoryBlog,
    exportMemoryPDF,
    setCurrentMemory,
    setChatHistory,
  }

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  )
}
