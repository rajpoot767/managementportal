import { InputHTMLAttributes } from "react";

/**
 * @typedef {Object} InputProps
 * @extends InputHTMLAttributes<HTMLInputElement>
 * @property {string} [className] - Additional CSS classes to apply to the input.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/**
 * Renders a customizable input component.
 * @param {InputProps} props - The properties for the Input component.
 * @param {string} [props.className] - Additional CSS classes to apply to the input.
 * @returns {JSX.Element}
 */
export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}