"use client"

import * as React from "react"
import { cn } from "@/core/utils/cn"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className = "", ...props }, ref) => (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer select-none", className)}>
      <input
        type="checkbox"
        ref={ref}
        className="sr-only peer"
        {...props}
      />
      <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition relative">
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
      </div>
      {label && <span>{label}</span>}
    </label>
  )
)
Switch.displayName = "Switch"
