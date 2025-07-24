"use client"

import { useState, useEffect } from "react"
import { UserTypeSelection } from "@/app/components/user-type-selection"
import { LoginForm } from "@/app/components/login-form"
import { Toast } from "@/core/components/ui/toast"
import { LoadingScreen } from "@/app/components/loading-screen"

export default function LoginPage() {
  const [selectedUserType, setSelectedUserType] = useState<"admin" | "user" | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error" | "info"
    visible: boolean
  }>({
    message: "",
    type: "info",
    visible: false,
  })

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    setSelectedUserType(null)
  }

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, visible: true })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 5000)
  }

  if (isInitialLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23334155' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="flex min-h-screen relative z-10">
          {/* Left Side - Professional Medical Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-12 flex-col justify-between relative overflow-hidden">
            {/* Subtle Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-32 h-32 bg-white/[0.03] rounded-full animate-pulse"></div>
              <div className="absolute bottom-40 right-20 w-24 h-24 bg-white/[0.03] rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/[0.03] rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-12">
                <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  {/* Medical Cross Icon */}
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5 12c0 .28-.11.53-.29.71l-3.54 3.54c-.18.18-.43.29-.71.29s-.53-.11-.71-.29L9.71 13.71c-.18-.18-.29-.43-.29-.71s.11-.53.29-.71l2.54-2.54c.18-.18.43-.29.71-.29s.53.11.71.29l3.54 3.54c.18.18.29.43.29.71zM19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h5v2H4v1h5v2H4v1h5v2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm0 8h5v6H4v-6z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">MediCare Plus</h1>
                  <p className="text-slate-300 text-sm font-medium">Professional Healthcare Management</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                    Secure Healthcare
                    <span className="block text-slate-200">Management Platform</span>
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                    Streamline operations, enhance patient care, and maintain compliance with our comprehensive
                    healthcare management solution.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-md">
                  {[
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      ),
                      title: "HIPAA Compliant",
                      description: "Enterprise-grade security",
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l1.09 3.26L16 5.18l-1.91 2.73L16 11.64l-2.91-.27L12 14.5l-1.09-3.13L8 11.64l1.91-2.73L8 5.18l2.91.08L12 2z" />
                        </svg>
                      ),
                      title: "Real-time Updates",
                      description: "Instant data synchronization",
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                      ),
                      title: "24/7 Support",
                      description: "Round-the-clock assistance",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-white/[0.08] to-white/[0.04] backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:from-white/[0.12] hover:to-white/[0.06] transition-all duration-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                          <p className="text-slate-300 text-xs mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="relative z-10">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-slate-300 text-sm">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-slate-300 text-sm">Hospitals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-slate-300 text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Decorative Medical Element */}
            <div className="absolute top-1/4 right-10 opacity-[0.08]">
              <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
          </div>

          {/* Right Side - Login Forms */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {!selectedUserType ? (
                <UserTypeSelection onSelectUserType={setSelectedUserType} />
              ) : (
                <LoginForm userType={selectedUserType} onBack={handleBack} onShowToast={showToast} />
              )}
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  )
}
