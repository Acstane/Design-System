import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Kbd.module.css';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Array of key labels to render (e.g. ['⌘', 'K']) */
  keys: string[];
}

/** Renders a row of keyboard shortcut keys separated by "+" signs. */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ keys, className, ...props }, ref) => (
    <span ref={ref} className={`${styles.row} ${className ?? ''}`} {...props}>
      {keys.map((key, i) => (
        <span key={i} className={styles.group}>
          {i > 0 && <span className={styles.separator}>+</span>}
          <kbd className={styles.key}>{key}</kbd>
        </span>
      ))}
    </span>
  ),
);

Kbd.displayName = 'Kbd';
