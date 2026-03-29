import React from 'react';
import { useTheme, Alert } from '../../../src';
import { CodePreview } from '../CodePreview';

export function AlertsSection() {
  const theme = useTheme();

  return (
    <div>
      <CodePreview
        title="Alerts"
        code={`import { Alert } from '@acstane/ui';

<Alert variant="info" title="OIDC Discovery">
  Discovery endpoint available at /.well-known/openid-configuration
</Alert>

<Alert variant="success" title="Application Created">
  Your application has been registered successfully.
</Alert>

<Alert variant="warning" title="Token Expiry">
  Access token expires in less than 5 minutes.
</Alert>

<Alert variant="danger" title="Rate Limited">
  Request rate of 1,000/min exceeded.
</Alert>`}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 640,
          }}
        >
          <Alert variant="info" title="OIDC Discovery">
            The OpenID Connect discovery endpoint is available at
            /.well-known/openid-configuration and refreshes every 24 hours.
          </Alert>

          <Alert variant="success" title="Application Created">
            Your OIDC application has been registered successfully. Client
            credentials have been generated and are ready to use.
          </Alert>

          <Alert variant="warning" title="Token Expiry">
            The current access token expires in less than 5 minutes. Consider
            refreshing the token to avoid service interruptions.
          </Alert>

          <Alert variant="danger" title="Rate Limited">
            Your application has exceeded the allowed request rate of 1,000
            requests per minute. Subsequent requests will be rejected until the
            window resets.
          </Alert>
        </div>
      </CodePreview>
    </div>
  );
}
