import React from 'react';
import { useTheme } from '../../../src';

export function ShadowsSection() {
  const theme = useTheme();

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 24,
        }}
      >
        {Object.entries(theme.shadow).map(([key, value]) => (
          <div
            key={key}
            style={{
              backgroundColor: theme.colors.surface.card,
              border: `1px solid ${theme.colors.surface.border}`,
              borderRadius: theme.radius.lg,
              padding: 24,
              boxShadow: value,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.colors.neutral[100],
                marginBottom: 8,
                fontFamily: theme.fonts.display,
              }}
            >
              {key}
            </div>
            <div
              style={{
                fontSize: 11,
                color: theme.colors.neutral[400],
                fontFamily: theme.fonts.mono,
                wordBreak: 'break-all',
                lineHeight: 1.5,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
