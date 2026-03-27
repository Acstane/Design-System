import React from 'react';
import { useTheme, Table, Badge } from '../../../src';

interface AppRow {
  name: string;
  type: string;
  status: string;
  created: string;
}

const data: AppRow[] = [
  { name: 'my-saas-app', type: 'Authorization Code', status: 'Active', created: '2024-01-15' },
  { name: 'internal-dashboard', type: 'Client Credentials', status: 'Active', created: '2024-02-08' },
  { name: 'mobile-client', type: 'Authorization Code + PKCE', status: 'Inactive', created: '2024-03-22' },
  { name: 'legacy-api-bridge', type: 'Implicit', status: 'Deprecated', created: '2023-11-04' },
];

export function TablesSection() {
  const theme = useTheme();

  const statusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success' as const;
      case 'Inactive':
        return 'warning' as const;
      case 'Deprecated':
        return 'danger' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <div>
      <Table<AppRow>
        striped
        data={data}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'type', header: 'Type' },
          {
            key: 'status',
            header: 'Status',
            render: (value) => (
              <Badge variant={statusVariant(value as string)} dot>
                {value as string}
              </Badge>
            ),
          },
          {
            key: 'created',
            header: 'Created',
            render: (value) => (
              <span style={{ fontFamily: theme.fonts.mono, fontSize: 13 }}>
                {value as string}
              </span>
            ),
          },
        ]}
        onRowClick={() => {}}
      />
    </div>
  );
}
