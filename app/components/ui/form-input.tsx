"use client"

import type React from "react"

import { useState } from "react"

interface FormInputProps {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  required?: boolean
}

export function FormInput({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  icon,
  rightIcon,
  disabled = false,
  required = false,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200
            ${icon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : isFocused
                  ? "border-blue-500 bg-white focus:border-blue-500 focus:ring-blue-500"
                  : "border-gray-300 bg-gray-50 hover:bg-white focus:border-blue-500 focus:ring-blue-500"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            placeholder-gray-400
          `}
        />

        {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">{rightIcon}</div>}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
} 