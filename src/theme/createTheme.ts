import type { Theme, ThemeOverride } from './types';
import { defaultTheme } from './tokens';

/** Deep merges source into target, returning a new object */
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = result[key];

    if (
      sourceVal !== null &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else {
      result[key] = sourceVal;
    }
  }

  return result;
}

/**
 * Creates a complete theme by merging overrides into the default Acstane theme.
 * Only specify the tokens you want to change.
 *
 * @example
 * ```ts
 * const theme = createTheme({
 *   colors: {
 *     primary: { 400: '#3b5bff', 500: '#2441e0' },
 *   },
 * });
 * ```
 */
export function createTheme(overrides: ThemeOverride = {}): Theme {
  return deepMerge(
    defaultTheme as unknown as Record<string, unknown>,
    overrides as Record<string, unknown>,
  ) as unknown as Theme;
}
