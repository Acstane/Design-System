import { forwardRef, type InputHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the input */
  label?: string;
  /** Helper text shown below the input */
  hint?: string;
  /** Error message; replaces hint and applies error styling */
  error?: string;
  /** Use monospace font for input text */
  mono?: boolean;
  /** Icon rendered inside the input on the left */
  icon?: IconName;
  /** Controls input padding and height */
  inputSize?: 'sm' | 'md' | 'lg';
}

/** Text input with optional label, icon, hint, and error state. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, hint, error, mono, icon, inputSize = 'md', className, disabled, ...props },
    ref,
  ) => {
    const message = error || hint;

    return (
      <div className={`ac-input-wrapper ${className ?? ''}`}>
        {label && <label className="ac-input-label">{label}</label>}
        <div className="ac-input-field">
          {icon && (
            <Icon name={icon} size={14} color="currentColor" className="ac-input-icon" />
          )}
          <input
            ref={ref}
            className="ac-input-input"
            data-size={inputSize}
            data-has-icon={icon ? '' : undefined}
            data-mono={mono ? '' : undefined}
            data-error={error ? '' : undefined}
            disabled={disabled}
            {...props}
          />
        </div>
        {message && (
          <span className="ac-input-message" data-error={error ? '' : undefined}>
            {message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
