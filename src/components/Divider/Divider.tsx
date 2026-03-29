import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Centered text label */
  label?: string;
  /** Line style variant */
  variant?: 'solid' | 'dashed' | 'gradient';
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
}

/** Horizontal or vertical divider line with optional centered label. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ label, variant = 'solid', orientation = 'horizontal', className, ...props }, ref) => (
    <div
      ref={ref}
      className={`${styles.divider} ${className ?? ''}`}
      data-variant={variant}
      data-orientation={orientation}
      data-has-label={label ? '' : undefined}
      role="separator"
      aria-orientation={orientation}
      {...props}
    >
      {label && orientation === 'horizontal' ? (
        <>
          <span className={styles.line} data-variant={variant} />
          <span className={styles.label}>{label}</span>
          <span className={styles.line} data-variant={variant} />
        </>
      ) : null}
    </div>
  ),
);

Divider.displayName = 'Divider';
