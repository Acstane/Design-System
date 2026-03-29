import { forwardRef, type HTMLAttributes, useMemo } from 'react';
import './Pagination.css';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current active page (1-indexed). */
  page: number;
  /** Total number of pages. */
  total: number;
  /** Callback fired when a page is selected. */
  onChange: (page: number) => void;
  /** Number of sibling pages shown around the current page. */
  siblings?: number;
}

function buildRange(start: number, end: number): number[] {
  const range: number[] = [];
  for (let i = start; i <= end; i++) range.push(i);
  return range;
}

function buildPages(page: number, total: number, siblings: number): (number | 'ellipsis')[] {
  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, total - 1);

  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  if (total <= 1) return [1];

  const pages: (number | 'ellipsis')[] = [1];

  if (showLeftEllipsis) {
    pages.push('ellipsis');
  } else {
    pages.push(...buildRange(2, left - 1));
  }

  pages.push(...buildRange(left, right));

  if (showRightEllipsis) {
    pages.push('ellipsis');
  } else {
    pages.push(...buildRange(right + 1, total - 1));
  }

  if (total > 1) pages.push(total);

  return pages;
}

/** Page navigation control with ellipsis for large page counts. */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ page, total, onChange, siblings = 1, className, ...props }, ref) => {
    const pages = useMemo(() => buildPages(page, total, siblings), [page, total, siblings]);

    return (
      <div ref={ref} className={`ac-pagination-root ${className ?? ''}`} {...props}>
        <button
          className="ac-pagination-nav"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Prev
        </button>

        {pages.map((item, i) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${i}`} className="ac-pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={item}
              className="ac-pagination-page"
              data-active={item === page || undefined}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          ),
        )}

        <button
          className="ac-pagination-nav"
          disabled={page >= total}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';
