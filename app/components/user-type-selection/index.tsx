"use client"

import { useState } from "react"

interface UserTypeSelectionProps {
  onSelectUserType: (type: "admin" | "user") => void
}

export function UserTypeSelection({ onSelectUserType }: UserTypeSelectionProps) {
  const [hoveredType, setHoveredType] = useState<"admin" | "user" | null>(null)

  const userTypes = [
    {
      type: "admin" as const,
      title: "Administrator",
      description: "Full system access and management",
      icon: (
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      gradient: "from-rose-500/90 via-rose-600/90 to-red-600/90",
      hoverGradient: "from-rose-600/90 via-rose-700/90 to-red-700/90",
      features: ["User Management", "System Configuration", "Analytics & Reports", "Security Settings"],
    },
    {
      type: "user" as const,
      title: "Healthcare Staff",
      description: "Patient care and medical operations",
      icon: (
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2zM6 19c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm12 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
        </svg>
      ),
      gradient: "from-slate-500/90 via-slate-600/90 to-slate-700/90",
      hoverGradient: "from-slate-600/90 via-slate-700/90 to-slate-800/90",
      features: ["Patient Records", "Appointment Management", "Medical Charts", "Communication Tools"],
    },
  ]

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Welcome Back</h2>
        <p className="text-slate-600 text-lg">Choose your access level to continue</p>
      </div>

      <div className="space-y-4">
        {userTypes.map((userType) => (
          <button
            key={userType.type}
            onClick={() => onSelectUserType(userType.type)}
            onMouseEnter={() => setHoveredType(userType.type)}
            onMouseLeave={() => setHoveredType(null)}
            className={`w-full group relative overflow-hidden bg-gradient-to-r ${
              hoveredType === userType.type ? userType.hoverGradient : userType.gradient
            } text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg border border-white/10`}
          >
            <div className="absolute inset-0 bg-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <div className="relative flex items-center space-x-5">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                {userType.icon}
              </div>

              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold mb-1">{userType.title}</h3>
                <p className="text-white/90 text-sm mb-3">{userType.description}</p>

                <div className="flex flex-wrap gap-2">
                  {userType.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-white/20 rounded-md text-xs font-medium backdrop-blur-sm">
                      {feature}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-white/20 rounded-md text-xs font-medium backdrop-blur-sm">
                    +{userType.features.length - 2} more
                  </span>
                </div>
              </div>

              <div className="ml-auto">
                <svg
                  className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
          <div className="w-1 h-4 bg-slate-300"></div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            <span>Secure Connection</span>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Need assistance?{" "}
          <button className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200 hover:underline">
            Contact IT Support
          </button>
        </p>
      </div>
    </div>
  )
} 