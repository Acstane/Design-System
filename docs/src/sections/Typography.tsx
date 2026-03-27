import React from 'react';
import { useTheme } from '../../../src';

const WEIGHT_NAMES: Record<number, string> = {
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  550: 'Semi',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
};

export function TypographySection() {
  const theme = useTheme();

  const subSectionTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  const fontFamilies = [
    {
      name: 'Satoshi',
      role: 'Display',
      description:
        'Used for headings, hero text, and prominent UI elements that need visual impact.',
      family: theme.fonts.display,
      sample: 'The quick brown fox jumps over the lazy dog',
    },
    {
      name: 'Inter',
      role: 'Body',
      description:
        'The primary text font for body copy, labels, descriptions, and general interface text.',
      family: theme.fonts.body,
      sample: 'The quick brown fox jumps over the lazy dog',
    },
    {
      name: 'JetBrains Mono',
      role: 'Mono',
      description:
        'Used for code blocks, inline code, technical values, and data displays.',
      family: theme.fonts.mono,
      sample: 'const theme = useTheme();',
    },
  ];

  const fontSizeOrder: Array<{ key: string; size: number }> = [
    { key: 'xs', size: theme.fontSize.xs },
    { key: 'sm', size: theme.fontSize.sm },
    { key: 'md', size: theme.fontSize.md },
    { key: 'base', size: theme.fontSize.base },
    { key: 'lg', size: theme.fontSize.lg },
    { key: 'xl', size: theme.fontSize.xl },
    { key: '2xl', size: theme.fontSize['2xl'] },
    { key: '3xl', size: theme.fontSize['3xl'] },
    { key: '4xl', size: theme.fontSize['4xl'] },
    { key: '5xl', size: theme.fontSize['5xl'] },
  ];

  return (
    <div>
      {/* Font Families */}
      <h3 style={subSectionTitle}>Font Families</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}
      >
        {fontFamilies.map((f) => (
          <div
            key={f.name}
            style={{
              backgroundColor: theme.colors.surface.card,
              border: `1px solid ${theme.colors.surface.border}`,
              borderRadius: theme.radius.lg,
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: theme.colors.neutral[0],
                  fontFamily: f.family,
                }}
              >
                {f.name}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: theme.colors.primary[400],
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {f.role}
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: theme.colors.neutral[400],
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              {f.description}
            </p>
            <div
              style={{
                fontSize: 16,
                color: theme.colors.neutral[200],
                fontFamily: f.family,
                lineHeight: 1.5,
                padding: 12,
                backgroundColor: theme.colors.surface.base,
                borderRadius: theme.radius.md,
              }}
            >
              {f.sample}
            </div>
          </div>
        ))}
      </div>

      {/* Type Scale */}
      <h3 style={subSectionTitle}>Type Scale</h3>
      <div
        style={{
          marginBottom: 40,
          backgroundColor: theme.colors.surface.card,
          border: `1px solid ${theme.colors.surface.border}`,
          borderRadius: theme.radius.lg,
          padding: 24,
        }}
      >
        {fontSizeOrder.map((entry) => (
          <div
            key={entry.key}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
              padding: '10px 0',
              borderBottom: `1px solid ${theme.colors.surface.border}`,
            }}
          >
            <span
              style={{
                width: 40,
                fontSize: 11,
                fontWeight: 600,
                color: theme.colors.primary[400],
                fontFamily: theme.fonts.mono,
                flexShrink: 0,
              }}
            >
              {entry.key}
            </span>
            <span
              style={{
                width: 40,
                fontSize: 11,
                color: theme.colors.neutral[400],
                fontFamily: theme.fonts.mono,
                flexShrink: 0,
              }}
            >
              {entry.size}px
            </span>
            <span
              style={{
                fontSize: entry.size,
                color: theme.colors.neutral[0],
                fontFamily: theme.fonts.body,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Acstane Design System
            </span>
          </div>
        ))}
      </div>

      {/* Font Weight Scale */}
      <h3 style={subSectionTitle}>Font Weights</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 16,
        }}
      >
        {Object.entries(WEIGHT_NAMES).map(([weight, name]) => (
          <div key={weight} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 40,
                fontWeight: Number(weight),
                color: theme.colors.neutral[0],
                fontFamily: theme.fonts.display,
                marginBottom: 8,
              }}
            >
              Aa
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: theme.colors.neutral[300],
                fontFamily: theme.fonts.mono,
              }}
            >
              {weight}
            </div>
            <div
              style={{
                fontSize: 11,
                color: theme.colors.neutral[400],
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
