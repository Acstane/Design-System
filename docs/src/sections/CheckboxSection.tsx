import React, { useState } from 'react';
import { useTheme, Checkbox } from '../../../src';
import { CodePreview } from '../CodePreview';

export function CheckboxSection() {
  const theme = useTheme();

  const [permissions, setPermissions] = useState({
    'users:read': true,
    'users:write': true,
    'users:delete': false,
    'apps:manage': false,
  });

  const [tokenFormat, setTokenFormat] = useState('JWT');

  const subSectionTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <CodePreview
        title="Checkbox & Radio"
        code={`import { Checkbox } from '@acstane/ui';

<Checkbox
  label="users:read"
  checked={checked}
  onChange={setChecked}
/>

<Checkbox
  radio
  label="JWT (default)"
  checked={selected === 'jwt'}
  onChange={() => setSelected('jwt')}
/>`}
      >
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        {/* Checkboxes */}
        <div style={{ flex: '1 1 220px' }}>
          <h3 style={subSectionTitle}>Permissions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(Object.keys(permissions) as (keyof typeof permissions)[]).map(
              (key) => (
                <Checkbox
                  key={key}
                  label={key}
                  checked={permissions[key]}
                  onChange={() => togglePermission(key)}
                />
              ),
            )}
          </div>
        </div>

        {/* Radio Buttons */}
        <div style={{ flex: '1 1 220px' }}>
          <h3 style={subSectionTitle}>Token Format</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['JWT', 'Opaque Token', 'Reference Token'].map((format) => (
              <Checkbox
                key={format}
                label={format}
                radio
                checked={tokenFormat === format}
                onChange={() => setTokenFormat(format)}
              />
            ))}
          </div>
        </div>
      </div>
      </CodePreview>
    </div>
  );
}
