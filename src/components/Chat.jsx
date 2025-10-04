import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useMemory } from '../contexts/MemoryContext'
import { Heart, Send, Mic, MicOff, User, Bot, Download, BookOpen } from 'lucide-react'

const Chat = () => {
  const { user, signOut } = useAuth()
  const { chatHistory, saveChatMessage, generateMemoryBlog, loadChatHistory } = useMemory()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [sessionId] = useState(() => `session_${Date.now()}`)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  useEffect(() => {
    loadChatHistory(sessionId)
  }, [sessionId, loadChatHistory])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    setIsLoading(true)

    try {
      // Save user message
      await saveChatMessage({
        message: userMessage,
        sender: 'USER',
        timestamp: new Date().toISOString(),
      })

      // Generate AI response
      const aiResponse = await generateAIResponse(userMessage, chatHistory)
      
      // Save AI response
      await saveChatMessage({
        message: aiResponse,
        sender: 'AI',
        timestamp: new Date().toISOString(),
      })

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (userMessage, history) => {
    try {
      const response = await fetch('/api/generate-ai-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: history,
          sessionId: sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate AI response')
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Error generating AI response:', error)
      return "I'm sorry, I'm having trouble responding right now. Could you please try again?"
    }
  }

  const handleGenerateBlog = async () => {
    try {
      setIsLoading(true)
      const blog = await generateMemoryBlog(sessionId)
      // Handle blog generation success
      console.log('Blog generated:', blog)
    } catch (error) {
      console.error('Error generating blog:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording implementation would go here
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-sage-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sage-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-warm-600" />
            <div>
              <h1 className="text-xl font-bold text-sage-800">Memory Keeper</h1>
              <p className="text-sm text-sage-600">Preserve your precious memories</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGenerateBlog}
              disabled={isLoading || chatHistory.length < 2}
              className="flex items-center space-x-2 bg-sage-500 text-white px-4 py-2 rounded-lg hover:bg-sage-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BookOpen className="h-4 w-4" />
              <span>Generate Blog</span>
            </button>
            <button
              onClick={signOut}
              className="text-sage-600 hover:text-sage-800 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-warm-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-sage-800 mb-2">
                  Welcome to Memory Keeper!
                </h3>
                <p className="text-sage-600 mb-4">
                  I'm here to help you preserve your precious memories. Let's start with a simple question:
                </p>
                <div className="bg-warm-50 p-4 rounded-lg text-left max-w-md mx-auto">
                  <p className="text-warm-800 font-medium">
                    "What's one of your favorite childhood memories?"
                  </p>
                </div>
              </div>
            )}

            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.sender === 'USER'
                      ? 'bg-warm-500 text-white'
                      : 'bg-sage-100 text-sage-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.sender === 'AI' && (
                      <Bot className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                    )}
                    {msg.sender === 'USER' && (
                      <User className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-sage-100 text-sage-800 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-sage-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-sage-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(e)
                    }
                  }}
                  placeholder="Share your memory..."
                  className="w-full resize-none border border-sage-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-warm-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'text-sage-400 hover:text-sage-600'
                  }`}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="bg-warm-500 text-white p-3 rounded-lg hover:bg-warm-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
