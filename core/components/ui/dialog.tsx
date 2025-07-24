import React, { ReactNode, forwardRef } from "react";
import { createVariants, type VariantProps } from "@/core/utils/class-variance";

const dialogVariants = createVariants(
  "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      position: {
        center: "",
        top: "items-start",
        bottom: "items-end",
      },
      size: {
        default: "sm:max-w-lg",
        sm: "sm:max-w-sm",
        lg: "sm:max-w-xl",
        xl: "sm:max-w-2xl",
        full: "sm:max-w-full",
      },
    },
    defaultVariants: {
      position: "center",
      size: "default",
    },
  }
);

/**
 * @typedef {Object} DialogProps
 * @property {React.ReactNode} children - The child components to be rendered within the Dialog.
 * @property {boolean} [open] - Controls the open state of the dialog.
 * @property {(open: boolean) => void} [onOpenChange] - Callback fired when the open state changes.
 * @property {"center" | "top" | "bottom"} [position] - The position of the dialog on the screen.
 * @property {"default" | "sm" | "lg" | "xl" | "full"} [size] - The size of the dialog.
 */
export interface DialogProps extends VariantProps<typeof dialogVariants> {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: "center" | "top" | "bottom";
  size?: "default" | "sm" | "lg" | "xl" | "full";
}

/**
 * Renders a customizable dialog component.
 * @param {DialogProps} props - The properties for the Dialog component.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, open, onOpenChange, position, size }, ref) => {
    return (
      <div
        ref={ref}
        className={`${dialogVariants({ position, size })} ${open ? "" : "hidden"}`}
        aria-hidden={!open}
      >
        <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
        <div className={`fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ${size === "full" ? "w-[95vw]" : ""}`}>
          {children}
        </div>
      </div>
    );
  }
);

Dialog.displayName = "Dialog";

/**
 * @typedef {Object} DialogTriggerProps
 * @property {React.ReactNode} children - The child components to be rendered within the trigger.
 * @property {boolean} [asChild] - If true, the child will be rendered as a child of the trigger.
 */

/**
 * Renders a trigger for the Dialog component.
 * @param {DialogTriggerProps} props - The properties for the DialogTrigger component.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const DialogTrigger = forwardRef<HTMLDivElement, { children: ReactNode; asChild?: boolean }>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="inline-flex">
        {children}
      </div>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

/**
 * @typedef {Object} DialogContentProps
 * @property {React.ReactNode} children - The child components to be rendered within the content area.
 * @property {string} [className] - Additional CSS classes to apply to the content area.
 */

/**
 * Renders the content area of the Dialog.
 * @param {DialogContentProps} props - The properties for the DialogContent component.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const DialogContent = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative grid w-full gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 sm:rounded-lg ${className}`}
      >
        {children}
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";

/**
 * @typedef {Object} DialogHeaderProps
 * @property {React.ReactNode} children - The child components to be rendered within the header.
 * @property {string} [className] - Additional CSS classes to apply to the header.
 */

/**
 * Renders the header section of the Dialog.
 * @param {DialogHeaderProps} props - The properties for the DialogHeader component.
 * @param {React.Ref<HTMLDivElement>} ref - Ref to the HTML div element.
 * @returns {JSX.Element}
 */
const DialogHeader = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = "DialogHeader";

/**
 * @typedef {Object} DialogTitleProps
 * @property {React.ReactNode} children - The child components to be rendered within the title.
 * @property {string} [className] - Additional CSS classes to apply to the title.
 */

/**
 * Renders the title of the Dialog.
 * @param {DialogTitleProps} props - The properties for the DialogTitle component.
 * @param {React.Ref<HTMLHeadingElement>} ref - Ref to the HTML heading element.
 * @returns {JSX.Element}
 */
const DialogTitle = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <h2 ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
        {children}
      </h2>
    );
  }
);

DialogTitle.displayName = "DialogTitle";

/**
 * @typedef {Object} DialogDescriptionProps
 * @property {React.ReactNode} children - The child components to be rendered within the description.
 * @property {string} [className] - Additional CSS classes to apply to the description.
 */

/**
 * Renders the description content of the Dialog.
 * @param {DialogDescriptionProps} props - The properties for the DialogDescription component.
 * @param {React.Ref<HTMLParagraphElement>} ref - Ref to the HTML paragraph element.
 * @returns {JSX.Element}
 */
const DialogDescription = forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => {
    return (
      <p ref={ref} className={`text-sm text-muted-foreground ${className}`}>
        {children}
      </p>
    );
  }
);

DialogDescription.displayName = "DialogDescription";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription };