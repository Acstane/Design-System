import React from 'react';
import { useTheme, Button } from '../../../src';
import { CodePreview } from '../CodePreview';

const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;
const sizes = ['lg', 'md', 'sm'] as const;
const sizeLabels: Record<string, string> = { lg: 'Large', md: 'Medium', sm: 'Small' };

const iconButtons: { icon: 'lock' | 'user' | 'settings' | 'copy' | 'alert'; label: string }[] = [
  { icon: 'lock', label: 'Authenticate' },
  { icon: 'user', label: 'Invite User' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'copy', label: 'Copy Token' },
  { icon: 'alert', label: 'Revoke Access' },
];

export function ButtonsSection() {
  const theme = useTheme();

  const subSectionTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  const variantLabel: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    color: theme.colors.neutral[300],
    fontFamily: theme.fonts.mono,
    minWidth: 90,
    textTransform: 'capitalize',
  };

  return (
    <div>
      {/* Variants x Sizes */}
      <div style={{ marginBottom: 32 }}>
        <CodePreview
          title="Variants × Sizes"
          code={`import { Button } from '@acstane/ui';

<Button variant="primary" size="lg">Large</Button>
<Button variant="secondary" size="md">Medium</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="ghost" size="md">Ghost</Button>
<Button variant="danger" size="sm">Danger</Button>`}
        >
          <h3 style={subSectionTitle}>Variants &times; Sizes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {variants.map((variant) => (
              <div
                key={variant}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span style={variantLabel}>{variant}</span>
                {sizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {sizeLabels[size]}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </CodePreview>
      </div>

      {/* With Icons */}
      <div style={{ marginBottom: 32 }}>
        <CodePreview
          title="With Icons"
          code={`import { Button } from '@acstane/ui';

<Button variant="secondary" icon="lock">Authenticate</Button>
<Button variant="secondary" icon="user">Invite User</Button>
<Button variant="secondary" icon="settings">Settings</Button>`}
        >
          <h3 style={subSectionTitle}>With Icons</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {iconButtons.map(({ icon, label }) => (
              <Button key={icon} variant="secondary" icon={icon}>
                {label}
              </Button>
            ))}
          </div>
        </CodePreview>
      </div>

      {/* States */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>States</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <span
            style={{
              fontSize: 13,
              color: theme.colors.neutral[400],
              fontStyle: 'italic',
            }}
          >
            Hover and focus states are visible on interaction.
          </span>
        </div>
      </div>
    </div>
  );
}
