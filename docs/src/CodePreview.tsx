import { useState, useCallback, type ReactNode } from 'react';
import { Icon } from '../../src';
import styles from './CodePreview.module.css';

interface CodePreviewProps {
  children: ReactNode;
  code: string;
  title?: string;
}

type Mode = 'preview' | 'code';

/* ─── Basic syntax highlighting ──────────────────────────── */

function highlightCode(source: string): string {
  // Escape HTML entities first
  let html = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments: // single-line and /* multi-line */
  html = html.replace(
    /(\/\/.*$)/gm,
    '<span style="color:var(--ac-n-600)">$1</span>',
  );
  html = html.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span style="color:var(--ac-n-600)">$1</span>',
  );

  // Strings (single and double quoted)
  html = html.replace(
    /(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;|"[^"]*?"|'[^']*?'|`[^`]*?`)/g,
    '<span style="color:var(--ac-accent-mint)">$1</span>',
  );

  // Keywords
  html = html.replace(
    /\b(import|from|const|let|var|return|export|function|type|interface|default|async|await)\b/g,
    '<span style="color:var(--ac-accent-pink)">$1</span>',
  );

  // JSX tags: <TagName or </TagName or />
  html = html.replace(
    /(&lt;\/?[A-Z][A-Za-z0-9.]*)/g,
    '<span style="color:var(--ac-pri-300)">$1</span>',
  );

  // Props/attributes: word=
  html = html.replace(
    /\b([a-zA-Z_][\w-]*)(?==)/g,
    '<span style="color:var(--ac-accent-cyan)">$1</span>',
  );

  return html;
}

/* ─── Component ──────────────────────────────────────────── */

export function CodePreview({ children, code, title }: CodePreviewProps) {
  const [mode, setMode] = useState<Mode>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>{title ?? ''}</span>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'preview' ? styles.tabActive : ''}`}
            onClick={() => setMode('preview')}
          >
            Preview
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'code' ? styles.tabActive : ''}`}
            onClick={() => setMode('code')}
          >
            Code
          </button>
        </div>
      </div>

      {/* Preview */}
      {mode === 'preview' && (
        <div className={styles.preview}>{children}</div>
      )}

      {/* Code */}
      {mode === 'code' && (
        <div className={styles.codeArea}>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopy}
            aria-label="Copy code"
          >
            <Icon name={copied ? 'check' : 'copy'} size={14} />
          </button>
          <pre dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
        </div>
      )}
    </div>
  );
}
