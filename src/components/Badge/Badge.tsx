import { forwardRef, type HTMLAttributes } from 'react';
import './Badge.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Show a colored dot indicator before the label */
  dot?: boolean;
}

/** Small label for status, categories, or counts. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', dot, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={`ac-badge-badge ${className ?? ''}`}
      data-variant={variant}
      {...props}
    >
      {dot && <span className="ac-badge-dot" />}
      {children}
    </span>
  ),
);

Badge.displayName = 'Badge';
