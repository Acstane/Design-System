import { forwardRef, useState, useCallback, useRef, useEffect, type HTMLAttributes } from 'react';
import styles from './Toast.module.css';

/* ─── Types ───────────────────────────────────────────── */

export type ToastVariant = 'success' | 'danger' | 'warning' | 'info';

export interface ToastData {
  id: string;
  variant: ToastVariant;
  message: string;
  title?: string;
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visual style variant */
  variant: ToastVariant;
  /** Optional heading */
  title?: string;
  /** Body text */
  message: string;
  /** Called when the user dismisses the toast */
  onDismiss: () => void;
}

export interface ToastContainerProps {
  /** Array of active toast objects */
  toasts: ToastData[];
  /** Called with toast id to dismiss */
  onDismiss: (id: string) => void;
}

/* ─── Icons (inline SVG, 16 × 16) ────────────────────── */

const icons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 8.5L6.5 11L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 5v3.5M8 10.5h.007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 5v3.5M8 10.5h.007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 5.5h.007M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/* ─── Toast ───────────────────────────────────────────── */

/** Individual toast notification with icon, optional title, message, and dismiss button. */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ variant, title, message, onDismiss, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={`${styles.toast} ${className ?? ''}`}
      data-variant={variant}
      style={{ animation: 'acFadeInScale 0.25s ease-out', ...style }}
      role="status"
      {...props}
    >
      <span className={styles.icon}>{icons[variant]}</span>
      <div className={styles.content}>
        {title && <span className={styles.title}>{title}</span>}
        <span className={styles.message}>{message}</span>
      </div>
      <button type="button" className={styles.close} onClick={onDismiss} aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  ),
);

Toast.displayName = 'Toast';

/* ─── ToastContainer ──────────────────────────────────── */

/** Fixed container that renders a stack of toasts in the top-right corner. */
export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => (
  <div className={styles.container}>
    {toasts.map((t) => (
      <div key={t.id} className={styles.item}>
        <Toast variant={t.variant} title={t.title} message={t.message} onDismiss={() => onDismiss(t.id)} />
      </div>
    ))}
  </div>
);

ToastContainer.displayName = 'ToastContainer';

/* ─── useToast hook ───────────────────────────────────── */

let _toastId = 0;

interface AddToastOptions {
  variant: ToastVariant;
  message: string;
  title?: string;
  /** Auto-dismiss delay in ms (default 4000) */
  duration?: number;
}

/** Manages a list of toasts with auto-dismiss support. */
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (opts: AddToastOptions) => {
      const id = `toast-${++_toastId}`;
      const toast: ToastData = { id, variant: opts.variant, message: opts.message, title: opts.title };
      setToasts((prev) => [...prev, toast]);

      const duration = opts.duration ?? 4000;
      const timer = setTimeout(() => removeToast(id), duration);
      timersRef.current.set(id, timer);

      return id;
    },
    [removeToast],
  );

  // Cleanup on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  return { toasts, addToast, removeToast };
}
