import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Heart, ArrowLeft, Mail, User } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn, signInAsGuest } = useAuth()
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await signIn(email)
      setMessage('Check your email for the magic link!')
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setLoading(true)
    setMessage('')

    try {
      await signInAsGuest()
      navigate('/chat')
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-sage-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-sage-600 hover:text-sage-800 mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-warm-600" />
            <span className="text-2xl font-bold text-sage-800">Memory Keeper</span>
          </div>
          
          <h1 className="text-3xl font-bold text-sage-800 mb-2">Welcome Back</h1>
          <p className="text-sage-600">Sign in to continue preserving your memories</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-sage-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-warm-500 text-white py-3 rounded-lg font-semibold hover:bg-warm-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-sage-300"></div>
            <span className="px-4 text-sage-500 text-sm">or</span>
            <div className="flex-1 border-t border-sage-300"></div>
          </div>

          {/* Guest Login */}
          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full border-2 border-sage-300 text-sage-700 py-3 rounded-lg font-semibold hover:bg-sage-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <User className="h-5 w-5" />
            <span>Continue as Guest</span>
          </button>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-sage-800 mb-4">What you'll get:</h3>
          <div className="space-y-2 text-sage-600">
            <p>✓ AI-powered memory conversations</p>
            <p>✓ Beautiful blog post generation</p>
            <p>✓ PDF export and sharing</p>
            <p>✓ Secure memory storage</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
