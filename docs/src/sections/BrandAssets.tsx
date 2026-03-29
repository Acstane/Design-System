import React, { useRef, useState, useCallback } from 'react';
import { useTheme, Logo, Icon, Input, Button } from '../../../src';
import { toPng } from 'html-to-image';
import { exportLetterhead, exportDocumentCover } from '../exportDocx';

function DownloadBtn({ targetRef, filename }: { targetRef: React.RefObject<HTMLDivElement | null>; filename: string }) {
  const [saving, setSaving] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!targetRef.current) return;
    setSaving(true);
    try {
      const url = await toPng(targetRef.current, { pixelRatio: 4, cacheBust: true });
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
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', fontSize: 11, fontWeight: 550,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
        color: '#fff', cursor: 'pointer', opacity: saving ? 0.5 : 1,
        transition: 'opacity 0.15s', fontFamily: 'var(--ac-font-body)',
      }}
    >
      <Icon name="download" size={13} />
      {saving ? 'Saving…' : 'Download PNG'}
    </button>
  );
}

export function BrandAssetsSection() {
  const theme = useTheme();
  const pri = theme.colors.primary;
  const n = theme.colors.neutral;
  const acc = theme.colors.accent;

  const [cardName, setCardName] = useState('Marcin Kondrat');
  const [cardRole, setCardRole] = useState('Founder & CEO');
  const [cardEmail, setCardEmail] = useState('marcin.kondrat@acstane.com');
  const [cardWeb, setCardWeb] = useState('acstane.com');

  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const subTitle: React.CSSProperties = {
    fontSize: 16, fontWeight: 600, color: n[100],
    fontFamily: theme.fonts.display, marginBottom: 20,
  };

  return (
    <div>
      {/* Business Card */}
      <div style={{ marginBottom: 64 }}>
        <h3 style={subTitle}>Business Card</h3>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 12, marginBottom: 24, maxWidth: 520,
        }}>
          <Input label="Name" value={cardName} onChange={e => setCardName((e.target as HTMLInputElement).value)} placeholder="Full name" />
          <Input label="Role" value={cardRole} onChange={e => setCardRole((e.target as HTMLInputElement).value)} placeholder="Title" />
          <Input label="Email" value={cardEmail} onChange={e => setCardEmail((e.target as HTMLInputElement).value)} placeholder="Email" />
          <Input label="Website" value={cardWeb} onChange={e => setCardWeb((e.target as HTMLInputElement).value)} placeholder="domain.com" mono />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: 32,
        }}>
          {/* Front */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <DownloadBtn targetRef={cardFrontRef} filename="acstane-card-front" />
            </div>
            <div ref={cardFrontRef} style={{
              width: 540, height: 320, borderRadius: 16,
              background: n[950], padding: '36px 36px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}>
              <div style={{
                position: 'absolute', top: -100, right: -80, width: 360, height: 360,
                borderRadius: '50%', background: pri[400], opacity: 0.06, filter: 'blur(100px)',
              }} />
              <div style={{
                position: 'absolute', bottom: -80, left: -60, width: 280, height: 280,
                borderRadius: '50%', background: acc.cyan, opacity: 0.04, filter: 'blur(90px)',
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 36, right: 36, height: 1,
                background: `linear-gradient(90deg, transparent, rgba(163,56,255,0.2), transparent)`,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
                <Logo size={26} />
                <span style={{
                  fontSize: 16, fontWeight: 800, letterSpacing: '-0.03em',
                  color: '#fff', fontFamily: theme.fonts.display,
                }}>Acstane</span>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{
                  fontSize: 22, fontWeight: 700, color: '#fff',
                  fontFamily: theme.fonts.body, letterSpacing: '-0.02em', marginBottom: 3,
                }}>{cardName}</div>
                <div style={{
                  fontSize: 11, color: pri[300], fontFamily: theme.fonts.mono,
                  letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 24,
                }}>{cardRole}</div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: n[300], fontFamily: theme.fonts.body }}>{cardEmail}</span>
                  <span style={{ fontSize: 12, color: n[600] }}>·</span>
                  <span style={{ fontSize: 12, color: n[500], fontFamily: theme.fonts.mono }}>{cardWeb}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <DownloadBtn targetRef={cardBackRef} filename="acstane-card-back" />
            </div>
            <div ref={cardBackRef} style={{
              width: 540, height: 320, borderRadius: 16,
              background: n[950], display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}>
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.02,
                backgroundImage: `radial-gradient(${n[400]} 1px, transparent 1px)`,
                backgroundSize: '16px 16px',
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, height: 400, borderRadius: '50%',
                background: pri[400], opacity: 0.05, filter: 'blur(120px)',
              }} />

              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 14, position: 'relative',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: `linear-gradient(135deg, ${pri[500]}, ${pri[300]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 48px rgba(163,56,255,0.25), 0 8px 24px rgba(0,0,0,0.4)`,
                }}>
                  <Logo size={40} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em',
                    color: '#fff', fontFamily: theme.fonts.display, marginBottom: 6,
                  }}>Acstane</div>
                  <div style={{
                    fontSize: 10, color: n[500], fontFamily: theme.fonts.mono,
                    letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                  }}>The backbone your product is missing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Cover */}
      <div style={{ marginBottom: 64 }}>
        <h3 style={subTitle}>Document Cover</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 10, maxWidth: 480 }}>
          <DownloadBtn targetRef={folderRef} filename="acstane-document-cover" />
          <Button variant="outline" size="sm" icon="download" onClick={() => exportDocumentCover({
            title: 'Design', subtitle: 'System',
            description: 'Tokens, components, and patterns for building consistent UI across all products.',
            version: 'v1.0',
          })}>DOCX</Button>
        </div>
        <div ref={folderRef} style={{
          width: 480, height: 640, borderRadius: 16,
          background: n[950], position: 'relative', overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${pri[400]}, ${acc.cyan}, ${pri[300]})`,
          }} />
          <div style={{
            position: 'absolute', top: '20%', right: '-15%', width: 400, height: 400,
            borderRadius: '50%', background: pri[400], opacity: 0.05, filter: 'blur(120px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '-10%', width: 300, height: 300,
            borderRadius: '50%', background: acc.cyan, opacity: 0.03, filter: 'blur(100px)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.015,
            backgroundImage: `radial-gradient(${n[400]} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />

          <div style={{
            position: 'relative', padding: '44px 40px',
            display: 'flex', flexDirection: 'column', height: '100%',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              marginBottom: 'auto',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Logo size={20} />
                <span style={{
                  fontSize: 13, fontWeight: 700, color: n[300], fontFamily: theme.fonts.body,
                }}>Acstane</span>
              </div>
              <span style={{
                fontSize: 9, color: n[700], fontFamily: theme.fonts.mono,
                letterSpacing: '0.06em',
              }}>CONFIDENTIAL</span>
            </div>

            <div>
              <div style={{
                fontSize: 10, fontWeight: 600, color: pri[300],
                fontFamily: theme.fonts.mono, letterSpacing: '0.1em',
                textTransform: 'uppercase' as const, marginBottom: 20,
              }}>Technical Documentation</div>
              <div style={{
                fontSize: 48, fontWeight: 800, color: '#fff',
                fontFamily: theme.fonts.display, letterSpacing: '-0.04em',
                lineHeight: 1.05, marginBottom: 16,
              }}>
                Design<br />System
              </div>
              <div style={{
                width: 40, height: 3, borderRadius: 2, marginBottom: 20,
                background: `linear-gradient(90deg, ${pri[400]}, ${acc.cyan})`,
              }} />
              <div style={{
                fontSize: 14, color: n[400], fontFamily: theme.fonts.body,
                lineHeight: 1.7, maxWidth: 300, marginBottom: 40,
              }}>
                Tokens, components, and patterns for
                building consistent UI across all products.
              </div>
              <div style={{
                display: 'flex', gap: 12, alignItems: 'center',
                paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: 'rgba(163,56,255,0.1)', border: '1px solid rgba(163,56,255,0.2)',
                  fontSize: 11, fontWeight: 600, color: pri[300], fontFamily: theme.fonts.mono,
                }}>v1.0</span>
                <span style={{ fontSize: 12, color: n[600] }}>·</span>
                <span style={{ fontSize: 12, color: n[500] }}>{new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Letterhead */}
      <div style={{ marginBottom: 56 }}>
        <h3 style={subTitle}>Letterhead</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 10, maxWidth: 480 }}>
          <DownloadBtn targetRef={letterRef} filename="acstane-letterhead" />
          <Button variant="outline" size="sm" icon="download" onClick={() => exportLetterhead({
            name: cardName, email: cardEmail, website: cardWeb,
          })}>DOCX</Button>
        </div>
        <div ref={letterRef} style={{
          width: 480, height: 680, borderRadius: 16,
          background: '#fafafa', position: 'relative', overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
            background: `linear-gradient(180deg, ${pri[400]}, ${pri[300]}, ${acc.cyan})`,
          }} />

          <div style={{
            padding: '40px 44px 28px', display: 'flex', flexDirection: 'column', height: '100%',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              marginBottom: 48, paddingBottom: 20, borderBottom: '1px solid #eee',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Logo size={22} dark />
                <span style={{
                  fontSize: 14, fontWeight: 800, color: '#111',
                  fontFamily: theme.fonts.body, letterSpacing: '-0.02em',
                }}>Acstane</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#777', fontFamily: theme.fonts.body, marginBottom: 2 }}>
                  {cardEmail}
                </div>
                <div style={{ fontSize: 11, color: '#aaa', fontFamily: theme.fonts.mono }}>
                  {cardWeb}
                </div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
              <div style={{ width: '30%', height: 8, borderRadius: 4, background: '#ddd' }} />
              <div style={{ height: 16 }} />
              {[1, 0.95, 0.88, 1, 0.82, 0.93, 0.76, 0.98, 0.85, 0.68, 1, 0.92].map((w, i) => (
                <div key={i} style={{
                  width: `${w * 100}%`, height: 5, borderRadius: 3,
                  background: '#e8e8e8',
                }} />
              ))}
              <div style={{ height: 12 }} />
              {[0.55, 0.4].map((w, i) => (
                <div key={`s${i}`} style={{
                  width: `${w * 100}%`, height: 5, borderRadius: 3, background: '#e8e8e8',
                }} />
              ))}
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 14, borderTop: '1px solid #eee', marginTop: 16,
            }}>
              <Logo size={12} dark />
              <div style={{
                fontSize: 9, color: '#bbb', fontFamily: theme.fonts.mono, letterSpacing: '0.03em',
              }}>
                The backbone your product is missing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
