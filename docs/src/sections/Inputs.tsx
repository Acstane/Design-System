import React from 'react';
import { useTheme, Input } from '../../../src';

export function InputsSection() {
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
      {/* Input Variants */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>Input Variants</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          <Input
            label="Email Address"
            placeholder="admin@acstane.io"
            icon="user"
            type="email"
          />
          <Input
            label="Client Secret"
            placeholder="sk_live_a1b2c3d4e5f6"
            mono
          />
          <Input
            label="Redirect URI"
            placeholder="https://app.example.com/callback"
            error="URI must use HTTPS scheme"
          />
          <Input
            label="Application Name"
            placeholder="My Application"
            disabled
            value="Disabled Input"
          />
        </div>
      </div>

      {/* Password Input */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={subSectionTitle}>Password Input</h3>
        <div style={{ maxWidth: 320 }}>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon="lock"
            hint="Must be at least 12 characters with one uppercase and one number."
          />
        </div>
      </div>
    </div>
  );
}
