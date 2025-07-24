import * as React from "react"

import { cn } from "@/core/utils/cn"

/**
 * @typedef {Object} TextareaProps
 * @extends React.ComponentProps<"textarea">
 * @property {string} [className] - Additional CSS classes to apply to the textarea.
 */

/**
 * Renders a customizable textarea component.
 * @param {TextareaProps} props - The properties for the Textarea component.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea.
 * @param {React.Ref<HTMLTextAreaElement>} ref - Ref to the HTML textarea element.
 * @returns {JSX.Element}
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
