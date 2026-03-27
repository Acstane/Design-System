import { forwardRef, useId, type SVGProps } from 'react';

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'id'> {
  size?: number;
  dark?: boolean;
  id?: string;
  className?: string;
}

/** The Acstane logo mark rendered as an inline SVG. */
export const Logo = forwardRef<SVGSVGElement, LogoProps>(function Logo(
  { size = 40, dark = false, id, className, ...props },
  ref,
) {
  const autoId = useId();
  const gradientId = id ?? `ac-logo-grad-${autoId}`;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 575 575"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="100.3"
          y1="222.78"
          x2="269.55"
          y2="125.05"
          gradientTransform="translate(0 576) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <>
            <stop offset=".2" stopColor="#a338ff" />
            <stop offset=".28" stopColor="#a93eff" />
            <stop offset=".75" stopColor="#ca64ff" />
            <stop offset="1" stopColor="#d773ff" />
          </>
        </linearGradient>
      </defs>
      <path
        d="M481.52,466.95c-64.72,26.94-139.02-3.69-165.96-68.4L194.16,106.91c64.72-26.94,139.02,3.69,165.96,68.4l121.4,291.64z"
        fill={dark ? '#1a0730' : '#ffffff'}
      />
      <path
        d="M237.51,412.66c-6.73-16.16-12.23-32.75-17.54-49.39-10.52-34.13-46.72-53.27-80.85-42.75s-53.27,46.72-42.75,80.85c.83,2.71,1.85,5.36,3.03,7.93,2.47,5.6,5.72,10.82,9.65,15.52,34.64,47.29,97.16,64.7,151.26,42.13l-22.8-54.3z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
});
