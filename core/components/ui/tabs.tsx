"use client"

import * as React from "react"
import { cn } from "@/core/utils/cn"

export interface Tab {
  label: string
  value: string
  icon?: React.ReactNode
}

export interface TabsProps {
  tabs: Tab[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Tabs({ tabs, value, onChange, className = "" }: TabsProps) {
  return (
    <div className={cn("flex border-b border-gray-200", className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={value === tab.value}
          className={cn(
            "px-4 py-2 -mb-px border-b-2 font-medium text-sm transition",
            value === tab.value
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300"
          )}
          onClick={() => onChange(tab.value)}
        >
          {tab.icon && <span className="inline-block mr-2 align-middle">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
