import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { MemoryProvider } from './contexts/MemoryContext'
import Landing from './components/Landing'
import Login from './components/Login'
import Chat from './components/Chat'
import MemoryDashboard from './components/MemoryDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <MemoryProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-warm-50 to-sage-50">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/memories" 
                element={
                  <ProtectedRoute>
                    <MemoryDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </MemoryProvider>
    </AuthProvider>
  )
}

export default App