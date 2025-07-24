import { LabelHTMLAttributes } from "react";

/**
 * @typedef {Object} LabelProps
 * @extends React.LabelHTMLAttributes<HTMLLabelElement>
 * @property {string} [className] - Additional CSS classes to apply to the label.
 */
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

/**
 * Renders a customizable label component.
 * @param {LabelProps} props - The properties for the Label component.
 * @returns {JSX.Element}
 */
export function Label({ className = "", ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  );
}