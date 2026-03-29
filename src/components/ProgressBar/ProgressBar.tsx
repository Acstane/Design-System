import { forwardRef, type HTMLAttributes } from 'react';
import './ProgressBar.css';

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
      <div ref={ref} className={`ac-progress-root ${className ?? ''}`} {...props}>
        {(label || showValue) && (
          <div className="ac-progress-labelRow">
            {label && <span className="ac-progress-label">{label}</span>}
            {showValue && <span className="ac-progress-value">{Math.round(clamped)}%</span>}
          </div>
        )}
        <div className="ac-progress-track">
          <div
            className="ac-progress-fill"
            data-variant={variant}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
