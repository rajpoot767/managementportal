import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { createVariants } from "@/core/utils/class-variance";

const searchBarVariants = createVariants(
  "relative flex items-center w-full transition-all duration-300",
  {
    variants: {
      size: {
        sm: "max-w-[200px]",
        default: "max-w-[300px]",
        lg: "max-w-[400px]",
        full: "max-w-full",
      },
      variant: {
        default: "",
        expanded: "focus-within:max-w-[500px]",
        animated: "focus-within:scale-[1.02]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Callback when search value changes */
  onSearch?: (value: string) => void;
  /** Delay in milliseconds before triggering search (debounce) */
  debounceMs?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: "sm" | "default" | "lg" | "full";
  /** Visual variant */
  variant?: "default" | "expanded" | "animated";
  /** Additional class names */
  className?: string;
  /** Initial value */
  initialValue?: string;
  /** Show clear button */
  showClear?: boolean;
  /** Show search icon */
  showIcon?: boolean;
}

export function SearchBar({
  onSearch,
  debounceMs = 300,
  placeholder = "Search...",
  size,
  variant,
  className = "",
  initialValue = "",
  showClear = true,
  showIcon = true,
  ...props
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const debounceTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onSearch?.(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div className={searchBarVariants({ size, variant, className })}>
      {showIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            className="h-4 w-4 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      )}
      <Input
        {...props}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${
          showIcon ? "pl-10" : "pl-4"
        } pr-10 w-full transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
      />
      {showClear && value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
} 