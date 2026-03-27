import React, { useState } from 'react';
import { useTheme, Tabs } from '../../../src';

const TAB_ITEMS = ['Overview', 'Users', 'Settings', 'Logs'];

export function TabsSection() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div>
      <Tabs items={TAB_ITEMS} value={activeTab} onChange={setActiveTab} />

      <div
        style={{
          marginTop: 16,
          padding: 24,
          backgroundColor: theme.colors.surface.card,
          border: `1px solid ${theme.colors.surface.border}`,
          borderRadius: theme.radius.lg,
          fontSize: 14,
          color: theme.colors.neutral[200],
        }}
      >
        Active tab:{' '}
        <span
          style={{
            fontWeight: 600,
            color: theme.colors.primary[400],
          }}
        >
          {activeTab}
        </span>
      </div>
    </div>
  );
}
