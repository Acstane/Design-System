import { forwardRef, type HTMLAttributes } from 'react';
import './Avatar.css';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Full name used to derive initials and a deterministic background color. */
  name: string;
  /** Pixel diameter of the avatar circle. */
  size?: number;
  /** Optional image URL. When provided the image is shown instead of initials. */
  src?: string;
  /** Presence indicator dot. */
  status?: 'online' | 'away' | 'offline';
}

const BG_VARS = [
  'var(--ac-pri-400)',
  'var(--ac-accent-blue)',
  'var(--ac-accent-cyan)',
  'var(--ac-accent-mint)',
  'var(--ac-accent-amber)',
  'var(--ac-accent-pink)',
] as const;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function getBgColor(name: string): string {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return BG_VARS[sum % 6];
}

/** Circular avatar showing an image or name-derived initials with a deterministic background color. */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, size = 36, src, status, className, style, ...props }, ref) => {
    const statusSize = size * 0.32;

    return (
      <div
        ref={ref}
        className={`ac-avatar-root ${className ?? ''}`}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <div
          className="ac-avatar-circle"
          style={{ backgroundColor: src ? undefined : getBgColor(name) }}
        >
          {src ? (
            <img className="ac-avatar-image" src={src} alt={name} />
          ) : (
            <span
              className="ac-avatar-initials"
              style={{ fontSize: size * 0.38, fontWeight: 600 }}
            >
              {getInitials(name)}
            </span>
          )}
        </div>
        {status && (
          <span
            className="ac-avatar-status"
            data-status={status}
            style={{ width: statusSize, height: statusSize }}
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
