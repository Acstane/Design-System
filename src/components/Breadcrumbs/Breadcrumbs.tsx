import { forwardRef, type HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './Breadcrumbs.css';

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Ordered list of breadcrumb labels. The last item is treated as the current page. */
  items: string[];
}

/** Horizontal breadcrumb navigation showing the current location within a hierarchy. */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, className, ...props }, ref) => (
    <nav ref={ref} className={`ac-breadcrumbs-nav ${className ?? ''}`} {...props}>
      <ol className="ac-breadcrumbs-list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="ac-breadcrumbs-item">
              <span className={isLast ? 'ac-breadcrumbs-current' : 'ac-breadcrumbs-link'}>{item}</span>
              {!isLast && (
                <Icon name="chevronRight" size={10} color="var(--ac-n-600)" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  ),
);

Breadcrumbs.displayName = 'Breadcrumbs';
