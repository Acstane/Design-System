import React from 'react';
import { useTheme, Alert } from '../../../src';

export function TokensSection() {
  const theme = useTheme();

  const subSectionTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  const listItem: React.CSSProperties = {
    fontSize: 13,
    color: theme.colors.neutral[300],
    lineHeight: 1.8,
    paddingLeft: 12,
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Alert variant="info">
          All visual properties flow from the Theme object. Change the theme,
          every component updates. No per-component overrides needed.
        </Alert>
      </div>

      {/* Code example */}
      <h3 style={subSectionTitle}>Example: Blue product theme</h3>
      <pre
        style={{
          padding: 20,
          backgroundColor: theme.colors.surface.elevated,
          border: `1px solid ${theme.colors.surface.border}`,
          borderRadius: theme.radius.lg,
          fontFamily: theme.fonts.mono,
          fontSize: 13,
          lineHeight: 1.7,
          color: theme.colors.neutral[200],
          overflowX: 'auto',
          marginBottom: 32,
        }}
      >
{`import { createTheme } from '@acstane/design-system';

const blueTheme = createTheme({
  colors: {
    primary: {
      50:  '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#3b82f6',  // brand blue
      500: '#2563eb',
      600: '#1d4ed8',
      700: '#1e40af',
      800: '#1e3a8a',
      900: '#172554',
    },
    surface: {
      borderFocus: '#3b82f6',
    },
  },
  fonts: {
    display: '"Cal Sans", sans-serif',
  },
});`}
      </pre>

      {/* Two-column guide */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}
      >
        {/* Change per product */}
        <div
          style={{
            padding: 24,
            backgroundColor: theme.colors.surface.card,
            border: `1px solid ${theme.colors.surface.border}`,
            borderRadius: theme.radius.lg,
          }}
        >
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: theme.colors.primary[400],
              fontFamily: theme.fonts.display,
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Change per product
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Primary color scale',
              'borderFocus ring color',
              'Display font family',
              'Accent overrides (success, warning, etc.)',
              'Logo component',
            ].map((item) => (
              <li
                key={item}
                style={{
                  ...listItem,
                  borderLeft: `2px solid ${theme.colors.primary[400]}`,
                  marginBottom: 6,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Keep consistent */}
        <div
          style={{
            padding: 24,
            backgroundColor: theme.colors.surface.card,
            border: `1px solid ${theme.colors.surface.border}`,
            borderRadius: theme.radius.lg,
          }}
        >
          <h4
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: theme.colors.accent.success,
              fontFamily: theme.fonts.display,
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Keep consistent
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Neutral / slate scale',
              'Surface & overlay tokens',
              'Spacing system',
              'Border radius scale',
              'Shadow elevation tokens',
              'Body & mono font families',
              'Component logic & behavior',
            ].map((item) => (
              <li
                key={item}
                style={{
                  ...listItem,
                  borderLeft: `2px solid ${theme.colors.accent.success}`,
                  marginBottom: 6,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
