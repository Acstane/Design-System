import React, { useState } from 'react';
import { useTheme, Accordion } from '../../../src';
import { CodePreview } from '../CodePreview';

const FAQ_ITEMS = [
  {
    title: 'What authentication methods are supported?',
    content:
      'Acstane supports a wide range of authentication methods out of the box: email/password, passwordless magic links, TOTP-based multi-factor authentication, WebAuthn/passkeys for biometric login, and enterprise SSO via SAML 2.0 and OpenID Connect. Each method can be enabled or disabled per-tenant.',
  },
  {
    title: 'How does multi-tenancy work?',
    content:
      'Every tenant operates within its own isolated user pool with separate configuration, branding, and security policies. Tenant data is logically partitioned at the database level, ensuring strict isolation. You can provision new tenants programmatically via the Management API or through the admin dashboard.',
  },
  {
    title: 'Can I self-host Acstane?',
    content:
      'Yes. Acstane ships as a single Docker image that can be deployed on any container runtime. We provide official Helm charts for Kubernetes, docker-compose files for simpler setups, and Terraform modules for major cloud providers. All features available in the managed cloud version are included in the self-hosted edition.',
  },
  {
    title: 'What about GDPR compliance?',
    content:
      'Acstane includes built-in tooling for GDPR compliance: automated data subject access requests (DSARs), right-to-erasure workflows, consent management, and audit logging. Data processing agreements are available for enterprise customers. All data at rest is encrypted with AES-256, and data in transit uses TLS 1.3.',
  },
];

export function AccordionSection() {
  const theme = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <CodePreview
        title="Accordion"
        code={`import { Accordion } from '@acstane/ui';

const [openIndex, setOpenIndex] = useState<number | null>(0);

const items = [
  { title: 'Question one?', content: 'Answer one.' },
  { title: 'Question two?', content: 'Answer two.' },
];

<Accordion items={items} value={openIndex} onChange={setOpenIndex} />`}
      >
        <Accordion items={FAQ_ITEMS} value={openIndex} onChange={setOpenIndex} />
      </CodePreview>
    </div>
  );
}
