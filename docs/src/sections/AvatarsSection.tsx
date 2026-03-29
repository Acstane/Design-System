import React from 'react';
import { useTheme, Avatar } from '../../../src';
import { CodePreview } from '../CodePreview';

const avatarData: { name: string; size: number; status?: 'online' | 'away' | 'offline' }[] = [
  { name: 'Alice Martin', size: 48, status: 'online' },
  { name: 'Bob Chen', size: 40, status: 'away' },
  { name: 'Carol Davis', size: 36, status: 'offline' },
  { name: 'Dan Evans', size: 32 },
  { name: 'Eve Foster', size: 28 },
];

const stackNames = [
  'Alice Martin',
  'Bob Chen',
  'Carol Davis',
  'Dan Evans',
  'Eve Foster',
];

export function AvatarsSection() {
  const theme = useTheme();

  const subSectionTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  return (
    <div>
      <CodePreview
        title="Avatars"
        code={`import { Avatar } from '@acstane/ui';

<Avatar name="Marcin Kondrat" size={48} status="online" />
<Avatar name="Jan Kowalski" size={40} status="away" />`}
      >
      {/* Sizes & Status */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>Sizes &amp; Status</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {avatarData.map(({ name, size, status }) => (
            <Avatar key={name} name={name} size={size} status={status} />
          ))}
        </div>
      </div>

      {/* Avatar Stack */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>Avatar Stack</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {stackNames.map((name, i) => (
            <Avatar
              key={name}
              name={name}
              size={36}
              style={{
                marginLeft: i === 0 ? 0 : -10,
                border: `2px solid ${theme.colors.surface.base}`,
                borderRadius: '50%',
                position: 'relative',
                zIndex: stackNames.length - i,
              }}
            />
          ))}
        </div>
      </div>
      </CodePreview>
    </div>
  );
}
