"use client"

import * as React from "react"
import { cn } from "@/core/utils/cn"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  className?: string
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", className = "", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "vertical"
          ? "w-px h-full bg-gray-200"
          : "h-px w-full bg-gray-200",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator"
