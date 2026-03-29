import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useTheme, Logo, Icon, Input } from '../../../src';
import { toPng } from 'html-to-image';

const LOGO_SVG_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 575" width="176" height="176"><defs><linearGradient id="ld" x1="100.3" y1="222.78" x2="269.55" y2="125.05" gradientTransform="translate(0 576) scale(1 -1)" gradientUnits="userSpaceOnUse"><stop offset=".2" stop-color="#a338ff"/><stop offset=".28" stop-color="#a93eff"/><stop offset=".75" stop-color="#ca64ff"/><stop offset="1" stop-color="#d773ff"/></linearGradient></defs><path d="M481.52,466.95c-64.72,26.94-139.02-3.69-165.96-68.4L194.16,106.91c64.72-26.94,139.02,3.69,165.96,68.4l121.4,291.64z" fill="#1a0730"/><path d="M237.51,412.66c-6.73-16.16-12.23-32.75-17.54-49.39-10.52-34.13-46.72-53.27-80.85-42.75s-53.27,46.72-42.75,80.85c.83,2.71,1.85,5.36,3.03,7.93,2.47,5.6,5.72,10.82,9.65,15.52,34.64,47.29,97.16,64.7,151.26,42.13l-22.8-54.3z" fill="url(#ld)"/></svg>`;

const LOGO_SVG_LIGHT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 575" width="176" height="176"><defs><linearGradient id="ll" x1="100.3" y1="222.78" x2="269.55" y2="125.05" gradientTransform="translate(0 576) scale(1 -1)" gradientUnits="userSpaceOnUse"><stop offset=".2" stop-color="#a338ff"/><stop offset=".28" stop-color="#a93eff"/><stop offset=".75" stop-color="#ca64ff"/><stop offset="1" stop-color="#d773ff"/></linearGradient></defs><path d="M481.52,466.95c-64.72,26.94-139.02-3.69-165.96-68.4L194.16,106.91c64.72-26.94,139.02,3.69,165.96,68.4l121.4,291.64z" fill="#ffffff"/><path d="M237.51,412.66c-6.73-16.16-12.23-32.75-17.54-49.39-10.52-34.13-46.72-53.27-80.85-42.75s-53.27,46.72-42.75,80.85c.83,2.71,1.85,5.36,3.03,7.93,2.47,5.6,5.72,10.82,9.65,15.52,34.64,47.29,97.16,64.7,151.26,42.13l-22.8-54.3z" fill="url(#ll)"/></svg>`;

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

function useLogoPngs() {
  const [dark, setDark] = useState('');
  const [light, setLight] = useState('');
  useEffect(() => {
    svgToBase64(LOGO_SVG_DARK, 176).then(setDark);
    svgToBase64(LOGO_SVG_LIGHT, 176).then(setLight);
  }, []);
  return { dark, light };
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
      const html = el.innerHTML;
      navigator.clipboard.writeText(html).then(() => {
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
  const acc = theme.colors.accent;
  const logos = useLogoPngs();

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
          {/* Front */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Front</span>
              <DownloadBtn targetRef={cardFrontRef} filename="acstane-card-front" />
            </div>
            <div ref={cardFrontRef} style={{
              width: CW, height: CH, background: '#fff', borderRadius: 12,
              padding: '32px 36px', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.12)',
            }}>
              <div style={{
                position: 'absolute', top: 24, left: 0, width: 3, height: 48,
                background: `linear-gradient(180deg, ${pri[400]}, ${pri[300]})`,
                borderRadius: '0 2px 2px 0',
              }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111', fontFamily: theme.fonts.body, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{cardName}</div>
                <div style={{ fontSize: 11, color: pri[500], fontFamily: theme.fonts.mono, letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginTop: 4 }}>{cardRole}</div>
              </div>
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

          {/* Back */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Back</span>
              <DownloadBtn targetRef={cardBackRef} filename="acstane-card-back" />
            </div>
            <div ref={cardBackRef} style={{
              width: CW, height: CH, background: n[950], borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15), 0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 300, height: 300, borderRadius: '50%',
                background: pri[400], opacity: 0.03, filter: 'blur(80px)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 2,
                background: `linear-gradient(90deg, transparent, ${pri[400]}, transparent)`, opacity: 0.4,
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
                <Logo size={36} />
                <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)' }} />
                <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: theme.fonts.display, letterSpacing: '-0.03em' }}>Acstane</span>
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
            <div style={{
              background: '#fff', borderRadius: 12, padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1)',
            }}>
              <div id="sig-full" dangerouslySetInnerHTML={{ __html: logos.dark ? `
<style>
@media (prefers-color-scheme: dark) {
  .ac-sig-light { display: none !important; }
  .ac-sig-dark { display: inline !important; }
  .ac-sig-name { color: #f0f0f0 !important; }
  .ac-sig-contact { color: #bbb !important; }
  .ac-sig-web { color: #888 !important; }
  .ac-sig-tagline { color: #555 !important; border-color: #333 !important; }
  .ac-sig-border { border-color: #a338ff !important; }
}
</style>
<table cellpadding="0" cellspacing="0" style="font-family:Inter,-apple-system,sans-serif;font-size:13px;color:#333">
<tr>
  <td style="padding-right:20px;border-right:2px solid #a338ff;vertical-align:top" class="ac-sig-border">
    <img class="ac-sig-light" src="${logos.dark}" width="44" height="44" alt="Acstane" style="display:inline;border:0" />
    <img class="ac-sig-dark" src="${logos.light}" width="44" height="44" alt="Acstane" style="display:none;border:0" />
  </td>
  <td style="padding-left:16px">
    <div class="ac-sig-name" style="font-size:15px;font-weight:700;color:#111;line-height:1.3">${cardName}</div>
    <div style="font-size:11px;color:#a338ff;letter-spacing:0.04em;text-transform:uppercase;margin-top:1px;margin-bottom:8px">${cardRole}</div>
    <div class="ac-sig-contact" style="font-size:12px;color:#666;line-height:1.8">
      ${cardEmail}<br/>
      ${cardPhone}<br/>
      <span class="ac-sig-web" style="color:#999">${cardWeb}</span>
    </div>
  </td>
</tr>
<tr>
  <td colspan="2" style="padding-top:12px">
    <div class="ac-sig-tagline" style="border-top:1px solid #eee;padding-top:8px;font-size:10px;color:#bbb;letter-spacing:0.02em">
      Acstane &middot; The backbone your product is missing.
    </div>
  </td>
</tr>
</table>` : '' }} />
            </div>
          </div>

          {/* Reply */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: n[500], fontFamily: theme.fonts.mono, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Reply</span>
              <CopyHtmlBtn targetId="sig-reply" />
            </div>
            <div style={{
              background: '#fff', borderRadius: 12, padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1)',
            }}>
              <div id="sig-reply" dangerouslySetInnerHTML={{ __html: `
<style>
@media (prefers-color-scheme: dark) {
  .ac-rpl-name { color: #f0f0f0 !important; }
  .ac-rpl-text { color: #bbb !important; }
  .ac-rpl-sep { color: #555 !important; }
  .ac-rpl-web { color: #777 !important; }
}
</style>
<div style="font-family:Inter,-apple-system,sans-serif;font-size:12px;color:#555;line-height:1.6">
  <span class="ac-rpl-name" style="font-weight:600;color:#111">${cardName}</span>
  <span class="ac-rpl-sep" style="color:#ccc"> &middot; </span>
  <span style="color:#a338ff;font-size:11px">${cardRole}</span>
  <span class="ac-rpl-sep" style="color:#ccc"> &middot; </span>
  <span class="ac-rpl-text">${cardPhone}</span>
  <span class="ac-rpl-sep" style="color:#ccc"> &middot; </span>
  <span class="ac-rpl-web" style="color:#999">${cardWeb}</span>
</div>` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
