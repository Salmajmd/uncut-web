'use client'

export default function UNCUTApp() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl">
        <h1 className="text-4xl font-bold text-cyan-500 text-center mb-2">UNCUT</h1>
        <p className="text-center text-slate-600 mb-8">Raw. Unfiltered. Consistent.</p>
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">Welcome Back</h2>
          
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
          />
          
          <button className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600">
            Sign In
          </button>
          
          <button className="w-full text-cyan-500 text-sm">
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
