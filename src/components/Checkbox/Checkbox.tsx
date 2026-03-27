import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Optional label rendered beside the checkbox */
  label?: string;
  /** Controlled checked state */
  checked: boolean;
  /** Called when the checkbox is clicked */
  onChange: (checked: boolean) => void;
  /** Renders as a radio button instead of a checkbox */
  radio?: boolean;
  /** Disables interaction */
  disabled?: boolean;
}

/** A checkbox or radio control with an optional label. */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ label, checked, onChange, radio, disabled, className, ...props }, ref) => (
    <div
      ref={ref}
      className={`${styles.wrapper} ${className ?? ''}`}
      data-disabled={disabled ? '' : undefined}
      onClick={() => !disabled && onChange(!checked)}
      role={radio ? 'radio' : 'checkbox'}
      aria-checked={checked}
      {...props}
    >
      <div
        className={styles.box}
        data-checked={checked ? '' : undefined}
        data-radio={radio ? '' : undefined}
      >
        {checked && !radio && (
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" className={styles.check}>
            <polyline
              points="20 6 9 17 4 12"
              stroke="#fff"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {checked && radio && <div className={styles.dot} />}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  ),
);

Checkbox.displayName = 'Checkbox';
