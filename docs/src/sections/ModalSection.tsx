import React, { useState } from 'react';
import { useTheme, Button, Modal } from '../../../src';

export function ModalSection() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="danger" icon="alert" onClick={() => setOpen(true)}>
        Revoke API Key
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Revoke API Key"
        actions={
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Revoke
            </Button>
          </div>
        }
      >
        <p
          style={{
            fontSize: 14,
            color: theme.colors.neutral[300],
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          This action is irreversible. Once revoked, any service or integration
          using this key will immediately lose access. You will need to generate
          a new key and update all affected configurations.
        </p>
      </Modal>
    </div>
  );
}
