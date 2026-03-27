import React from 'react';
import { useTheme, ProgressBar, Skeleton } from '../../../src';

export function ProgressSection() {
  const theme = useTheme();

  const subSectionTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 16,
  };

  return (
    <div>
      {/* Progress Bars */}
      <h3 style={subSectionTitle}>Progress Bars</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
        <ProgressBar value={75} variant="primary" label="Storage Usage" showValue />
        <ProgressBar value={45} variant="success" label="Onboarding Progress" showValue />
        <ProgressBar value={92} variant="warning" label="API Rate Limit" showValue />
        <ProgressBar value={15} variant="danger" label="Error Rate" showValue />
      </div>

      {/* Skeleton Loaders */}
      <h3 style={subSectionTitle}>Skeleton Loaders</h3>
      <div
        style={{
          padding: 24,
          backgroundColor: theme.colors.surface.card,
          border: `1px solid ${theme.colors.surface.border}`,
          borderRadius: theme.radius.lg,
          maxWidth: 360,
        }}
      >
        {/* Avatar */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <Skeleton width={48} height={48} radius={999} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton width="60%" height={14} />
            <Skeleton width="40%" height={12} />
          </div>
        </div>

        {/* Text lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <Skeleton width="100%" height={12} />
          <Skeleton width="90%" height={12} />
          <Skeleton width="70%" height={12} />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Skeleton width={80} height={32} radius={6} />
          <Skeleton width={100} height={32} radius={6} />
        </div>
      </div>
    </div>
  );
}
