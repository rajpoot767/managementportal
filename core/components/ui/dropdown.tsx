import * as React from "react";
import { cn } from "@/core/utils/cn";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  options: { label: string; value: string }[];
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, value, onValueChange, placeholder = "Select an option", disabled, error, options, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: { label: string; value: string }) => {
      onValueChange?.(option.value);
      setIsOpen(false);
    };

    return (
      <div
        ref={dropdownRef}
        className={cn(
          "relative w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            "transition-colors duration-200"
          )}
          disabled={disabled}
        >
          <span className={!selectedOption ? "text-muted-foreground" : ""}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={cn(
              "h-4 w-4 opacity-50 transition-transform duration-200",
              isOpen && "transform rotate-180"
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md",
              "animate-in fade-in-0 zoom-in-95",
              "overflow-hidden"
            )}
          >
            <div className="max-h-[200px] overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-sm",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    "transition-colors duration-200",
                    option.value === value && "bg-accent/50 font-medium",
                    index !== options.length - 1 && "border-b border-border/10"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <span className="mt-1 text-xs text-destructive">{error}</span>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown"; 