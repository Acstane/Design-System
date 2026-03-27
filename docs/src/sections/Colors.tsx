import React from 'react';
import { useTheme, Alert } from '../../../src';

function ColorScale({
  label,
  scale,
}: {
  label: string;
  scale: Record<string | number, string>;
}) {
  const theme = useTheme();
  return (
    <div style={{ marginBottom: 32 }}>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: theme.colors.neutral[100],
          marginBottom: 12,
          fontFamily: theme.fonts.display,
        }}
      >
        {label}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: 12,
        }}
      >
        {Object.entries(scale).map(([step, hex]) => (
          <div key={step} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 56,
                borderRadius: theme.radius.md,
                backgroundColor: hex,
                border: `1px solid ${theme.colors.surface.border}`,
              }}
            />
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                fontWeight: 600,
                color: theme.colors.neutral[300],
                fontFamily: theme.fonts.mono,
              }}
            >
              {step}
            </div>
            <div
              style={{
                fontSize: 11,
                color: theme.colors.neutral[400],
                fontFamily: theme.fonts.mono,
              }}
            >
              {hex}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorsSection() {
  const theme = useTheme();

  const subSectionTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  return (
    <div>
      {/* Primary Scale */}
      <ColorScale label="Primary / Purple" scale={theme.colors.primary} />

      {/* Neutral Scale */}
      <ColorScale label="Neutral / Slate" scale={theme.colors.neutral} />

      {/* Accent Colors */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>Accent / Semantic</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 16,
          }}
        >
          {Object.entries(theme.colors.accent).map(([name, hex]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: 72,
                  borderRadius: theme.radius.lg,
                  backgroundColor: hex,
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.neutral[200],
                  textTransform: 'capitalize',
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: theme.colors.neutral[400],
                  fontFamily: theme.fonts.mono,
                }}
              >
                {hex}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Surface System */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>Surface System</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
          }}
        >
          {(['base', 'elevated', 'overlay', 'card'] as const).map((key) => (
            <div
              key={key}
              style={{
                backgroundColor: theme.colors.surface[key],
                border: `1px solid ${theme.colors.surface.border}`,
                borderRadius: theme.radius.lg,
                padding: 20,
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.neutral[200],
                  textTransform: 'capitalize',
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
                {theme.colors.surface[key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Border Variants */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>Border Variants</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {(
            [
              ['border', 'Default'],
              ['borderHover', 'Hover'],
              ['borderFocus', 'Focus'],
            ] as const
          ).map(([key, label]) => (
            <div
              key={key}
              style={{
                flex: '1 1 180px',
                backgroundColor: theme.colors.surface.elevated,
                border: `2px solid ${theme.colors.surface[key]}`,
                borderRadius: theme.radius.lg,
                padding: 20,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.neutral[200],
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: theme.colors.neutral[400],
                  fontFamily: theme.fonts.mono,
                }}
              >
                {theme.colors.surface[key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert */}
      <Alert variant="info">
        The primary 400 shade (#a338ff) is the main brand color used for
        interactive elements, focus rings, and accent highlights throughout the
        system.
      </Alert>
    </div>
  );
}
