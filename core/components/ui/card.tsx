import { ReactNode, forwardRef } from "react";
import { createVariants, type VariantProps } from "@/core/utils/class-variance";

const cardVariants = createVariants(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        hover: "hover:shadow-lg hover:-translate-y-1",
        interactive: "cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]",
        gradient: "bg-gradient-to-br from-primary/10 to-primary/5",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      animation: {
        none: "",
        fadeIn: "animate-fade-in",
        scaleIn: "animate-scale-in",
        float: "animate-float",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "hover" | "interactive" | "gradient";
  size?: "default" | "sm" | "lg";
  animation?: "none" | "fadeIn" | "scaleIn" | "float";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant, size, animation, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, size, animation, className })}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, { className?: string; children: ReactNode }>(
  ({ className = "", children }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 ${className}`}>
      {children}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, { className?: string; children: ReactNode }>(
  ({ className = "", children }, ref) => (
    <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  )
);

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, { className?: string; children: ReactNode }>(
  ({ className = "", children }, ref) => (
    <p ref={ref} className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  )
);

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, { className?: string; children: ReactNode }>(
  ({ className = "", children }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
);

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, { className?: string; children: ReactNode }>(
  ({ className = "", children }, ref) => (
    <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`}>
      {children}
    </div>
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }; 