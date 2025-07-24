"use client"

import * as React from "react"
import { cn } from "@/core/utils/cn"

export interface PopoverProps {
  trigger: React.ReactNode
  content: React.ReactNode
  className?: string
}

export function Popover({ trigger, content, className = "" }: PopoverProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <span className="relative inline-block">
      <span onClick={() => setOpen((v) => !v)} tabIndex={0} className="cursor-pointer">
        {trigger}
      </span>
      {open && (
        <span className={cn("absolute z-50 left-1/2 -translate-x-1/2 mt-2 px-4 py-2 rounded bg-white border shadow-lg", className)} role="dialog">
          {content}
        </span>
      )}
    </span>
  )
}
