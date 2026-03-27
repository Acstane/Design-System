import { createContext, useMemo, type ReactNode } from 'react';
import type { Theme } from './types';
import { defaultTheme } from './tokens';

export const ThemeContext = createContext<Theme>(defaultTheme);

/** Flattens theme tokens into CSS custom property declarations */
function themeToCSSProperties(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [step, value] of Object.entries(theme.colors.primary)) {
    vars[`--ac-pri-${step}`] = value;
  }

  for (const [step, value] of Object.entries(theme.colors.neutral)) {
    vars[`--ac-n-${step}`] = value;
  }

  for (const [key, value] of Object.entries(theme.colors.accent)) {
    vars[`--ac-accent-${key}`] = value;
  }

  for (const [key, value] of Object.entries(theme.colors.surface)) {
    vars[`--ac-surface-${key}`] = value;
  }

  for (const [key, value] of Object.entries(theme.radius)) {
    vars[`--ac-radius-${key}`] = `${value}px`;
  }

  for (const [key, value] of Object.entries(theme.shadow)) {
    vars[`--ac-shadow-${key}`] = value;
  }

  for (const [key, value] of Object.entries(theme.fonts)) {
    vars[`--ac-font-${key}`] = value;
  }

  for (const [key, value] of Object.entries(theme.fontSize)) {
    vars[`--ac-fs-${key}`] = `${value}px`;
  }

  for (const [key, value] of Object.entries(theme.spacing)) {
    vars[`--ac-space-${key}`] = `${value}px`;
  }

  return vars;
}

export interface AcstaneThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

/**
 * Provides theme context and injects CSS custom properties.
 * Wrap your app root with this provider.
 *
 * @example
 * ```tsx
 * <AcstaneThemeProvider theme={createTheme({ colors: { primary: { 400: '#3b5bff' } } })}>
 *   <App />
 * </AcstaneThemeProvider>
 * ```
 */
export function AcstaneThemeProvider({ theme = defaultTheme, children }: AcstaneThemeProviderProps) {
  const cssVars = useMemo(() => themeToCSSProperties(theme), [theme]);

  return (
    <ThemeContext value={theme}>
      <div style={cssVars as React.CSSProperties} data-acstane-root="">
        {children}
      </div>
    </ThemeContext>
  );
}
