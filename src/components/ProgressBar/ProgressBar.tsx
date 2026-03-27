import { forwardRef, type HTMLAttributes } from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current progress value from 0 to 100. */
  value?: number;
  /** Color variant of the fill bar. */
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  /** Label displayed above the track on the left. */
  label?: string;
  /** Whether to display the numeric percentage above the track on the right. */
  showValue?: boolean;
}

/** Horizontal progress indicator with optional label and percentage display. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value = 0, variant = 'primary', label, showValue, className, ...props }, ref) => {
    const clamped = Math.max(0, Math.min(100, value));

    return (
      <div ref={ref} className={`${styles.root} ${className ?? ''}`} {...props}>
        {(label || showValue) && (
          <div className={styles.labelRow}>
            {label && <span className={styles.label}>{label}</span>}
            {showValue && <span className={styles.value}>{Math.round(clamped)}%</span>}
          </div>
        )}
        <div className={styles.track}>
          <div
            className={styles.fill}
            data-variant={variant}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
