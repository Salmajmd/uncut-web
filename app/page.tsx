'use client'

import { useState } from 'react'
import { CSSProperties } from 'react'

export default function UNCUTApp() {
  const [user, setUser] = useState<any>(null)
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setUser({ name: fullName || 'Demo User', email })
  }

  const updateContent = (type: string) => {
    setContent(prev => ({ ...prev, [type]: prev[type] + 1 }))
  }

  const styles: { [key: string]: CSSProperties } = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    },
    card: {
      background: 'white',
      borderRadius: '24px',
      padding: '32px',
      maxWidth: '400px',
      width: '100%',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    title: {
      fontSize: '48px',
      fontWeight: '900',
      background: 'linear-gradient(to right, #06b6d4, #0891b2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center' as const,
      marginBottom: '8px'
    },
    subtitle: {
      textAlign: 'center' as const,
      color: '#64748b',
      marginBottom: '32px'
    }
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>UNCUT</h1>
          <p style={styles.subtitle}>Raw. Unfiltered. Consistent.</p>
          
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '16px' }}
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '16px' }}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '16px' }}
              required
            />
            
            <button 
              type="submit" 
              style={{ width: '100%', background: '#06b6d4', color: 'white', padding: '12px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
            
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)} 
              style={{ width: '100%', background: 'none', color: '#06b6d4', border: 'none', fontSize: '14px', cursor: 'pointer', padding: '8px' }}
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Do not have an account? Sign Up'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <header style={{ background: 'white', padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#06b6d4' }}>UNCUT</h1>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Hi {user.name}! 👋</p>
          </div>
          <button 
            onClick={() => setUser(null)} 
            style={{ color: '#dc2626', background: 'none', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>📱 Content Creation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
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
                style={{ background: 'white', border: '2px solid #06b6d4', borderRadius: '16px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                  {content[type.id]}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>{type.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>📊 Today Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#06b6d4' }}>
                {Object.values(content).reduce((a, b) => a + b, 0)}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Total Content</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#06b6d4' }}>0</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Outreach</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#06b6d4' }}>0</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Inbound</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#06b6d4' }}>1</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Streak</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
