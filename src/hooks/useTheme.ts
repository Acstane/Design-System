import { use } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';
import type { Theme } from '../theme/types';

/** Returns the current Acstane theme from context */
export function useTheme(): Theme {
  return use(ThemeContext);
}
