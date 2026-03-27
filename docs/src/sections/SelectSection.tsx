import React, { useState } from 'react';
import { useTheme, Select } from '../../../src';

export function SelectSection() {
  const theme = useTheme();
  const [authMethod, setAuthMethod] = useState<string | null>(null);
  const [mfaPolicy, setMfaPolicy] = useState<string | null>(null);

  return (
    <div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 260px', maxWidth: 320 }}>
          <Select
            label="Authentication Method"
            options={[
              'Email & Password',
              'Magic Link',
              'SSO (SAML)',
              'SSO (OIDC)',
              'Passkey (WebAuthn)',
            ]}
            value={authMethod}
            onChange={setAuthMethod}
            placeholder="Select method…"
          />
        </div>
        <div style={{ flex: '1 1 260px', maxWidth: 320 }}>
          <Select
            label="MFA Policy"
            options={[
              'Optional',
              'Required for admins',
              'Required for all',
              'Disabled',
            ]}
            value={mfaPolicy}
            onChange={setMfaPolicy}
            placeholder="Select policy…"
          />
        </div>
      </div>
    </div>
  );
}
