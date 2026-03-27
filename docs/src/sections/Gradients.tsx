import React from 'react';
import { useTheme } from '../../../src';

export function GradientsSection() {
  const theme = useTheme();

  const pri = theme.colors.primary;
  const acc = theme.colors.accent;

  const subTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  const mono: React.CSSProperties = {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    color: theme.colors.neutral[400],
  };

  const linearGradients = [
    {
      name: 'Brand',
      css: `linear-gradient(135deg, ${pri[500]}, ${pri[400]})`,
    },
    {
      name: 'Subtle',
      css: `linear-gradient(135deg, ${pri[800]}, ${pri[600]})`,
    },
    {
      name: 'Night',
      css: `linear-gradient(135deg, ${pri[950]}, ${pri[700]})`,
    },
    {
      name: 'Violet Blue',
      css: `linear-gradient(135deg, ${pri[400]}, ${acc.blue})`,
    },
    {
      name: 'Aurora',
      css: `linear-gradient(135deg, ${pri[400]}, ${acc.cyan}, ${acc.mint})`,
    },
    {
      name: 'Sunset',
      css: `linear-gradient(135deg, ${pri[400]}, ${acc.pink}, ${acc.amber})`,
    },
  ];

  const radialGradients = [
    {
      name: 'Spotlight',
      css: `radial-gradient(circle at 50% 40%, ${pri[400]}40, transparent 70%)`,
      bg: theme.colors.surface.base,
    },
    {
      name: 'Corner Glow',
      css: `radial-gradient(circle at 0% 0%, ${acc.cyan}30, transparent 50%)`,
      bg: theme.colors.surface.base,
    },
    {
      name: 'Vignette',
      css: `radial-gradient(ellipse at center, transparent 40%, ${pri[950]} 100%)`,
      bg: theme.colors.neutral[800],
    },
  ];

  return (
    <div>
      {/* Linear Gradients */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Linear Gradients</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {linearGradients.map((g) => (
            <div key={g.name}>
              <div
                style={{
                  height: 80,
                  borderRadius: theme.radius.lg,
                  background: g.css,
                  border: `1px solid ${theme.colors.surface.border}`,
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.neutral[200],
                }}
              >
                {g.name}
              </div>
              <div
                style={{
                  ...mono,
                  wordBreak: 'break-all',
                  lineHeight: 1.4,
                  marginTop: 2,
                }}
              >
                {g.css}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Gradient */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Animated Gradient</h3>
        <div
          style={{
            height: 100,
            borderRadius: theme.radius.xl,
            background: `linear-gradient(270deg, ${pri[500]}, ${acc.cyan}, ${pri[400]}, ${acc.pink})`,
            backgroundSize: '400% 400%',
            animation: 'acGradientShift 6s ease infinite',
            border: `1px solid ${theme.colors.surface.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.neutral[0],
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              fontFamily: theme.fonts.display,
            }}
          >
            background-size: 400% &middot; gradientShift animation
          </span>
        </div>
        <div style={{ ...mono, marginTop: 8 }}>
          4-color gradient with background-position animation for a shifting
          color effect
        </div>
      </div>

      {/* Radial Gradients */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Radial Gradients</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {radialGradients.map((g) => (
            <div key={g.name}>
              <div
                style={{
                  height: 120,
                  borderRadius: theme.radius.lg,
                  background: `${g.css}, ${g.bg}`,
                  border: `1px solid ${theme.colors.surface.border}`,
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.neutral[200],
                }}
              >
                {g.name}
              </div>
              <div
                style={{
                  ...mono,
                  wordBreak: 'break-all',
                  lineHeight: 1.4,
                  marginTop: 2,
                }}
              >
                {g.css}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
