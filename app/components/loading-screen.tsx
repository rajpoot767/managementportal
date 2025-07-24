"use client"

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Medical Cross Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 mx-auto mb-8">
            <svg className="w-12 h-12 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h5v2H4v1h5v2H4v1h5v2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm0 8h5v6H4v-6z" />
            </svg>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">MediCare Plus</h1>
          <p className="text-slate-300">Initializing secure connection...</p>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-white/20 rounded-full mx-auto mt-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full animate-pulse"
              style={{
                animation: "loading 1.5s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
} 