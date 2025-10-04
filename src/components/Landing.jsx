import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Users, BookOpen, Sparkles } from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-sage-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-warm-600" />
            <span className="text-2xl font-bold text-sage-800">Memory Keeper</span>
          </div>
          <Link 
            to="/login" 
            className="bg-warm-500 text-white px-6 py-2 rounded-full hover:bg-warm-600 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-sage-800 mb-6">
            Preserve Precious
            <span className="text-warm-600 block">Family Memories</span>
          </h1>
          <p className="text-xl text-sage-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with your grandparents through AI-powered conversations that capture 
            their life stories and transform them into beautiful, shareable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-warm-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-warm-600 transition-colors shadow-lg"
            >
              Start Preserving Memories
            </Link>
            <button className="border-2 border-warm-500 text-warm-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-warm-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="bg-warm-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-warm-600" />
            </div>
            <h3 className="text-xl font-semibold text-sage-800 mb-3">Guided Conversations</h3>
            <p className="text-sage-600">
              AI asks thoughtful questions to help grandparents share their most meaningful stories and life experiences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-sage-600" />
            </div>
            <h3 className="text-xl font-semibold text-sage-800 mb-3">Beautiful Blog Posts</h3>
            <p className="text-sage-600">
              Transform conversations into beautifully formatted blog posts that can be shared with family members.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="bg-warm-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-warm-600" />
            </div>
            <h3 className="text-xl font-semibold text-sage-800 mb-3">AI-Powered</h3>
            <p className="text-sage-600">
              Advanced AI technology creates natural, empathetic conversations that feel like talking to a caring friend.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-sage-800 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-warm-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold text-sage-800 mb-2">Sign Up</h3>
              <p className="text-sage-600 text-sm">Create an account or sign in as a guest</p>
            </div>
            <div className="text-center">
              <div className="bg-warm-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold text-sage-800 mb-2">Start Chatting</h3>
              <p className="text-sage-600 text-sm">Begin a conversation with our AI assistant</p>
            </div>
            <div className="text-center">
              <div className="bg-warm-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold text-sage-800 mb-2">Share Stories</h3>
              <p className="text-sage-600 text-sm">Answer guided questions about your life</p>
            </div>
            <div className="text-center">
              <div className="bg-warm-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold text-sage-800 mb-2">Get Your Blog</h3>
              <p className="text-sage-600 text-sm">Receive a beautiful blog post to share</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-warm-500 to-warm-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Preserve Your Memories?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families who have already captured their precious stories
          </p>
          <Link 
            to="/login" 
            className="bg-white text-warm-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-warm-50 transition-colors shadow-lg inline-block"
          >
            Start Your Memory Journey
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-sage-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 Memory Keeper. Built with ❤️ for preserving family stories.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
