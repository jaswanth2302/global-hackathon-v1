import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMemory } from '../contexts/MemoryContext'
import { Heart, ArrowLeft, BookOpen, Download, Share2, Calendar, Tag, Eye } from 'lucide-react'

const MemoryDashboard = () => {
  const { user, signOut } = useAuth()
  const { memories, loadMemories, exportMemoryPDF, loading } = useMemory()
  const [selectedMemory, setSelectedMemory] = useState(null)

  useEffect(() => {
    loadMemories()
  }, [loadMemories])

  const handleExportPDF = async (memoryId) => {
    try {
      await exportMemoryPDF(memoryId)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-sage-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sage-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/chat" className="text-sage-600 hover:text-sage-800 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-warm-600" />
              <div>
                <h1 className="text-xl font-bold text-sage-800">Your Memories</h1>
                <p className="text-sm text-sage-600">Preserve and share your life stories</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/chat" 
              className="bg-warm-500 text-white px-4 py-2 rounded-lg hover:bg-warm-600 transition-colors"
            >
              New Memory
            </Link>
            <button
              onClick={signOut}
              className="text-sage-600 hover:text-sage-800 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-500 mx-auto mb-4"></div>
            <p className="text-sage-600">Loading your memories...</p>
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-800 mb-2">No memories yet</h3>
            <p className="text-sage-600 mb-6">Start a conversation to preserve your first memory</p>
            <Link 
              to="/chat" 
              className="bg-warm-500 text-white px-6 py-3 rounded-lg hover:bg-warm-600 transition-colors"
            >
              Start Your First Memory
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-warm-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-warm-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-sage-800">{memories.length}</p>
                    <p className="text-sage-600">Total Memories</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-sage-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-sage-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-sage-800">
                      {memories.filter(m => {
                        const created = new Date(m.created_at)
                        const now = new Date()
                        return created.toDateString() === now.toDateString()
                      }).length}
                    </p>
                    <p className="text-sage-600">Today</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-warm-100 p-3 rounded-lg">
                    <Share2 className="h-6 w-6 text-warm-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-sage-800">
                      {memories.filter(m => m.share_link).length}
                    </p>
                    <p className="text-sage-600">Shared</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Memories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((memory) => (
                <div key={memory.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-sage-800 line-clamp-2">
                        {memory.title || 'Untitled Memory'}
                      </h3>
                      <button
                        onClick={() => setSelectedMemory(selectedMemory === memory.id ? null : memory.id)}
                        className="text-sage-400 hover:text-sage-600 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-sage-600 text-sm mb-4 line-clamp-3">
                      {memory.summary || memory.content?.substring(0, 150) + '...'}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-sage-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(memory.created_at)}</span>
                      </div>
                      {memory.tags && memory.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Tag className="h-4 w-4" />
                          <span>{memory.tags.length} tags</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleExportPDF(memory.id)}
                        className="flex items-center space-x-2 bg-sage-500 text-white px-3 py-2 rounded-lg hover:bg-sage-600 transition-colors text-sm"
                      >
                        <Download className="h-4 w-4" />
                        <span>PDF</span>
                      </button>
                      {memory.share_link && (
                        <button className="flex items-center space-x-2 border border-sage-300 text-sage-700 px-3 py-2 rounded-lg hover:bg-sage-50 transition-colors text-sm">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded View */}
                  {selectedMemory === memory.id && (
                    <div className="border-t border-sage-200 p-6 bg-sage-50">
                      <div className="prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: memory.content }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MemoryDashboard
