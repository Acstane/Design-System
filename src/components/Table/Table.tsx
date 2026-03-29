import { type ReactNode } from 'react';
import './Table.css';

export interface TableColumn<T extends Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  width?: string | number;
}

export interface TableProps<T extends Record<string, unknown>> {
  /** Row data to display. */
  data: T[];
  /** Column definitions controlling header labels and cell rendering. */
  columns: TableColumn<T>[];
  /** Called when a row is clicked. */
  onRowClick?: (row: T) => void;
  /** Alternate row background for readability. */
  striped?: boolean;
  /** Reduce cell padding. */
  compact?: boolean;
  className?: string;
}

/** Generic data table with column definitions, optional striping and row click. */
function TableInner<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  striped,
  compact,
  className,
  ...props
}: TableProps<T>) {
  return (
    <div
      className={`ac-table-container ${className ?? ''}`}
      {...props}
    >
      <table className="ac-table-table" data-compact={compact || undefined}>
        <thead className="ac-table-thead">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="ac-table-th"
                style={col.width != null ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="ac-table-row"
              data-striped={striped || undefined}
              data-clickable={onRowClick ? true : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} className="ac-table-td">
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Table = TableInner as <T extends Record<string, unknown>>(
  props: TableProps<T>,
) => React.ReactElement;
