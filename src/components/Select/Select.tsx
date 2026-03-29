import { forwardRef, useState, useEffect, useRef, useCallback, useId, type HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import styles from './Select.module.css';

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Visible label rendered above the select */
  label?: string;
  /** List of selectable options */
  options: string[];
  /** Currently selected value */
  value: string | null;
  /** Called when an option is selected */
  onChange: (value: string) => void;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Disables interaction */
  disabled?: boolean;
}

/** A custom dropdown select with label and keyboard-free option list. */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = 'Select\u2026',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const labelId = useId();
    const listboxId = useId();

    const handleOutsideClick = useCallback((e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }, []);

    useEffect(() => {
      if (open) {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
      }
    }, [open, handleOutsideClick]);

    const handleSelect = (option: string) => {
      onChange(option);
      setOpen(false);
    };

    return (
      <div
        ref={(node) => {
          (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={`${styles.wrapper} ${className ?? ''}`}
        data-disabled={disabled ? '' : undefined}
        {...props}
      >
        {label && <span id={labelId} className={styles.label}>{label}</span>}
        <button
          type="button"
          className={styles.trigger}
          data-open={open ? '' : undefined}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby={label ? labelId : undefined}
        >
          <span className={value ? styles.value : styles.placeholder}>
            {value ?? placeholder}
          </span>
          <Icon name="chevronDown" size={14} color="currentColor" className={styles.chevron} />
        </button>
        {open && (
          <div className={styles.dropdown} role="listbox" id={listboxId}>
            {options.map((option) => (
              <div
                key={option}
                className={styles.option}
                role="option"
                aria-selected={option === value}
                data-selected={option === value ? '' : undefined}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
