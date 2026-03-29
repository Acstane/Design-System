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
    } catch (e) { console.error(e); }
    setSaving(false);
  }, [targetRef, filename]);

  return (
    <button onClick={handleDownload} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 14px', fontSize: 11, fontWeight: 550,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
      color: '#fff', cursor: 'pointer', opacity: saving ? 0.5 : 1,
      transition: 'opacity 0.15s', fontFamily: 'var(--ac-font-body)',
    }}>
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

  const [cardName, setCardName] = useState('Marcin Kondrat');
  const [cardRole, setCardRole] = useState('Founder & CEO');
  const [cardEmail, setCardEmail] = useState('marcin.kondrat@acstane.com');
  const [cardPhone, setCardPhone] = useState('+48 123 456 789');
  const [cardWeb, setCardWeb] = useState('acstane.com');

  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const subTitle: React.CSSProperties = {
    fontSize: 16, fontWeight: 600, color: n[100],
    fontFamily: theme.fonts.display, marginBottom: 20,
  };

  const CW = 540;
  const CH = 310;

  return (
    <div>
      {/* Business Card */}
      <div style={{ marginBottom: 64 }}>
        <h3 style={subTitle}>Business Card</h3>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12, marginBottom: 28, maxWidth: 640,
        }}>
          <Input label="Name" value={cardName} onChange={e => setCardName((e.target as HTMLInputElement).value)} />
          <Input label="Title" value={cardRole} onChange={e => setCardRole((e.target as HTMLInputElement).value)} />
          <Input label="Email" value={cardEmail} onChange={e => setCardEmail((e.target as HTMLInputElement).value)} />
          <Input label="Phone" value={cardPhone} onChange={e => setCardPhone((e.target as HTMLInputElement).value)} />
          <Input label="Website" value={cardWeb} onChange={e => setCardWeb((e.target as HTMLInputElement).value)} mono />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
          gap: 40,
        }}>
          {/* FRONT */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Front</span>
              <DownloadBtn targetRef={cardFrontRef} filename="acstane-card-front" />
            </div>
            <div ref={cardFrontRef} style={{
              width: CW, height: CH, background: '#fff',
              borderRadius: 12, padding: '32px 36px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.12)',
            }}>
              {/* Purple accent — thin left bar */}
              <div style={{
                position: 'absolute', top: 24, left: 0, width: 3, height: 48,
                background: `linear-gradient(180deg, ${pri[400]}, ${pri[300]})`,
                borderRadius: '0 2px 2px 0',
              }} />

              {/* Top: name + role */}
              <div>
                <div style={{
                  fontSize: 22, fontWeight: 700, color: '#111',
                  fontFamily: theme.fonts.body, letterSpacing: '-0.02em', lineHeight: 1.2,
                }}>{cardName}</div>
                <div style={{
                  fontSize: 11, color: pri[500], fontFamily: theme.fonts.mono,
                  letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginTop: 4,
                }}>{cardRole}</div>
              </div>

              {/* Bottom: contact + logo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 11.5, color: '#444', fontFamily: theme.fonts.body }}>{cardEmail}</span>
                  <span style={{ fontSize: 11.5, color: '#444', fontFamily: theme.fonts.body }}>{cardPhone}</span>
                  <span style={{ fontSize: 11, color: '#999', fontFamily: theme.fonts.mono }}>{cardWeb}</span>
                </div>
                <Logo size={28} dark />
              </div>
            </div>
          </div>

          {/* BACK */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Back</span>
              <DownloadBtn targetRef={cardBackRef} filename="acstane-card-back" />
            </div>
            <div ref={cardBackRef} style={{
              width: CW, height: CH, background: n[950],
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15), 0 20px 60px rgba(0,0,0,0.3)',
            }}>
              {/* Subtle radial glow */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 300, height: 300, borderRadius: '50%',
                background: pri[400], opacity: 0.03, filter: 'blur(80px)',
              }} />
              {/* Bottom accent line */}
              <div style={{
                position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 2,
                background: `linear-gradient(90deg, transparent, ${pri[400]}, transparent)`,
                opacity: 0.4,
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
                <Logo size={36} />
                <div style={{
                  width: 1, height: 28, background: 'rgba(255,255,255,0.12)',
                }} />
                <div>
                  <div style={{
                    fontSize: 20, fontWeight: 800, color: '#fff',
                    fontFamily: theme.fonts.display, letterSpacing: '-0.03em',
                  }}>Acstane</div>
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
          width: 480, height: 640, background: n[950],
          borderRadius: 12, position: 'relative', overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15), 0 32px 80px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${pri[400]}, ${acc.cyan}, ${pri[300]})`,
          }} />
          <div style={{
            position: 'absolute', top: '25%', right: '-10%', width: 300, height: 300,
            borderRadius: '50%', background: pri[400], opacity: 0.04, filter: 'blur(100px)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.015,
            backgroundImage: `radial-gradient(${n[500]} 0.5px, transparent 0.5px)`,
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
                <span style={{ fontSize: 13, fontWeight: 700, color: n[300], fontFamily: theme.fonts.body }}>Acstane</span>
              </div>
              <span style={{ fontSize: 9, color: n[700], fontFamily: theme.fonts.mono, letterSpacing: '0.06em' }}>CONFIDENTIAL</span>
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
              }}>Design<br />System</div>
              <div style={{
                width: 40, height: 3, borderRadius: 2, marginBottom: 20,
                background: `linear-gradient(90deg, ${pri[400]}, ${acc.cyan})`,
              }} />
              <div style={{
                fontSize: 14, color: n[400], fontFamily: theme.fonts.body,
                lineHeight: 1.7, maxWidth: 300, marginBottom: 40,
              }}>
                Tokens, components, and patterns for building consistent UI across all products.
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
          width: 480, height: 680, background: '#fff',
          borderRadius: 12, position: 'relative', overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.15)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
            background: `linear-gradient(180deg, ${pri[400]}, ${pri[300]}, transparent 70%)`,
          }} />

          <div style={{
            padding: '36px 40px 24px', display: 'flex', flexDirection: 'column', height: '100%',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              marginBottom: 48, paddingBottom: 16, borderBottom: '1px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Logo size={20} dark />
                <span style={{
                  fontSize: 14, fontWeight: 800, color: '#111',
                  fontFamily: theme.fonts.body, letterSpacing: '-0.02em',
                }}>Acstane</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10.5, color: '#888', fontFamily: theme.fonts.body, marginBottom: 1 }}>{cardEmail}</div>
                <div style={{ fontSize: 10.5, color: '#aaa', fontFamily: theme.fonts.mono }}>{cardWeb}</div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ width: '28%', height: 7, borderRadius: 4, background: '#e0e0e0' }} />
              <div style={{ height: 14 }} />
              {[1, 0.94, 0.87, 1, 0.8, 0.93, 0.75, 0.98, 0.84, 0.67, 1, 0.91, 0.82].map((w, i) => (
                <div key={i} style={{
                  width: `${w * 100}%`, height: 4.5, borderRadius: 2.5, background: '#f0f0f0',
                }} />
              ))}
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 12, borderTop: '1px solid #f0f0f0', marginTop: 12,
            }}>
              <Logo size={11} dark />
              <span style={{ fontSize: 8.5, color: '#ccc', fontFamily: theme.fonts.mono, letterSpacing: '0.03em' }}>
                The backbone your product is missing.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Signatures */}
      <div style={{ marginBottom: 56 }}>
        <h3 style={subTitle}>Email Signature</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 32 }}>
          {/* Full */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Full</span>
              <button onClick={() => {
                const el = document.getElementById('sig-full');
                if (!el) return;
                const range = document.createRange();
                range.selectNodeContents(el);
                const sel = window.getSelection()!;
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand('copy');
                sel.removeAllRanges();
              }} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', fontSize: 11, fontWeight: 550,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                color: '#fff', cursor: 'pointer', fontFamily: 'var(--ac-font-body)',
              }}>
                <Icon name="copy" size={13} />
                Copy HTML
              </button>
            </div>
            <div style={{
              background: '#fff', borderRadius: 12, padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1)',
            }}>
              <div id="sig-full">
                <style dangerouslySetInnerHTML={{ __html: `
                  @media (prefers-color-scheme: dark) {
                    .ac-sig-light { display: none !important; }
                    .ac-sig-dark { display: inline !important; }
                    .ac-sig-name { color: #f0f0f0 !important; }
                    .ac-sig-contact { color: #bbb !important; }
                    .ac-sig-web { color: #888 !important; }
                    .ac-sig-divider { border-color: #333 !important; }
                    .ac-sig-tagline { color: #666 !important; border-color: #333 !important; }
                  }
                ` }} />
                <table cellPadding={0} cellSpacing={0} style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 13, color: '#333' }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: 20, borderRight: '2px solid #a338ff', verticalAlign: 'top' }} className="ac-sig-divider">
                        <span className="ac-sig-light">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 575" width="44" height="44">
                            <defs><linearGradient id="sg1" x1="100.3" y1="222.78" x2="269.55" y2="125.05" gradientTransform="translate(0 576) scale(1 -1)" gradientUnits="userSpaceOnUse"><stop offset=".2" stopColor="#a338ff"/><stop offset=".28" stopColor="#a93eff"/><stop offset=".75" stopColor="#ca64ff"/><stop offset="1" stopColor="#d773ff"/></linearGradient></defs>
                            <path d="M481.52,466.95c-64.72,26.94-139.02-3.69-165.96-68.4L194.16,106.91c64.72-26.94,139.02,3.69,165.96,68.4l121.4,291.64z" fill="#1a0730"/>
                            <path d="M237.51,412.66c-6.73-16.16-12.23-32.75-17.54-49.39-10.52-34.13-46.72-53.27-80.85-42.75s-53.27,46.72-42.75,80.85c.83,2.71,1.85,5.36,3.03,7.93,2.47,5.6,5.72,10.82,9.65,15.52,34.64,47.29,97.16,64.7,151.26,42.13l-22.8-54.3z" fill="url(#sg1)"/>
                          </svg>
                        </span>
                        <span className="ac-sig-dark" style={{ display: 'none' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 575" width="44" height="44">
                            <defs><linearGradient id="sg2" x1="100.3" y1="222.78" x2="269.55" y2="125.05" gradientTransform="translate(0 576) scale(1 -1)" gradientUnits="userSpaceOnUse"><stop offset=".2" stopColor="#a338ff"/><stop offset=".28" stopColor="#a93eff"/><stop offset=".75" stopColor="#ca64ff"/><stop offset="1" stopColor="#d773ff"/></linearGradient></defs>
                            <path d="M481.52,466.95c-64.72,26.94-139.02-3.69-165.96-68.4L194.16,106.91c64.72-26.94,139.02,3.69,165.96,68.4l121.4,291.64z" fill="#ffffff"/>
                            <path d="M237.51,412.66c-6.73-16.16-12.23-32.75-17.54-49.39-10.52-34.13-46.72-53.27-80.85-42.75s-53.27,46.72-42.75,80.85c.83,2.71,1.85,5.36,3.03,7.93,2.47,5.6,5.72,10.82,9.65,15.52,34.64,47.29,97.16,64.7,151.26,42.13l-22.8-54.3z" fill="url(#sg2)"/>
                          </svg>
                        </span>
                      </td>
                      <td style={{ paddingLeft: 16 }}>
                        <div className="ac-sig-name" style={{ fontSize: 15, fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{cardName}</div>
                        <div style={{ fontSize: 11, color: '#a338ff', letterSpacing: '0.04em', textTransform: 'uppercase' as const, marginTop: 1, marginBottom: 8 }}>{cardRole}</div>
                        <div className="ac-sig-contact" style={{ fontSize: 12, color: '#666', lineHeight: 1.8 }}>
                          {cardEmail}<br />
                          {cardPhone}<br />
                          <span className="ac-sig-web" style={{ color: '#999' }}>{cardWeb}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ paddingTop: 12 }}>
                        <div className="ac-sig-tagline" style={{ borderTop: '1px solid #eee', paddingTop: 8, fontSize: 10, color: '#bbb', letterSpacing: '0.02em' }}>
                          Acstane · The backbone your product is missing.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Reply (short) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Reply</span>
              <button onClick={() => {
                const el = document.getElementById('sig-reply');
                if (!el) return;
                const range = document.createRange();
                range.selectNodeContents(el);
                const sel = window.getSelection()!;
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand('copy');
                sel.removeAllRanges();
              }} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', fontSize: 11, fontWeight: 550,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                color: '#fff', cursor: 'pointer', fontFamily: 'var(--ac-font-body)',
              }}>
                <Icon name="copy" size={13} />
                Copy HTML
              </button>
            </div>
            <div style={{
              background: '#fff', borderRadius: 12, padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1)',
            }}>
              <div id="sig-reply">
                <style dangerouslySetInnerHTML={{ __html: `
                  @media (prefers-color-scheme: dark) {
                    .ac-reply-name { color: #f0f0f0 !important; }
                    .ac-reply-text { color: #bbb !important; }
                    .ac-reply-sep { color: #555 !important; }
                    .ac-reply-web { color: #777 !important; }
                  }
                ` }} />
                <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 12, color: '#555', lineHeight: 1.6 }}>
                  <span className="ac-reply-name" style={{ fontWeight: 600, color: '#111' }}>{cardName}</span>
                  <span className="ac-reply-sep" style={{ color: '#ccc' }}> · </span>
                  <span style={{ color: '#a338ff', fontSize: 11 }}>{cardRole}</span>
                  <span className="ac-reply-sep" style={{ color: '#ccc' }}> · </span>
                  <span className="ac-reply-text">{cardPhone}</span>
                  <span className="ac-reply-sep" style={{ color: '#ccc' }}> · </span>
                  <span className="ac-reply-web" style={{ color: '#999' }}>{cardWeb}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
