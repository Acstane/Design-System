import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import './Accordion.css';

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
  ({ items, value, onChange, className, ...props }, ref) => {
    const baseId = useId();
    return (
    <div
      ref={ref}
      className={`ac-accordion-accordion ${className ?? ''}`}
      {...props}
    >
      {items.map((item, i) => {
        const open = value === i;
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={i}
            className="ac-accordion-item"
            data-last={i === items.length - 1 || undefined}
          >
            <button
              id={triggerId}
              type="button"
              className="ac-accordion-trigger"
              data-open={open || undefined}
              onClick={() => onChange(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span className="ac-accordion-title" data-open={open || undefined}>
                {item.title}
              </span>
              <Icon
                name="chevronDown"
                size={16}
                className="ac-accordion-chevron"
                data-open={open || undefined}
              />
            </button>
            <div id={panelId} className="ac-accordion-panel" role="region" aria-labelledby={triggerId} data-open={open || undefined}>
              <div className="ac-accordion-content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
    );
  },
);

Accordion.displayName = 'Accordion';
