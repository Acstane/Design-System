import React, { useRef, useCallback } from 'react';
import { useTheme, Logo, Icon } from '../../../src';
import { toPng } from 'html-to-image';

function DownloadBtn({ targetRef, filename }: { targetRef: React.RefObject<HTMLDivElement | null>; filename: string }) {
  const [saving, setSaving] = React.useState(false);

  const handleDownload = useCallback(async () => {
    if (!targetRef.current) return;
    setSaving(true);
    try {
      const url = await toPng(targetRef.current, { pixelRatio: 3, cacheBust: true });
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.png`;
      a.click();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  }, [targetRef, filename]);

  return (
    <button
      onClick={handleDownload}
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', fontSize: 11, fontWeight: 550,
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
        color: '#fff', cursor: 'pointer', opacity: saving ? 0.5 : 0.7,
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
    >
      <Icon name="download" size={13} />
      {saving ? 'Saving…' : 'PNG'}
    </button>
  );
}

export function BrandAssetsSection() {
  const theme = useTheme();
  const pri = theme.colors.primary;
  const n = theme.colors.neutral;
  const acc = theme.colors.accent;

  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const subTitle: React.CSSProperties = {
    fontSize: 16, fontWeight: 600, color: n[100],
    fontFamily: theme.fonts.display, marginBottom: 16,
  };

  return (
    <div>
      {/* Business Card */}
      <div style={{ marginBottom: 56 }}>
        <h3 style={subTitle}>Business Card</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 32,
        }}>
          {/* Front */}
          <div style={{ position: 'relative' }}>
            <DownloadBtn targetRef={cardFrontRef} filename="acstane-card-front" />
            <div ref={cardFrontRef} style={{
              width: '100%', aspectRatio: '1.75', borderRadius: 20,
              background: n[950], padding: '36px 32px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3)',
            }}>
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', top: -80, right: -60, width: 280, height: 280,
                borderRadius: '50%', background: pri[400], opacity: 0.07, filter: 'blur(80px)',
              }} />
              <div style={{
                position: 'absolute', bottom: -60, left: -40, width: 220, height: 220,
                borderRadius: '50%', background: acc.cyan, opacity: 0.05, filter: 'blur(70px)',
              }} />
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 32, right: 32, height: 1,
                background: `linear-gradient(90deg, transparent, ${pri[400]}40, transparent)`,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
                <Logo size={28} />
                <span style={{
                  fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em',
                  color: n[0], fontFamily: theme.fonts.display,
                }}>Acstane</span>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{
                  fontSize: 20, fontWeight: 700, color: n[0],
                  fontFamily: theme.fonts.body, letterSpacing: '-0.02em', marginBottom: 2,
                }}>Marcin Kondrat</div>
                <div style={{
                  fontSize: 11, color: pri[300], fontFamily: theme.fonts.mono,
                  letterSpacing: '0.04em', textTransform: 'uppercase' as const, marginBottom: 20,
                }}>Founder & CEO</div>
                <div style={{
                  display: 'flex', gap: 24, fontSize: 11.5, color: n[400], fontFamily: theme.fonts.body,
                }}>
                  <span>marcin@acstane.com</span>
                  <span style={{ color: n[600] }}>·</span>
                  <span style={{ fontFamily: theme.fonts.mono, color: n[500] }}>acstane.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div style={{ position: 'relative' }}>
            <DownloadBtn targetRef={cardBackRef} filename="acstane-card-back" />
            <div ref={cardBackRef} style={{
              width: '100%', aspectRatio: '1.75', borderRadius: 20,
              background: n[950], display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3)',
            }}>
              {/* Pattern grid */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.025,
                backgroundImage: `radial-gradient(${n[400]} 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }} />
              {/* Glow */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 300, height: 300, borderRadius: '50%',
                background: pri[400], opacity: 0.06, filter: 'blur(100px)',
              }} />

              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 16, position: 'relative',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 18,
                  background: `linear-gradient(135deg, ${pri[400]}, ${pri[300]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 40px ${pri[400]}30, 0 8px 24px rgba(0,0,0,0.3)`,
                }}>
                  <Logo size={44} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em',
                    color: n[0], fontFamily: theme.fonts.display, marginBottom: 4,
                  }}>Acstane</div>
                  <div style={{
                    fontSize: 10, color: n[500], fontFamily: theme.fonts.mono,
                    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  }}>Identity Infrastructure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Cover */}
      <div style={{ marginBottom: 56 }}>
        <h3 style={subTitle}>Document Cover</h3>
        <div style={{ position: 'relative', maxWidth: 560 }}>
          <DownloadBtn targetRef={folderRef} filename="acstane-document-cover" />
          <div ref={folderRef} style={{
            width: '100%', aspectRatio: '0.77', borderRadius: 20,
            background: n[950], position: 'relative', overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 12px 28px rgba(0,0,0,0.3)',
          }}>
            {/* Top gradient bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${pri[400]}, ${acc.cyan}, ${pri[300]})`,
            }} />
            {/* Ambient glows */}
            <div style={{
              position: 'absolute', top: '20%', right: '-10%', width: 400, height: 400,
              borderRadius: '50%', background: pri[400], opacity: 0.05, filter: 'blur(120px)',
            }} />
            <div style={{
              position: 'absolute', bottom: '5%', left: '-10%', width: 300, height: 300,
              borderRadius: '50%', background: acc.cyan, opacity: 0.03, filter: 'blur(100px)',
            }} />
            {/* Dot pattern */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.02,
              backgroundImage: `radial-gradient(${n[400]} 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }} />

            <div style={{
              position: 'relative', padding: '44px 40px',
              display: 'flex', flexDirection: 'column', height: '100%',
            }}>
              {/* Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                marginBottom: 'auto',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Logo size={22} />
                  <span style={{
                    fontSize: 13, fontWeight: 700, color: n[300],
                    fontFamily: theme.fonts.body,
                  }}>Acstane</span>
                </div>
                <span style={{
                  fontSize: 10, color: n[600], fontFamily: theme.fonts.mono,
                  letterSpacing: '0.04em',
                }}>CONFIDENTIAL</span>
              </div>

              {/* Main content */}
              <div>
                <div style={{
                  fontSize: 10, fontWeight: 600, color: pri[300],
                  fontFamily: theme.fonts.mono, letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const, marginBottom: 16,
                }}>Technical Documentation</div>

                <div style={{
                  fontSize: 42, fontWeight: 800, color: n[0],
                  fontFamily: theme.fonts.display, letterSpacing: '-0.04em',
                  lineHeight: 1.1, marginBottom: 12,
                }}>
                  Design
                  <br />
                  System
                </div>

                <div style={{
                  width: 48, height: 3, borderRadius: 2, marginBottom: 16,
                  background: `linear-gradient(90deg, ${pri[400]}, ${acc.cyan})`,
                }} />

                <div style={{
                  fontSize: 14, color: n[400], fontFamily: theme.fonts.body,
                  lineHeight: 1.7, maxWidth: 320, marginBottom: 40,
                }}>
                  Tokens, components, and patterns for
                  building consistent UI across all products.
                </div>

                <div style={{
                  display: 'flex', gap: 12, alignItems: 'center',
                  paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.06)`,
                }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: 6,
                    background: `rgba(163,56,255,0.1)`, border: `1px solid rgba(163,56,255,0.2)`,
                    fontSize: 11, fontWeight: 600, color: pri[300], fontFamily: theme.fonts.mono,
                  }}>v1.0</span>
                  <span style={{ fontSize: 12, color: n[600] }}>·</span>
                  <span style={{ fontSize: 12, color: n[500], fontFamily: theme.fonts.body }}>
                    {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Letterhead */}
      <div style={{ marginBottom: 56 }}>
        <h3 style={subTitle}>Letterhead</h3>
        <div style={{ position: 'relative', maxWidth: 520 }}>
          <DownloadBtn targetRef={letterRef} filename="acstane-letterhead" />
          <div ref={letterRef} style={{
            width: '100%', aspectRatio: '0.707', borderRadius: 20,
            background: '#fafafa', position: 'relative', overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.2)',
          }}>
            {/* Purple accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: 4, height: '100%',
              background: `linear-gradient(180deg, ${pri[400]}, ${pri[300]}, ${acc.cyan})`,
            }} />

            <div style={{
              padding: '40px 44px 32px', display: 'flex', flexDirection: 'column', height: '100%',
            }}>
              {/* Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                marginBottom: 48, paddingBottom: 20,
                borderBottom: '1px solid #eee',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Logo size={24} dark />
                  <span style={{
                    fontSize: 15, fontWeight: 800, color: n[950],
                    fontFamily: theme.fonts.body, letterSpacing: '-0.02em',
                  }}>Acstane</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#666', fontFamily: theme.fonts.body, marginBottom: 2 }}>
                    hello@acstane.com
                  </div>
                  <div style={{ fontSize: 11, color: '#999', fontFamily: theme.fonts.mono }}>
                    acstane.com
                  </div>
                </div>
              </div>

              {/* Body placeholder */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
                <div style={{ width: '35%', height: 10, borderRadius: 5, background: '#e8e8e8' }} />
                <div style={{ height: 20 }} />
                {[1, 0.92, 0.85, 1, 0.78, 0.95, 0.88, 0.65, 1, 0.9, 0.72].map((w, i) => (
                  <div key={i} style={{
                    width: `${w * 100}%`, height: 6, borderRadius: 3,
                    background: i < 3 ? '#ddd' : '#e8e8e8',
                  }} />
                ))}
                <div style={{ height: 16 }} />
                {[0.6, 0.45].map((w, i) => (
                  <div key={`s${i}`} style={{
                    width: `${w * 100}%`, height: 6, borderRadius: 3, background: '#e8e8e8',
                  }} />
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 16, borderTop: '1px solid #eee', marginTop: 24,
              }}>
                <Logo size={14} dark />
                <div style={{
                  fontSize: 9, color: '#aaa', fontFamily: theme.fonts.mono,
                  letterSpacing: '0.04em',
                }}>
                  The backbone your product is missing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
