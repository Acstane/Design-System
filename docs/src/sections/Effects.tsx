import React, { useState } from 'react';
import { useTheme, Button } from '../../../src';

export function EffectsSection() {
  const theme = useTheme();
  const [borderGlowActive, setBorderGlowActive] = useState(false);

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

  return (
    <div>
      {/* Glassmorphism */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Glassmorphism</h3>
        <div
          style={{
            position: 'relative',
            height: 280,
            borderRadius: theme.radius.xl,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.colors.primary[800]}, ${theme.colors.neutral[900]}, ${theme.colors.primary[900]})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Blurred circles */}
          <div
            style={{
              position: 'absolute',
              width: 160,
              height: 160,
              borderRadius: '50%',
              background: theme.colors.primary[500],
              opacity: 0.35,
              filter: 'blur(60px)',
              top: 20,
              left: '20%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: theme.colors.accent.cyan,
              opacity: 0.3,
              filter: 'blur(50px)',
              bottom: 20,
              right: '25%',
            }}
          />
          {/* Glass card */}
          <div
            style={{
              position: 'relative',
              width: 300,
              padding: 28,
              borderRadius: theme.radius.lg,
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: theme.colors.neutral[0],
                marginBottom: 8,
                fontFamily: theme.fonts.display,
              }}
            >
              Glass Card
            </div>
            <div
              style={{
                fontSize: 13,
                color: theme.colors.neutral[300],
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              Backdrop blur with translucent background creates a frosted glass
              effect that layers beautifully over rich backgrounds.
            </div>
            <div style={mono}>backdrop-filter: blur(16px)</div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Glow Effects</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
          }}
        >
          {[
            {
              label: 'Subtle',
              shadow: `0 0 8px ${theme.colors.primary[400]}4d`,
            },
            {
              label: 'Medium',
              shadow: `0 0 16px ${theme.colors.primary[400]}80`,
            },
            {
              label: 'Strong',
              shadow: `0 0 24px ${theme.colors.primary[400]}b3, 0 0 48px ${theme.colors.primary[400]}4d`,
            },
            {
              label: 'Animated',
              shadow: `0 0 8px rgba(99, 102, 241, 0.3)`,
              animation: 'acGlowPulse 2s ease-in-out infinite',
            },
          ].map((glow) => (
            <div
              key={glow.label}
              style={{
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: theme.radius.lg,
                backgroundColor: theme.colors.surface.elevated,
                border: `1px solid ${theme.colors.surface.border}`,
                boxShadow: glow.shadow,
                animation: glow.animation ?? undefined,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.colors.neutral[100],
                  marginBottom: 4,
                }}
              >
                {glow.label}
              </div>
              <div style={mono}>box-shadow glow</div>
            </div>
          ))}
        </div>
      </div>

      {/* Shimmer Effect */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Shimmer Effect</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[{ width: '100%' }, { width: '75%' }, { width: '50%' }].map(
            (bar, i) => (
              <div
                key={i}
                style={{
                  width: bar.width,
                  height: 16,
                  borderRadius: theme.radius.md,
                  background: `linear-gradient(90deg, ${theme.colors.neutral[800]} 25%, ${theme.colors.neutral[700]} 50%, ${theme.colors.neutral[800]} 75%)`,
                  backgroundSize: '200% 100%',
                  animation: 'acShimmer 1.8s ease-in-out infinite',
                }}
              />
            ),
          )}
        </div>
        <div style={{ ...mono, marginTop: 8 }}>
          Loading skeleton shimmer via background-position animation
        </div>
      </div>

      {/* Border Glow */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Border Glow</h3>
        <div
          style={{
            maxWidth: 360,
            padding: 24,
            borderRadius: theme.radius.lg,
            backgroundColor: theme.colors.surface.elevated,
            border: `2px solid ${borderGlowActive ? theme.colors.primary[400] : theme.colors.surface.border}`,
            animation: borderGlowActive
              ? 'acBorderGlow 2s ease-in-out infinite'
              : 'none',
            transition: 'border-color 0.3s ease',
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: theme.colors.neutral[100],
              marginBottom: 8,
              fontFamily: theme.fonts.display,
            }}
          >
            Animated Border
          </div>
          <div
            style={{
              fontSize: 13,
              color: theme.colors.neutral[400],
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            A pulsing border glow effect that draws attention to focused or
            active elements.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBorderGlowActive((v) => !v)}
          >
            {borderGlowActive ? 'Deactivate' : 'Activate'} Glow
          </Button>
        </div>
      </div>
    </div>
  );
}
