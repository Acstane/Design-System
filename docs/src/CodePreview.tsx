import { useState, useCallback, type ReactNode } from 'react';
import { Icon } from '../../src';
import styles from './CodePreview.module.css';

interface CodePreviewProps {
  children: ReactNode;
  code: string;
  title?: string;
}

type Mode = 'preview' | 'code';

interface Token { text: string; type: 'plain' | 'keyword' | 'string' | 'comment' | 'tag' | 'prop' | 'punct' }

const KEYWORDS = new Set([
  'import', 'from', 'const', 'let', 'var', 'return', 'export',
  'function', 'type', 'interface', 'default', 'async', 'await',
  'null', 'true', 'false', 'new', 'typeof', 'number', 'string',
]);

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < source.length) {
    // Single-line comment
    if (source[i] === '/' && source[i + 1] === '/') {
      const end = source.indexOf('\n', i);
      const stop = end === -1 ? source.length : end;
      tokens.push({ text: source.slice(i, stop), type: 'comment' });
      i = stop;
      continue;
    }

    // Multi-line comment
    if (source[i] === '/' && source[i + 1] === '*') {
      const end = source.indexOf('*/', i + 2);
      const stop = end === -1 ? source.length : end + 2;
      tokens.push({ text: source.slice(i, stop), type: 'comment' });
      i = stop;
      continue;
    }

    // Strings
    if (source[i] === "'" || source[i] === '"' || source[i] === '`') {
      const quote = source[i];
      let j = i + 1;
      while (j < source.length && source[j] !== quote) {
        if (source[j] === '\\') j++;
        j++;
      }
      tokens.push({ text: source.slice(i, j + 1), type: 'string' });
      i = j + 1;
      continue;
    }

    // JSX tags: <Component or </Component or <div etc
    if (source[i] === '<' && /[A-Za-z/]/.test(source[i + 1] || '')) {
      let j = i;
      if (source[j + 1] === '/') j++;
      j++;
      while (j < source.length && /[A-Za-z0-9.]/.test(source[j])) j++;
      tokens.push({ text: source.slice(i, j), type: 'tag' });
      i = j;
      continue;
    }

    // Words (identifiers, keywords)
    if (/[A-Za-z_$]/.test(source[i])) {
      let j = i;
      while (j < source.length && /[A-Za-z0-9_$]/.test(source[j])) j++;
      const word = source.slice(i, j);

      // Check if followed by = (prop)
      if (source[j] === '=') {
        tokens.push({ text: word, type: 'prop' });
      } else if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else {
        tokens.push({ text: word, type: 'plain' });
      }
      i = j;
      continue;
    }

    // Punctuation and operators
    if (/[{}()<>[\]=;:,./?|&!+\-*%^~@#]/.test(source[i])) {
      tokens.push({ text: source[i], type: 'punct' });
      i++;
      continue;
    }

    // Whitespace and other
    let j = i;
    while (j < source.length && !/[A-Za-z_$'"` /<{([\])}>=;:,.!+\-*%^~@#|&?\\]/.test(source[j]) && source[j] !== '\n') j++;
    if (j === i) j = i + 1;
    tokens.push({ text: source.slice(i, j), type: 'plain' });
    i = j;
  }

  return tokens;
}

const TOKEN_COLORS: Record<Token['type'], string> = {
  plain: 'inherit',
  keyword: 'var(--ac-accent-pink)',
  string: 'var(--ac-accent-mint)',
  comment: 'var(--ac-n-600)',
  tag: 'var(--ac-pri-300)',
  prop: 'var(--ac-accent-cyan)',
  punct: 'var(--ac-n-500)',
};

function HighlightedCode({ source }: { source: string }) {
  const tokens = tokenize(source);
  return (
    <pre style={{
      fontFamily: 'var(--ac-font-mono)', fontSize: 12.5, lineHeight: 1.7,
      color: 'var(--ac-n-200)', whiteSpace: 'pre', margin: 0,
    }}>
      {tokens.map((t, i) => (
        t.type === 'plain' ? t.text :
        <span key={i} style={{ color: TOKEN_COLORS[t.type] }}>{t.text}</span>
      ))}
    </pre>
  );
}

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

      {mode === 'preview' && (
        <div className={styles.preview}>{children}</div>
      )}

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
          <HighlightedCode source={code} />
        </div>
      )}
    </div>
  );
}
