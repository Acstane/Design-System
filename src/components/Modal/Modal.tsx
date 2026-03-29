import { forwardRef, useEffect, useId, type HTMLAttributes, type ReactNode } from 'react';
import './Modal.css';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Controls whether the modal is visible. */
  open: boolean;
  /** Callback fired when the modal requests to close. */
  onClose: () => void;
  /** Optional title rendered in the header. */
  title?: string;
  /** Optional actions rendered in the footer. */
  actions?: ReactNode;
  /** Width of the dialog panel. */
  width?: number | string;
}

/** Overlay dialog with optional header, scrollable body, and action footer. */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, actions, width = 480, className, children, ...props }, ref) => {
    const titleId = useId();
    useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
      <div className="ac-modal-backdrop" onClick={onClose}>
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          className={`ac-modal-dialog ${className ?? ''}`}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            animation: 'acFadeInScale 0.2s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {title && <div id={titleId} className="ac-modal-header">{title}</div>}
          <div className="ac-modal-body">{children}</div>
          {actions && <div className="ac-modal-footer">{actions}</div>}
        </div>
      </div>
    );
  },
);

Modal.displayName = 'Modal';
