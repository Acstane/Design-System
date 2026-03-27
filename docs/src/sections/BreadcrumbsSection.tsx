import React from 'react';
import { useTheme, Breadcrumbs } from '../../../src';

export function BreadcrumbsSection() {
  const theme = useTheme();

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Breadcrumbs
          items={['Dashboard', 'Applications', 'my-saas-app', 'Settings']}
        />
        <Breadcrumbs
          items={['Organization', 'Members', 'Marcin Kondrat']}
        />
      </div>
    </div>
  );
}
