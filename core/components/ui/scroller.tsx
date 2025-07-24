import { ReactNode } from "react";

interface ScrollerProps {
  children: ReactNode;
  direction?: "both" | "horizontal" | "vertical";
  className?: string;
}

export default function Scroller({ children, direction = "both", className = "" }: ScrollerProps) {
  const getScrollClasses = () => {
    switch (direction) {
      case "horizontal":
        return "overflow-x-auto overflow-y-hidden";
      case "vertical":
        return "overflow-y-auto overflow-x-hidden";
      case "both":
      default:
        return "overflow-auto";
    }
  };

  return (
    <div className={`${getScrollClasses()} ${className}`}>
      {children}
    </div>
  );
} 