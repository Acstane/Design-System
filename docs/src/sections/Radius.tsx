import React from 'react';
import { useTheme } from '../../../src';

export function RadiusSection() {
  const theme = useTheme();

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: 24,
        }}
      >
        {Object.entries(theme.radius).map(([key, value]) => {
          const isFullCircle = value >= 9999;
          const size = isFullCircle ? 64 : 64;
          return (
            <div key={key} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: size,
                  height: size,
                  borderRadius: value,
                  border: `2px solid ${theme.colors.primary[400]}`,
                  backgroundColor: 'transparent',
                  margin: '0 auto 10px',
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.neutral[200],
                  fontFamily: theme.fonts.mono,
                }}
              >
                {key}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: theme.colors.neutral[400],
                  fontFamily: theme.fonts.mono,
                }}
              >
                {isFullCircle ? '9999px' : `${value}px`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
