import React from 'react';
import { useTheme, Card, Button, Badge } from '../../../src';
import { CodePreview } from '../CodePreview';

export function CardsSection() {
  const theme = useTheme();

  const bodyText: React.CSSProperties = {
    fontSize: 13,
    color: theme.colors.neutral[300],
    lineHeight: 1.5,
  };

  const codeBlock: React.CSSProperties = {
    fontFamily: theme.fonts.mono,
    fontSize: 12,
    color: theme.colors.neutral[200],
    backgroundColor: theme.colors.surface.base,
    border: `1px solid ${theme.colors.surface.border}`,
    borderRadius: theme.radius.sm,
    padding: '10px 14px',
    overflowX: 'auto',
    whiteSpace: 'pre',
  };

  return (
    <div>
      <CodePreview
        title="Cards"
        code={`import { Card, Button } from '@acstane/ui';

<Card
  title="OIDC Application"
  actions={
    <>
      <Button variant="ghost" size="sm">Edit</Button>
      <Button variant="primary" size="sm">Configure</Button>
    </>
  }
>
  <p>Your application description here.</p>
</Card>`}
      >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {/* OIDC Application */}
        <Card
          title="OIDC Application"
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
              <Button variant="primary" size="sm">
                Configure
              </Button>
            </div>
          }
        >
          <p style={bodyText}>
            Acstane Dashboard is configured as a confidential client with
            authorization code flow and PKCE enabled.
          </p>
        </Card>

        {/* API Key */}
        <Card
          title="API Key"
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" size="sm" icon="copy">
                Copy
              </Button>
              <Button variant="danger" size="sm">
                Revoke
              </Button>
            </div>
          }
        >
          <div style={codeBlock}>sk_live_a1b2c3d4e5f6g7h8i9j0</div>
        </Card>

        {/* Webhook Endpoint */}
        <Card
          title="Webhook Endpoint"
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" size="sm">
                Test
              </Button>
            </div>
          }
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 8,
            }}
          >
            <Badge variant="success">Active</Badge>
          </div>
          <p
            style={{
              ...bodyText,
              fontFamily: theme.fonts.mono,
              fontSize: 12,
            }}
          >
            https://api.example.com/webhooks/acstane
          </p>
        </Card>
      </div>
      </CodePreview>
    </div>
  );
}
