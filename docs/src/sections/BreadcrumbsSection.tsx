import React from 'react';
import { useTheme, Breadcrumbs } from '../../../src';
import { CodePreview } from '../CodePreview';

export function BreadcrumbsSection() {
  const theme = useTheme();

  return (
    <div>
      <CodePreview
        title="Breadcrumbs"
        code={`import { Breadcrumbs } from '@acstane/ui';

<Breadcrumbs items={['Dashboard', 'Settings', 'Profile']} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Breadcrumbs
            items={['Dashboard', 'Applications', 'my-saas-app', 'Settings']}
          />
          <Breadcrumbs
            items={['Organization', 'Members', 'Marcin Kondrat']}
          />
        </div>
      </CodePreview>
    </div>
  );
}
