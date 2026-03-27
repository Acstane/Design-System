import React from 'react';
import { useTheme, Icon, type IconName } from '../../../src';

const ICON_NAMES: IconName[] = [
  'search',
  'user',
  'lock',
  'eye',
  'settings',
  'alert',
  'info',
  'shield',
  'star',
  'zap',
  'code',
  'layout',
  'grid',
  'layers',
  'box',
  'palette',
  'copy',
  'check',
  'menu',
  'x',
  'chevronDown',
  'chevronRight',
  'plus',
  'minus',
  'trash',
  'edit',
  'download',
  'upload',
  'heart',
  'mail',
  'phone',
  'globe',
  'clock',
  'calendar',
  'link',
  'externalLink',
  'refresh',
  'filter',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'arrowDown',
  'logout',
  'home',
  'bell',
];

export function IconsSection() {
  const theme = useTheme();

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 12,
        }}
      >
        {ICON_NAMES.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: 16,
              backgroundColor: theme.colors.surface.card,
              border: `1px solid ${theme.colors.surface.border}`,
              borderRadius: theme.radius.md,
            }}
          >
            <Icon name={name} size={20} color={theme.colors.neutral[300]} />
            <span
              style={{
                fontSize: 10,
                color: theme.colors.neutral[400],
                fontFamily: theme.fonts.mono,
                textAlign: 'center',
                wordBreak: 'break-all',
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
