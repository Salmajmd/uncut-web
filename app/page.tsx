'use client'

import { useState } from 'react'

export default function UNCUTApp() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [content, setContent] = useState({
    'ig-reel': 0,
    'ig-story': 0,
    'tiktok': 0,
    'linkedin': 0,
    'youtube': 0,
    'threads': 0
  })

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple demo login - just set user
    setUser({ name: fullName || 'Demo User', email })
  }

  const updateContent = (type) => {
    setContent(prev => ({ ...prev, [type]: prev[type] + 1 }))
  }

  // If not logged in, show login form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent text-center mb-2">
            UNCUT
          </h1>
          <p className="text-center text-slate-600 mb-8">Raw. Unfiltered. Consistent.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-bold text-center mb-4">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
              required
            />
            
            <button type="submit" className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
            
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="w-full text-cyan-500 text-sm hover:text-cyan-600"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // If logged in, show dashboard
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white p-4 border-b shadow-sm">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-cyan-500">UNCUT</h1>
            <p className="text-sm text-slate-600">Hi {user.name}! 👋</p>
          </div>
          <button 
            onClick={() => setUser(null)} 
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">📱 Content Creation</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'ig-reel', name: 'Instagram Reel', color: 'border-pink-500' },
              { id: 'ig-story', name: 'Instagram Story', color: 'border-purple-500' },
              { id: 'tiktok', name: 'TikTok', color: 'border-black' },
              { id: 'linkedin', name: 'LinkedIn', color: 'border-blue-600' },
              { id: 'youtube', name: 'YouTube', color: 'border-red-500' },
              { id: 'threads', name: 'Threads', color: 'border-gray-800' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => updateContent(type.id)}
                className={`bg-white border-2 ${type.color} rounded-2xl p-4 text-center hover:shadow-lg transition-all hover:scale-105`}
              >
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {content[type.id]}
                </div>
                <div className="text-sm text-slate-600">{type.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">📊 Today's Summary</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-500">
                {Object.values(content).reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-sm text-slate-600">Total Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">0</div>
              <div className="text-sm text-slate-600">Outreach</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">0</div>
              <div className="text-sm text-slate-600">Inbound</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">1</div>
              <div className="text-sm text-slate-600">Streak</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
