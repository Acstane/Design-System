/** Scale steps for primary and neutral palettes */
export type ColorStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** Extended neutral scale includes pure white at step 0 */
export type NeutralStep = 0 | ColorStep;

export type ColorScale = Record<ColorStep, string>;
export type NeutralScale = Record<NeutralStep, string>;

export interface AccentColors {
  cyan: string;
  mint: string;
  amber: string;
  red: string;
  pink: string;
  blue: string;
}

export interface SurfaceColors {
  base: string;
  elevated: string;
  overlay: string;
  card: string;
  border: string;
  borderHover: string;
  borderFocus: string;
}

export interface ThemeColors {
  primary: ColorScale;
  neutral: NeutralScale;
  accent: AccentColors;
  surface: SurfaceColors;
}

export type RadiusKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type ShadowKey = 'sm' | 'md' | 'lg' | 'xl' | 'glow' | 'glowStrong';

export interface ThemeFonts {
  display: string;
  body: string;
  mono: string;
}

export type FontSizeKey = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

export interface Theme {
  colors: ThemeColors;
  radius: Record<RadiusKey, number>;
  spacing: Record<number, number>;
  shadow: Record<ShadowKey, string>;
  fonts: ThemeFonts;
  fontSize: Record<FontSizeKey, number>;
}

/** Recursively makes all properties optional */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ThemeOverride = DeepPartial<Theme>;
