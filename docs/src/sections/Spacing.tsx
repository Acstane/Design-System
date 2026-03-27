import React from 'react';
import { useTheme } from '../../../src';

export function SpacingSection() {
  const theme = useTheme();

  const entries = Object.entries(theme.spacing)
    .map(([key, value]) => ({ key, value: value as number }))
    .filter((e) => e.value > 0);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          backgroundColor: theme.colors.surface.card,
          border: `1px solid ${theme.colors.surface.border}`,
          borderRadius: theme.radius.lg,
          padding: 24,
        }}
      >
        {entries.map((entry) => (
          <div
            key={entry.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span
              style={{
                width: 32,
                fontSize: 12,
                fontWeight: 600,
                color: theme.colors.neutral[300],
                fontFamily: theme.fonts.mono,
                textAlign: 'right',
                flexShrink: 0,
              }}
            >
              {entry.key}
            </span>
            <div
              style={{
                height: 20,
                width: entry.value,
                minWidth: 4,
                borderRadius: theme.radius.xs,
                background: `linear-gradient(90deg, ${theme.colors.primary[400]}, ${theme.colors.primary[300]})`,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: theme.colors.neutral[400],
                fontFamily: theme.fonts.mono,
                flexShrink: 0,
              }}
            >
              {entry.value}px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
