"use client"

import * as React from "react"

import { cn } from "@/core/utils/cn"

/**
 * Provides the context for Toast components.
 * @param {Object} props - The properties for the ToastProvider.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element}
 */
const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

/**
 * Renders the viewport for Toast components.
 * @param {Object} props - The properties for the ToastViewport.
 * @param {string} [props.className] - Additional CSS classes to apply to the viewport.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))

/**
 * Renders a customizable Toast component.
 * @param {Object} props - The properties for the Toast component.
 * @param {string} [props.className] - Additional CSS classes to apply to the toast.
 * @param {"default" | "destructive"} [props.variant="default"] - The visual style of the toast.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }
>(({ className, variant, ...props }, ref) => {
  const baseClasses = "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all";
  const variantClasses = {
    default: "border bg-background text-foreground",
    destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
  };

  return (
    <div
      ref={ref}
      className={cn(baseClasses, variant ? variantClasses[variant] : variantClasses.default, className)}
      {...props}
    />
  )
})

/**
 * Renders an action button within a Toast component.
 * @param {Object} props - The properties for the ToastAction.
 * @param {string} [props.className] - Additional CSS classes to apply to the action button.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref to the HTML button element.
 * @returns {JSX.Element}
 */
const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))

/**
 * Renders a close button for a Toast component.
 * @param {Object} props - The properties for the ToastClose.
 * @param {string} [props.className] - Additional CSS classes to apply to the close button.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref to the HTML button element.
 * @returns {JSX.Element}
 */
const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    {...props}
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
))

/**
 * Renders the title for a Toast component.
 * @param {Object} props - The properties for the ToastTitle.
 * @param {string} [props.className] - Additional CSS classes to apply to the title.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const ToastTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))

/**
 * Renders the description for a Toast component.
 * @param {Object} props - The properties for the ToastDescription.
 * @param {string} [props.className] - Additional CSS classes to apply to the description.
 * @param {React.Ref<HTMLParagraphElement>} ref - Ref to the HTML paragraph element.
 * @returns {JSX.Element}
 */
const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))

/**
 * @typedef {Object} ToastProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @property {"default" | "destructive"} [variant] - The visual style of the toast.
 */
interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

/**
 * @typedef {React.ReactElement<typeof ToastAction>} ToastActionElement
 */
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  type ToastProps,
  type ToastActionElement,
}
