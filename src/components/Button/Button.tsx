import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Optional icon rendered before children */
  icon?: IconName;
}

const iconSizeMap = { sm: 14, md: 16, lg: 18 } as const;

/** Interactive button with multiple visual variants and sizes. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={`${styles.button} ${className ?? ''}`}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {icon && <Icon name={icon} size={iconSizeMap[size]} color="currentColor" />}
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
