import React, { useState } from 'react';
import { useTheme, Pagination } from '../../../src';

export function PaginationSection() {
  const theme = useTheme();
  const [page, setPage] = useState(3);

  return (
    <div>
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
    </div>
  );
}
