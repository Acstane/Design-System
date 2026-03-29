import React, { useState } from 'react';
import { useTheme, Pagination } from '../../../src';
import { CodePreview } from '../CodePreview';

export function PaginationSection() {
  const theme = useTheme();
  const [page, setPage] = useState(3);

  return (
    <div>
      <CodePreview
        title="Pagination"
        code={`import { Pagination } from '@acstane/ui';

const [page, setPage] = useState(3);

<Pagination page={page} total={12} onChange={setPage} />`}
      >
        <Pagination page={page} total={12} onChange={setPage} />

        <div
          style={{
            marginTop: 16,
            fontSize: 13,
            color: theme.colors.neutral[400],
            fontFamily: theme.fonts.mono,
          }}
        >
          Page {page} of 12
        </div>
      </CodePreview>
    </div>
  );
}
