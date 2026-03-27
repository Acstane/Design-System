import React, { useState } from 'react';
import { useTheme, Toggle } from '../../../src';

export function ToggleSection() {
  const theme = useTheme();

  const [mfa, setMfa] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  const [selfRegistration, setSelfRegistration] = useState(false);
  const [deviceTrust, setDeviceTrust] = useState(false);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 400,
        }}
      >
        <Toggle
          label="Enable multi-factor authentication"
          checked={mfa}
          onChange={setMfa}
        />
        <Toggle
          label="Require email verification"
          checked={emailVerification}
          onChange={setEmailVerification}
        />
        <Toggle
          label="Allow self-registration"
          checked={selfRegistration}
          onChange={setSelfRegistration}
        />
        <Toggle
          label="Enable device trust"
          checked={deviceTrust}
          onChange={setDeviceTrust}
          size="sm"
        />
      </div>
    </div>
  );
}
