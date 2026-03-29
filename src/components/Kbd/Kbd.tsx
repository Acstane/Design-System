import { forwardRef, type HTMLAttributes } from 'react';
import './Kbd.css';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Array of key labels to render (e.g. ['⌘', 'K']) */
  keys: string[];
}

/** Renders a row of keyboard shortcut keys separated by "+" signs. */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ keys, className, ...props }, ref) => (
    <span ref={ref} className={`ac-kbd-row ${className ?? ''}`} {...props}>
      {keys.map((key, i) => (
        <span key={i} className="ac-kbd-group">
          {i > 0 && <span className="ac-kbd-separator">+</span>}
          <kbd className="ac-kbd-key">{key}</kbd>
        </span>
      ))}
    </span>
  ),
);

Kbd.displayName = 'Kbd';
