import { ButtonHTMLAttributes, forwardRef } from "react";
import { createVariants, type VariantProps } from "@/core/utils/class-variance";

const buttonVariants = createVariants(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-md transform hover:scale-105 transition-transform duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        float: "animate-float",
      },
      loading: {
        true: "relative !text-transparent transition-none hover:!text-transparent",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
      loading: false,
    },
  }
);

/**
 * @typedef {Object} ButtonProps
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 * @property {"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient"} [variant] - The visual style of the button.
 * @property {"default" | "sm" | "lg" | "icon"} [size] - The size of the button.
 * @property {"none" | "pulse" | "bounce" | "float"} [animation] - The animation to apply to the button.
 * @property {boolean} [loading] - If true, a loading spinner is shown and the button is disabled.
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  animation?: "none" | "pulse" | "bounce" | "float";
  loading?: boolean;
}

/**
 * Renders a customizable button component with various styles, sizes, animations, and a loading state.
 * @param {ButtonProps} props - The properties for the Button component.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient"} [props.variant] - The visual style of the button.
 * @param {"default" | "sm" | "lg" | "icon"} [props.size] - The size of the button.
 * @param {"none" | "pulse" | "bounce" | "float"} [props.animation] - The animation to apply to the button.
 * @param {boolean} [props.loading=false] - If true, a loading spinner is shown and the button is disabled.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref to the HTML button element.
 * @returns {JSX.Element}
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant, size, animation, loading = false, children, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, animation, loading, className })}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin">
              <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        )}
        <span className="flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };