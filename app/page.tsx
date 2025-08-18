'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sjmukfzapgpynrvsmrgj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbXVrZnphcGdweW5ydnNtcmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDEyNzIsImV4cCI6MjA3MTA3NzI3Mn0.ykscDkOI9tty9wnbBMVZAWF6OVHOj6aAY2sbhmTLRCk'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function UNCUTApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '' })
  const [dailyData, setDailyData] = useState({ content: {}, notes: { daily: '' } })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        if (error) throw error
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { full_name: formData.fullName } },
        })
        if (error) throw error
        alert('Check your email to confirm your account!')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const updateContent = (type) => {
    const newData = { ...dailyData, content: { ...dailyData.content, [type]: (dailyData.content[type] || 0) + 1 } }
    setDailyData(newData)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-500 mb-4">UNCUT</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
          <h1 className="text-4xl font-bold text-cyan-500 text-center mb-2">UNCUT</h1>
          <p className="text-center text-slate-600 mb-8">Raw. Unfiltered. Consistent.</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <h2 className="text-xl font-bold text-center mb-4">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
              required
            />
            
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
            
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-cyan-500 text-sm"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-cyan-500">UNCUT</h1>
            <p className="text-sm text-slate-600">Hi {user.user_metadata?.full_name?.split(' ')[0]} 👋</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">📱 Content Creation</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'ig-reel', name: 'Instagram Reel' },
              { id: 'ig-story', name: 'Instagram Story' },
              { id: 'tiktok', name: 'TikTok' },
              { id: 'linkedin', name: 'LinkedIn' },
              { id: 'youtube', name: 'YouTube' },
              { id: 'threads', name: 'Threads' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => updateContent(type.id)}
                className="bg-white border-2 border-cyan-500 rounded-2xl p-4 text-center hover:shadow-lg transition-all"
              >
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {dailyData.content[type.id] || 0}
                </div>
                <div className="text-sm text-slate-600">{type.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">📝 Daily Notes</h3>
          <textarea
            className="w-full p-4 border rounded-xl min-h-32 focus:ring-2 focus:ring-cyan-500"
            value={dailyData.notes.daily}
            onChange={(e) => setDailyData({...dailyData, notes: {...dailyData.notes, daily: e.target.value}})}
            placeholder="What moved the needle today?"
          />
        </div>
      </main>
    </div>
  )
}
