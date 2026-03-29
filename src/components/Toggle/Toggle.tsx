import { forwardRef, type HTMLAttributes } from 'react';
import './Toggle.css';

export interface ToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Optional label rendered beside the toggle */
  label?: string;
  /** Controlled checked state */
  checked: boolean;
  /** Called when the toggle is clicked */
  onChange: (checked: boolean) => void;
  /** Toggle size */
  size?: 'sm' | 'md';
  /** Disables interaction */
  disabled?: boolean;
}

/** A sliding toggle switch for boolean values. */
export const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
  ({ label, checked, onChange, size = 'md', disabled, className, ...props }, ref) => (
    <div
      ref={ref}
      className={`ac-toggle-wrapper ${className ?? ''}`}
      data-disabled={disabled ? '' : undefined}
      onClick={() => !disabled && onChange(!checked)}
      role="switch"
      aria-checked={checked}
      {...props}
    >
      <div
        className="ac-toggle-track"
        data-size={size}
        data-checked={checked ? '' : undefined}
      >
        <div className="ac-toggle-thumb" />
      </div>
      {label && <span className="ac-toggle-label">{label}</span>}
    </div>
  ),
);

Toggle.displayName = 'Toggle';
