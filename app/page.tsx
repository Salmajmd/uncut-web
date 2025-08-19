'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sjmukfzapgpynrvsmrgj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbXVrZnphcGdweW5ydnNtcmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDEyNzIsImV4cCI6MjA3MTA3NzI3Mn0.ykscDkOI9tty9wnbBMVZAWF6OVHOj6aAY2sbhmTLRCk'
)

export default function UNCUTApp() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [content, setContent] = useState({})

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })

    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        })
        alert('Check your email to verify your account!')
      } else {
        await supabase.auth.signInWithPassword({ email, password })
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const updateContent = (type) => {
    setContent(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent text-center mb-2">UNCUT</h1>
          <p className="text-center text-slate-600 mb-8">Raw. Unfiltered. Consistent.</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <h2 className="text-xl font-bold text-center mb-4">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
            
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-xl"
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            
            <button type="submit" className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-cyan-500">
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white p-4 border-b">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-cyan-500">UNCUT</h1>
          <button onClick={() => supabase.auth.signOut()} className="text-red-600">Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">📱 Content Tracking</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {['Instagram Reel', 'Instagram Story', 'TikTok', 'LinkedIn', 'YouTube', 'Threads'].map((type) => (
              <button
                key={type}
                onClick={() => updateContent(type)}
                className="bg-white border-2 border-cyan-500 rounded-2xl p-4 text-center hover:shadow-lg"
              >
                <div className="text-3xl font-bold mb-2">{content[type] || 0}</div>
                <div className="text-sm">{type}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
