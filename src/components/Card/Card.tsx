import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional heading displayed at the top */
  title?: string;
  /** Optional footer content rendered below a divider */
  actions?: ReactNode;
  /** Reduces padding from 20px to 16px */
  subtle?: boolean;
}

/** Elevated container for grouping related content. */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, actions, subtle, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`ac-card-card ${className ?? ''}`}
      data-subtle={subtle || undefined}
      {...props}
    >
      {title && <div className="ac-card-title">{title}</div>}
      <div className="ac-card-body">{children}</div>
      {actions && <div className="ac-card-actions">{actions}</div>}
    </div>
  ),
);

Card.displayName = 'Card';
