import { ReactNode } from "react";

/**
 * @typedef {Object} DropdownMenuProps
 * @property {React.ReactNode} children - The child components to be rendered within the dropdown menu.
 * @property {string} [className] - Additional CSS classes to apply to the dropdown menu.
 */
interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

/**
 * @typedef {Object} DropdownMenuTriggerProps
 * @property {React.ReactNode} children - The child components to be rendered within the dropdown menu trigger.
 * @property {boolean} [asChild] - If true, the child will be rendered as a child of the trigger.
 * @property {string} [className] - Additional CSS classes to apply to the dropdown menu trigger.
 */
interface DropdownMenuTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

/**
 * @typedef {Object} DropdownMenuContentProps
 * @property {React.ReactNode} children - The child components to be rendered within the dropdown menu content.
 * @property {"start" | "end" | "center"} [align] - The alignment of the dropdown menu content relative to the trigger.
 * @property {string} [className] - Additional CSS classes to apply to the dropdown menu content.
 */
interface DropdownMenuContentProps {
  children: ReactNode;
  align?: "start" | "end" | "center";
  className?: string;
}

/**
 * @typedef {Object} DropdownMenuItemProps
 * @property {React.ReactNode} children - The child components to be rendered within the dropdown menu item.
 * @property {string} [className] - Additional CSS classes to apply to the dropdown menu item.
 * @property {() => void} [onClick] - Callback fired when the dropdown menu item is clicked.
 */
interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Renders a dropdown menu component.
 * @param {DropdownMenuProps} props - The properties for the DropdownMenu component.
 * @returns {JSX.Element}
 */
export function DropdownMenu({ children, className = "" }: DropdownMenuProps) {
  return <div className={`relative inline-block text-left ${className}`}>{children}</div>;
}

/**
 * Renders a trigger for the DropdownMenu component.
 * @param {DropdownMenuTriggerProps} props - The properties for the DropdownMenuTrigger component.
 * @returns {JSX.Element}
 */
export function DropdownMenuTrigger({ children, asChild, className = "" }: DropdownMenuTriggerProps) {
  return <div className={className}>{children}</div>;
}

/**
 * Renders the content area of the DropdownMenu.
 * @param {DropdownMenuContentProps} props - The properties for the DropdownMenuContent component.
 * @returns {JSX.Element}
 */
export function DropdownMenuContent({ children, align = "end", className = "" }: DropdownMenuContentProps) {
  const alignStyles = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <div className={`absolute ${alignStyles[align]} z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md animate-in fade-in-80 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Renders an item within the DropdownMenu.
 * @param {DropdownMenuItemProps} props - The properties for the DropdownMenuItem component.
 * @returns {JSX.Element}
 */
export function DropdownMenuItem({ children, className = "", onClick }: DropdownMenuItemProps) {
  return (
    <button
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}