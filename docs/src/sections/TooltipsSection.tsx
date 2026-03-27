import React from 'react';
import { useTheme, Button, Tooltip } from '../../../src';

export function TooltipsSection() {
  const theme = useTheme();

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 8 }}>
        <Tooltip label="Copy to clipboard" position="top">
          <Button variant="ghost" icon="copy">
            Copy
          </Button>
        </Tooltip>
        <Tooltip label="View application settings" position="bottom">
          <Button variant="ghost" icon="settings">
            Settings
          </Button>
        </Tooltip>
        <Tooltip label="Lock this resource" position="right">
          <Button variant="ghost" icon="lock">
            Lock
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
