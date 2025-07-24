"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FormInput } from "@/app/components/ui/form-input"
import { Button } from "@/core/components/ui/button"

interface LoginFormProps {
  userType: "admin" | "user"
  onBack: () => void
  onShowToast: (message: string, type: "success" | "error" | "info") => void
}

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

export function LoginForm({ userType, onBack, onShowToast }: LoginFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0)

  const isAdmin = userType === "admin"
  const maxAttempts = 3
  const lockDuration = 300 // 5 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLocked && lockTimeRemaining > 0) {
      interval = setInterval(() => {
        setLockTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsLocked(false)
            setLoginAttempts(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isLocked, lockTimeRemaining])

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address"
    if (isAdmin && !email.includes("admin")) return "Admin email should contain 'admin'"
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain uppercase, lowercase, and number"
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLocked) {
      onShowToast(`Account locked. Try again in ${Math.ceil(lockTimeRemaining / 60)} minutes.`, "error")
      return
    }

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate different responses
          if (formData.email === "admin@hospital.com" && formData.password === "Admin123!") {
            resolve("success")
          } else if (formData.email === "doctor@hospital.com" && formData.password === "Doctor123!") {
            resolve("success")
          } else {
            reject(new Error("Invalid credentials"))
          }
        }, 2000)
      })

      // Success - Store auth state in cookies
      const cookieExpiry = rememberMe ? 30 : 1 // 30 days if remember me is checked, 1 day if not
      setCookie("isAuthenticated", "true", cookieExpiry)
      setCookie("userType", userType, cookieExpiry)
      setCookie("userEmail", formData.email, cookieExpiry)

      // Show success message
      onShowToast(`Welcome back! Redirecting to ${isAdmin ? "admin" : "staff"} dashboard...`, "success")

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = isAdmin ? "/dashboard/users" : "/dashboard/departments"
      }, 1500)
    } catch (error) {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      if (newAttempts >= maxAttempts) {
        setIsLocked(true)
        setLockTimeRemaining(lockDuration)
        setErrors({ general: `Too many failed attempts. Account locked for ${lockDuration / 60} minutes.` })
        onShowToast("Account temporarily locked due to multiple failed attempts", "error")
      } else {
        setErrors({
          general: `Invalid email or password. ${maxAttempts - newAttempts} attempts remaining.`,
        })
        onShowToast("Invalid credentials. Please try again.", "error")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-8 animate-slideIn">
      {/* Header */}
      <div className="text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to user selection
        </button>

        <div
          className={`w-20 h-20 ${isAdmin ? "bg-red-100" : "bg-blue-100"} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
        >
          <svg
            className={`w-10 h-10 ${isAdmin ? "text-red-600" : "text-blue-600"}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {isAdmin ? (
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            ) : (
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99l-2.54 3.4c-.74.99-.74 2.31 0 3.3l1.54 2.05v4.26h2zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4z" />
            )}
          </svg>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          {isAdmin ? "Administrator Portal" : "Staff Portal"}
        </h2>
        <p className="text-gray-600 text-lg">
          {isAdmin ? "Secure access to system administration" : "Access your healthcare workspace"}
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
              <p className="text-sm text-red-700 mt-1">{errors.general}</p>
              {isLocked && (
                <p className="text-sm text-red-600 mt-2 font-medium">Time remaining: {formatTime(lockTimeRemaining)}</p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-5">
          <FormInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
            placeholder={isAdmin ? "admin@hospital.com" : "doctor@hospital.com"}
            icon={
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            }
            disabled={isLocked}
            required
          />

          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            placeholder={isAdmin ? "Admin123!" : "Doctor123!"}
            icon={
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            }
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                )}
              </button>
            }
            disabled={isLocked}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              disabled={isLocked}
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 select-none">
              Keep me signed in
            </label>
          </div>

          <button
            type="button"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline"
            disabled={isLocked}
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading || isLocked}
          loading={isLoading}
          variant={isAdmin ? "gradient" : "default"}
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            "Authenticating..."
          ) : (
            <>
              Sign in as {isAdmin ? "Administrator" : "Staff Member"}
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </>
          )}
        </Button>
      </form>

      {/* Demo Credentials */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-800">Demo Credentials</h3>
            <div className="mt-2 text-sm text-blue-700 space-y-1">
              <p>
                <strong>Admin:</strong> admin@hospital.com / Admin123!
              </p>
              <p>
                <strong>Staff:</strong> doctor@hospital.com / Doctor123!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-gray-800">Security & Compliance</h3>
            <p className="mt-1 text-sm text-gray-600">
              This system is HIPAA compliant. All access attempts are logged and monitored for security purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 