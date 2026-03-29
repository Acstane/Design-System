import React from 'react';
import { useTheme, Badge } from '../../../src';
import { CodePreview } from '../CodePreview';

export function BadgesSection() {
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
      {/* Variants */}
      <div style={{ marginBottom: 32 }}>
        <CodePreview
          title="Badge Variants"
          code={`import { Badge } from '@acstane/ui';

<Badge>Default</Badge>
<Badge variant="primary">OIDC Client</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Revoked</Badge>
<Badge variant="info">Beta</Badge>

// With dot indicator
<Badge variant="success" dot>Online</Badge>
<Badge variant="danger" dot>Offline</Badge>`}
        >
          <h3 style={subSectionTitle}>Variants</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <Badge>Default</Badge>
            <Badge variant="primary">OIDC Client</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">Revoked</Badge>
            <Badge variant="info">Beta</Badge>
          </div>

          <h3 style={{ ...subSectionTitle, marginTop: 24 }}>With Dot Indicator</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning" dot>Away</Badge>
            <Badge variant="danger" dot>Offline</Badge>
            <Badge variant="info" dot>Syncing</Badge>
          </div>
        </CodePreview>
      </div>
    </div>
  );
}
