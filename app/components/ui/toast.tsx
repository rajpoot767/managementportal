"use client"

import { useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  visible: boolean
  onClose: () => void
}

export function Toast({ message, type, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  const typeStyles = {
    success: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200/60 text-emerald-800",
    error: "bg-gradient-to-r from-rose-50 to-red-50 border-rose-200/60 text-rose-800",
    info: "bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200/60 text-slate-800",
  }

  const typeIcons = {
    success: (
      <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight">
      <div className={`max-w-sm w-full border rounded-xl shadow-lg backdrop-blur-sm p-4 ${typeStyles[type]}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">{typeIcons[type]}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export const ToastProvider = () => null
export const ToastViewport = () => null
export const ToastTitle = () => null
export const ToastDescription = () => null
export const ToastClose = () => null
export const ToastAction = () => null 