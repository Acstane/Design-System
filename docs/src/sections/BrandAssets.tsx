import React from 'react';
import { useTheme, Logo } from '../../../src';

export function BrandAssetsSection() {
  const theme = useTheme();
  const pri = theme.colors.primary;
  const n = theme.colors.neutral;
  const acc = theme.colors.accent;

  return (
    <div>
      <div style={{ marginBottom: 48 }}>
        <h3 style={{
          fontSize: 16, fontWeight: 600, color: n[100],
          fontFamily: theme.fonts.display, marginBottom: 16,
        }}>
          Business Card
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 24,
        }}>
          {/* Front */}
          <div style={{
            width: '100%', aspectRatio: '1.75', borderRadius: theme.radius['2xl'],
            background: `linear-gradient(135deg, ${n[950]} 0%, ${n[900]} 100%)`,
            padding: 32, display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
            boxShadow: theme.shadow.xl,
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 200, height: 200,
              borderRadius: '50%', background: pri[400], opacity: 0.04, filter: 'blur(60px)',
            }} />
            <div style={{
              position: 'absolute', bottom: -30, left: -30, width: 160, height: 160,
              borderRadius: '50%', background: acc.cyan, opacity: 0.03, filter: 'blur(50px)',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
              <Logo size={32} />
              <span style={{
                fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em',
                color: n[0], fontFamily: theme.fonts.display,
              }}>
                Acstane
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                fontSize: 18, fontWeight: 700, color: n[0],
                fontFamily: theme.fonts.body, marginBottom: 2,
              }}>
                Marcin Kondrat
              </div>
              <div style={{
                fontSize: 12, color: pri[300], fontFamily: theme.fonts.mono,
                letterSpacing: '0.02em', marginBottom: 16,
              }}>
                Founder & CEO
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 12, color: n[400], fontFamily: theme.fonts.body }}>
                  marcin@acstane.com
                </div>
                <div style={{ fontSize: 12, color: n[500], fontFamily: theme.fonts.mono }}>
                  acstane.com
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div style={{
            width: '100%', aspectRatio: '1.75', borderRadius: theme.radius['2xl'],
            background: `linear-gradient(135deg, ${pri[900]} 0%, ${n[950]} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: theme.shadow.xl,
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 30% 40%, ${pri[400]}12, transparent 60%)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 70% 70%, ${acc.cyan}08, transparent 50%)`,
            }} />

            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 12, position: 'relative',
            }}>
              <Logo size={56} />
              <span style={{
                fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em',
                color: n[0], fontFamily: theme.fonts.display,
              }}>
                Acstane
              </span>
              <span style={{
                fontSize: 11, color: n[500], fontFamily: theme.fonts.mono,
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
              }}>
                The backbone your product is missing
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <h3 style={{
          fontSize: 16, fontWeight: 600, color: n[100],
          fontFamily: theme.fonts.display, marginBottom: 16,
        }}>
          Folder / Document Cover
        </h3>

        <div style={{
          width: '100%', maxWidth: 600, aspectRatio: '1.414',
          borderRadius: theme.radius['2xl'],
          background: n[950], position: 'relative', overflow: 'hidden',
          boxShadow: theme.shadow.xl,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 6,
            background: `linear-gradient(90deg, ${pri[400]}, ${acc.cyan})`,
          }} />

          <div style={{
            position: 'absolute', top: '15%', right: '-5%', width: 300, height: 300,
            borderRadius: '50%', background: pri[400], opacity: 0.06, filter: 'blur(80px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '-5%', width: 250, height: 250,
            borderRadius: '50%', background: acc.cyan, opacity: 0.04, filter: 'blur(70px)',
          }} />

          <div style={{
            position: 'relative', padding: '48px 40px',
            display: 'flex', flexDirection: 'column', height: '100%',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'auto' }}>
              <Logo size={24} />
              <span style={{
                fontSize: 14, fontWeight: 700, color: n[200],
                fontFamily: theme.fonts.body, letterSpacing: '-0.01em',
              }}>
                Acstane
              </span>
            </div>

            <div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: pri[300],
                fontFamily: theme.fonts.mono, letterSpacing: '0.06em',
                textTransform: 'uppercase' as const, marginBottom: 12,
              }}>
                Technical Documentation
              </div>
              <div style={{
                fontSize: 36, fontWeight: 800, color: n[0],
                fontFamily: theme.fonts.display, letterSpacing: '-0.035em',
                lineHeight: 1.15, marginBottom: 8,
              }}>
                Design System
                <br />
                Reference Guide
              </div>
              <div style={{
                fontSize: 14, color: n[400], fontFamily: theme.fonts.body,
                lineHeight: 1.6, maxWidth: 360, marginBottom: 32,
              }}>
                Tokens, components, and patterns for building
                consistent UI across all Acstane products.
              </div>

              <div style={{
                display: 'flex', gap: 16, alignItems: 'center',
                paddingTop: 20, borderTop: `1px solid ${theme.colors.surface.border}`,
              }}>
                <span style={{ fontSize: 12, color: n[500], fontFamily: theme.fonts.mono }}>
                  v1.0
                </span>
                <span style={{ fontSize: 12, color: n[600] }}>·</span>
                <span style={{ fontSize: 12, color: n[500], fontFamily: theme.fonts.body }}>
                  {new Date().getFullYear()}
                </span>
                <span style={{ fontSize: 12, color: n[600] }}>·</span>
                <span style={{ fontSize: 12, color: n[500], fontFamily: theme.fonts.mono }}>
                  CONFIDENTIAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <h3 style={{
          fontSize: 16, fontWeight: 600, color: n[100],
          fontFamily: theme.fonts.display, marginBottom: 16,
        }}>
          Letterhead
        </h3>

        <div style={{
          width: '100%', maxWidth: 600, aspectRatio: '0.707',
          borderRadius: theme.radius['2xl'],
          background: n[0], position: 'relative', overflow: 'hidden',
          boxShadow: theme.shadow.xl,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 4,
            background: `linear-gradient(90deg, ${pri[400]}, ${pri[300]})`,
          }} />

          <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              marginBottom: 48,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Logo size={28} dark />
                <span style={{
                  fontSize: 16, fontWeight: 800, color: n[950],
                  fontFamily: theme.fonts.body, letterSpacing: '-0.02em',
                }}>
                  Acstane
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.body }}>
                  hello@acstane.com
                </div>
                <div style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono }}>
                  acstane.com
                </div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[1, 0.85, 0.7, 1, 0.9, 0.6, 0.95, 0.75].map((w, i) => (
                <div key={i} style={{
                  width: `${w * 100}%`, height: 8, borderRadius: 4,
                  background: i === 0 ? n[200] : n[100],
                }} />
              ))}
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 24, borderTop: `1px solid ${n[200]}`,
              marginTop: 32,
            }}>
              <Logo size={16} dark />
              <div style={{ fontSize: 10, color: n[400], fontFamily: theme.fonts.mono }}>
                The backbone your product is missing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
