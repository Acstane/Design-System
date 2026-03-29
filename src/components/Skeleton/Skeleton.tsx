import { forwardRef, type HTMLAttributes } from 'react';
import './Skeleton.css';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton element. */
  width?: number | string;
  /** Height of the skeleton element. */
  height?: number | string;
  /** Border radius in pixels. */
  radius?: number;
}

/** Placeholder loading skeleton with a pulsing animation. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width = '100%', height = 16, radius = 8, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={`ac-skeleton-skeleton ${className ?? ''}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${radius}px`,
        animation: 'acSkPulse 1.8s ease-in-out infinite',
        ...style,
      }}
      {...props}
    />
  ),
);

Skeleton.displayName = 'Skeleton';
