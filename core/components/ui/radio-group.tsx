"use client"

import * as React from "react"
import { cn } from "@/core/utils/cn"

export interface RadioGroupProps {
  name: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string; icon?: React.ReactNode }[]
  disabled?: boolean
  className?: string
}

export function RadioGroup({ name, value, onChange, options, disabled = false, className = "", ...props }: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} role="radiogroup" {...props}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex items-center gap-2 cursor-pointer p-2 rounded transition-colors",
            value === option.value ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
            className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          {option.icon && <span className="w-4 h-4 text-blue-500">{option.icon}</span>}
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
