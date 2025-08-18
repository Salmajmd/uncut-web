'use client'

export default function UNCUTApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">
            UNCUT
          </h1>
          <p className="text-slate-600">Raw. Unfiltered. Consistent.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">
            Welcome Back
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition-all mt-6">
            Sign In
          </button>

          <button className="w-full text-cyan-600 text-sm hover:text-cyan-700 transition-colors mt-4">
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}
