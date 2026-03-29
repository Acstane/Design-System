import { forwardRef, type TextareaHTMLAttributes } from 'react';
import './Textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label rendered above the textarea */
  label?: string;
  /** Helper text shown below the textarea */
  hint?: string;
  /** Error message; replaces hint and applies error styling */
  error?: string;
  /** Use monospace font for textarea text */
  mono?: boolean;
}

/** Multi-line text input with optional label, hint, and error state. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, mono, className, disabled, ...props }, ref) => {
    const message = error || hint;

    return (
      <div className={`ac-textarea-wrapper ${className ?? ''}`}>
        {label && <label className="ac-textarea-label">{label}</label>}
        <textarea
          ref={ref}
          className="ac-textarea-textarea"
          data-mono={mono ? '' : undefined}
          data-error={error ? '' : undefined}
          disabled={disabled}
          {...props}
        />
        {message && (
          <span className="ac-textarea-message" data-error={error ? '' : undefined}>
            {message}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
