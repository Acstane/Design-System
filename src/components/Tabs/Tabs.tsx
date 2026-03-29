import { forwardRef, type HTMLAttributes } from 'react';
import './Tabs.css';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tab labels. */
  items: string[];
  /** Currently active tab value. */
  value: string;
  /** Callback fired when a tab is selected. */
  onChange: (value: string) => void;
}

/** Controlled tab bar for switching between views. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ items, value, onChange, className, ...props }, ref) => (
    <div ref={ref} className={`ac-tabs-container ${className ?? ''}`} role="tablist" {...props}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className="ac-tabs-tab"
          role="tab"
          aria-selected={item === value}
          tabIndex={item === value ? 0 : -1}
          data-active={item === value || undefined}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  ),
);

Tabs.displayName = 'Tabs';
