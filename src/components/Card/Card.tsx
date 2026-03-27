import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Card.module.css';

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
      className={`${styles.card} ${className ?? ''}`}
      data-subtle={subtle || undefined}
      {...props}
    >
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.body}>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  ),
);

Card.displayName = 'Card';
