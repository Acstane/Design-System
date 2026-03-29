import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useTheme, Logo, Icon, Input } from '../../../src';
import { toPng } from 'html-to-image';

const LOGO_SVG_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 575" width="176" height="176"><defs><linearGradient id="ld" x1="100.3" y1="222.78" x2="269.55" y2="125.05" gradientTransform="translate(0 576) scale(1 -1)" gradientUnits="userSpaceOnUse"><stop offset=".2" stop-color="#a338ff"/><stop offset=".28" stop-color="#a93eff"/><stop offset=".75" stop-color="#ca64ff"/><stop offset="1" stop-color="#d773ff"/></linearGradient></defs><path d="M481.52,466.95c-64.72,26.94-139.02-3.69-165.96-68.4L194.16,106.91c64.72-26.94,139.02,3.69,165.96,68.4l121.4,291.64z" fill="#1a0730"/><path d="M237.51,412.66c-6.73-16.16-12.23-32.75-17.54-49.39-10.52-34.13-46.72-53.27-80.85-42.75s-53.27,46.72-42.75,80.85c.83,2.71,1.85,5.36,3.03,7.93,2.47,5.6,5.72,10.82,9.65,15.52,34.64,47.29,97.16,64.7,151.26,42.13l-22.8-54.3z" fill="url(#ld)"/></svg>`;

function svgToBase64(svg: string, size: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = size; c.height = size;
      c.getContext('2d')!.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/png'));
    };
    img.src = url;
  });
}

function useLogoPng() {
  const [src, setSrc] = useState('');
  useEffect(() => { svgToBase64(LOGO_SVG_DARK, 176).then(setSrc); }, []);
  return src;
}

function DownloadBtn({ targetRef, filename }: { targetRef: React.RefObject<HTMLDivElement | null>; filename: string }) {
  const [saving, setSaving] = useState(false);
  const handleDownload = useCallback(async () => {
    if (!targetRef.current) return;
    setSaving(true);
    try {
      const url = await toPng(targetRef.current, { pixelRatio: 4, cacheBust: true });
      const a = document.createElement('a');
      a.href = url; a.download = `${filename}.png`; a.click();
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
      fontFamily: 'var(--ac-font-body)',
    }}>
      <Icon name="download" size={13} />
      {saving ? 'Saving…' : 'PNG'}
    </button>
  );
}

function CopyHtmlBtn({ targetId }: { targetId: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => {
      const el = document.getElementById(targetId);
      if (!el) return;
      navigator.clipboard.writeText(el.innerHTML).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 14px', fontSize: 11, fontWeight: 550,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
      color: '#fff', cursor: 'pointer', fontFamily: 'var(--ac-font-body)',
    }}>
      <Icon name={copied ? 'check' : 'copy'} size={13} />
      {copied ? 'Copied!' : 'Copy HTML'}
    </button>
  );
}

export function BrandAssetsSection() {
  const theme = useTheme();
  const pri = theme.colors.primary;
  const n = theme.colors.neutral;
  const logoPng = useLogoPng();

  const [cardName, setCardName] = useState('Marcin Kondrat');
  const [cardRole, setCardRole] = useState('Founder & CEO');
  const [cardEmail, setCardEmail] = useState('marcin.kondrat@acstane.com');
  const [cardPhone, setCardPhone] = useState('+48 123 456 789');
  const [cardWeb, setCardWeb] = useState('acstane.com');

  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);

  const subTitle: React.CSSProperties = {
    fontSize: 16, fontWeight: 600, color: n[100],
    fontFamily: theme.fonts.display, marginBottom: 20,
  };

  const W = 546;
  const H = 324;

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 40 }}>
          {/* FRONT */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Front</span>
              <DownloadBtn targetRef={cardFrontRef} filename="acstane-card-front" />
            </div>
            <div ref={cardFrontRef} style={{
              width: W, height: H, background: '#ffffff',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                padding: '40px 40px 36px',
                display: 'flex', flexDirection: 'column', height: '100%',
              }}>
                <div style={{ marginBottom: 'auto' }}>
                  <div style={{
                    fontSize: 24, fontWeight: 700, color: '#0a0a0a',
                    fontFamily: theme.fonts.body, letterSpacing: '-0.025em', lineHeight: 1.15,
                  }}>{cardName}</div>
                  <div style={{
                    fontSize: 12, color: '#888', fontFamily: theme.fonts.body,
                    fontWeight: 500, marginTop: 6,
                  }}>{cardRole}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: 11.5, color: '#666', fontFamily: theme.fonts.body, lineHeight: 1.9 }}>
                    {cardEmail}<br />
                    {cardPhone}<br />
                    <span style={{ color: '#aaa', fontFamily: theme.fonts.mono, fontSize: 11 }}>{cardWeb}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Logo size={22} dark />
                    <span style={{
                      fontSize: 14, fontWeight: 700, color: '#0a0a0a',
                      fontFamily: theme.fonts.body, letterSpacing: '-0.02em',
                    }}>Acstane</span>
                  </div>
                </div>
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
              width: W, height: H, background: '#0a0a0e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ color: '#fff', position: 'relative' }}>
                <Logo size={56} />
              </div>
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
              <CopyHtmlBtn targetId="sig-full" />
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1)' }}>
              <div id="sig-full">
                <table cellPadding={0} cellSpacing={0} style={{ fontFamily: 'Inter, -apple-system, Helvetica, Arial, sans-serif', fontSize: 13, color: '#333', borderCollapse: 'collapse' as const }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: 16, borderRight: '2px solid #a338ff', verticalAlign: 'top' }}>
                        {logoPng && <img src={logoPng} width={44} height={44} alt="Acstane" style={{ display: 'block', border: 0 }} />}
                      </td>
                      <td style={{ paddingLeft: 14, verticalAlign: 'top' }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{cardName}</div>
                        <div style={{ fontSize: 11, color: '#a338ff', letterSpacing: '0.04em', textTransform: 'uppercase' as const, marginTop: 2, marginBottom: 8 }}>{cardRole}</div>
                        <div style={{ fontSize: 12, color: '#555', lineHeight: 1.8 }}>
                          {cardEmail}<br />
                          {cardPhone}<br />
                          <span style={{ color: '#999' }}>{cardWeb}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ paddingTop: 12 }}>
                        <div style={{ borderTop: '1px solid #eee', paddingTop: 8, fontSize: 10, color: '#bbb', letterSpacing: '0.02em' }}>
                          Acstane · The backbone your product is missing.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Reply */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Reply</span>
              <CopyHtmlBtn targetId="sig-reply" />
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1)' }}>
              <div id="sig-reply" style={{ fontFamily: 'Inter, -apple-system, Helvetica, Arial, sans-serif', fontSize: 12, color: '#555', lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600, color: '#111' }}>{cardName}</span>
                <span style={{ color: '#ccc' }}> · </span>
                <span style={{ color: '#a338ff', fontSize: 11 }}>{cardRole}</span>
                <span style={{ color: '#ccc' }}> · </span>
                <span>{cardPhone}</span>
                <span style={{ color: '#ccc' }}> · </span>
                <span style={{ color: '#999' }}>{cardWeb}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
