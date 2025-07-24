"use client"

import * as React from "react"
import { cn } from "@/core/utils/cn"

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function Tooltip({ content, children, className = "" }: TooltipProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} tabIndex={0}>
      {children}
      {open && (
        <span className={cn("absolute z-50 left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-gray-900 text-white text-xs shadow-lg whitespace-nowrap", className)} role="tooltip">
          {content}
        </span>
      )}
    </span>
  )
}
