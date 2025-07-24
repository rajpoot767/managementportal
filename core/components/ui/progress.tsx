"use client"

import * as React from "react"
import { cn } from "@/core/utils/cn"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  className?: string
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, className = "", ...props }, ref) => (
    <div ref={ref} className={cn("w-full bg-gray-200 rounded-full h-2", className)} {...props}>
      <div
        className="bg-blue-600 h-2 rounded-full transition-all"
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"
