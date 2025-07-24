"use client"

import * as React from "react"
import { cn } from "../../utils/cn"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', status, ...props }, ref) => {
    const [error, setError] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-14 w-14 text-lg',
    };

    const statusClasses = {
      online: 'bg-success',
      offline: 'bg-muted',
      away: 'bg-warning',
      busy: 'bg-destructive',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-muted",
          "transition-all duration-300 ease-in-out",
          "hover:scale-105",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !error ? (
          <img
            src={src}
            alt={alt}
            className={cn(
              "h-full w-full object-cover",
              "transition-all duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <div 
            className={cn(
              "flex h-full w-full items-center justify-center",
              "bg-muted font-medium uppercase text-muted-foreground",
              "animate-in fade-in-0 zoom-in-95"
            )}
          >
            {fallback || (alt ? alt.charAt(0) : '?')}
          </div>
        )}
        {status && (
          <span 
            className={cn(
              "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background",
              statusClasses[status],
              "animate-in fade-in-0 zoom-in-95"
            )}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  spacing?: 'tight' | 'normal' | 'loose';
  direction?: 'row' | 'row-reverse';
  size?: AvatarProps['size'];
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, className, max = 3, spacing = 'normal', direction = 'row', size = 'md', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const excess = childrenArray.length - max;
    const reversedClass = direction === 'row-reverse' ? 'flex-row-reverse' : '';
    
    const spacingClasses = {
      tight: '-space-x-4',
      normal: '-space-x-2',
      loose: 'space-x-1',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          reversedClass,
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {childrenArray.slice(0, max).map((child, index) => (
          <div 
            key={index} 
            className={cn(
              "relative inline-block ring-2 ring-background",
              "transition-transform duration-300 ease-in-out",
              "hover:z-10 hover:scale-105",
              "animate-in fade-in-0 slide-in-from-left",
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {child}
          </div>
        ))}
        {excess > 0 && (
          <div 
            className={cn(
              "relative inline-block",
              "animate-in fade-in-0 slide-in-from-left",
            )}
            style={{ animationDelay: `${max * 100}ms` }}
          >
            <Avatar size={size}>
              <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-medium">
                +{excess}
              </div>
            </Avatar>
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
