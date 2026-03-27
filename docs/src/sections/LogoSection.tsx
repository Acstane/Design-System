import React from 'react';
import { useTheme, Logo } from '../../../src';

const LOGO_SIZES = [64, 48, 36, 28, 20];

export function LogoSection() {
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
      {/* Logo Mark -- light on dark */}
      <h3 style={subSectionTitle}>Logo Mark (light on dark)</h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: 24,
          backgroundColor: theme.colors.surface.elevated,
          borderRadius: theme.radius.lg,
          border: `1px solid ${theme.colors.surface.border}`,
          marginBottom: 24,
        }}
      >
        {LOGO_SIZES.map((size) => (
          <Logo key={size} size={size} />
        ))}
      </div>

      {/* Logo Mark — dark on light */}
      <h3 style={subSectionTitle}>Logo Mark (dark on light)</h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: 24,
          backgroundColor: '#ffffff',
          borderRadius: theme.radius.lg,
          border: `1px solid ${theme.colors.surface.border}`,
          marginBottom: 24,
        }}
      >
        {LOGO_SIZES.map((size) => (
          <Logo key={size} size={size} dark />
        ))}
      </div>

      {/* Logo + Wordmark */}
      <h3 style={subSectionTitle}>Logo + Wordmark</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Dark surface */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 24,
            backgroundColor: theme.colors.surface.elevated,
            borderRadius: theme.radius.lg,
            border: `1px solid ${theme.colors.surface.border}`,
          }}
        >
          <Logo size={36} />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: theme.colors.neutral[0],
              fontFamily: theme.fonts.display,
              letterSpacing: '-0.02em',
            }}
          >
            Acstane
          </span>
        </div>

        {/* White surface */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 24,
            backgroundColor: '#ffffff',
            borderRadius: theme.radius.lg,
            border: `1px solid ${theme.colors.surface.border}`,
          }}
        >
          <Logo size={36} dark />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#0f0a1a',
              fontFamily: theme.fonts.display,
              letterSpacing: '-0.02em',
            }}
          >
            Acstane
          </span>
        </div>

        {/* Brand surface */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 24,
            backgroundColor: theme.colors.primary[900],
            borderRadius: theme.radius.lg,
          }}
        >
          <Logo size={36} />
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: theme.fonts.display,
              letterSpacing: '-0.02em',
            }}
          >
            Acstane
          </span>
        </div>
      </div>
    </div>
  );
}
