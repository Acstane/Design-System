import { forwardRef, type HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import styles from './Alert.module.css';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** Optional heading displayed above the body text */
  title?: string;
}

const variantIcon: Record<NonNullable<AlertProps['variant']>, IconName> = {
  info: 'info',
  success: 'check',
  warning: 'alert',
  danger: 'alert',
};

/** Contextual feedback message with icon and optional title. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`${styles.alert} ${className ?? ''}`}
      data-variant={variant}
      role="alert"
      {...props}
    >
      <Icon name={variantIcon[variant]} size={18} color="currentColor" className={styles.icon} />
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ),
);

Alert.displayName = 'Alert';
