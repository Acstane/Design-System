import { forwardRef, useState, type HTMLAttributes } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Text displayed inside the tooltip bubble. */
  label: string;
  /** Side of the trigger the tooltip appears on. */
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/** Displays a text tooltip on hover, positioned relative to the trigger element. */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ label, position = 'top', className, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${className ?? ''}`}
        onMouseEnter={(e) => {
          setShow(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setShow(false);
          onMouseLeave?.(e);
        }}
        {...props}
      >
        {children}
        {show && (
          <span className={styles.bubble} data-position={position}>
            {label}
          </span>
        )}
      </div>
    );
  },
);

Tooltip.displayName = 'Tooltip';
