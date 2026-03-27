import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import styles from './Accordion.module.css';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Items to render as collapsible sections. */
  items: AccordionItem[];
  /** Index of the currently open item, or null when all are closed. */
  value: number | null;
  /** Called when an item is toggled. Receives the index, or null to close. */
  onChange: (index: number | null) => void;
}

/** Vertically stacked set of collapsible content sections. */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, value, onChange, className, ...props }, ref) => (
    <div
      ref={ref}
      className={`${styles.accordion} ${className ?? ''}`}
      {...props}
    >
      {items.map((item, i) => {
        const open = value === i;
        return (
          <div
            key={i}
            className={styles.item}
            data-last={i === items.length - 1 || undefined}
          >
            <button
              type="button"
              className={styles.trigger}
              data-open={open || undefined}
              onClick={() => onChange(open ? null : i)}
              aria-expanded={open}
            >
              <span className={styles.title} data-open={open || undefined}>
                {item.title}
              </span>
              <Icon
                name="chevronDown"
                size={16}
                className={styles.chevron}
                data-open={open || undefined}
              />
            </button>
            <div className={styles.panel} data-open={open || undefined}>
              <div className={styles.content}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  ),
);

Accordion.displayName = 'Accordion';
