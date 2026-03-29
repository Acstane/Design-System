import React, { useState } from 'react';
import { useTheme, Button, Icon } from '../../../src';
import { CodePreview } from '../CodePreview';

const DURATIONS = [
  { ms: 75, label: 'instant' },
  { ms: 150, label: 'fast' },
  { ms: 250, label: 'normal' },
  { ms: 350, label: 'smooth' },
  { ms: 500, label: 'slow' },
  { ms: 800, label: 'dramatic' },
];

const EASINGS = [
  { name: 'ease-out', value: 'cubic-bezier(0.0, 0, 0.2, 1)', use: 'Enter / appear' },
  { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', use: 'Exit / dismiss' },
  { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', use: 'Move / resize' },
  { name: 'spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', use: 'Playful bounce' },
];

/* ─── Animation categories ─────────────────────────────── */

const ENTRANCE_ANIMATIONS = [
  'acFadeIn',
  'acFadeInScale',
  'acSlideInUp',
  'acSlideInRight',
  'acSlideInDown',
  'acSlideInLeft',
  'acBounceIn',
  'acZoomIn',
  'acFlipInX',
  'acFlipInY',
  'acDropIn',
  'acSwingIn',
] as const;

const ATTENTION_ANIMATIONS = [
  'acShake',
  'acHeartbeat',
  'acJello',
  'acWobble',
  'acRubberBand',
  'acTada',
] as const;

const LOOPING_ANIMATIONS = [
  'acSpin',
  'acPulse',
  'acFloat',
  'acGlowPulse',
  'acBorderGlow',
  'acColorPulse',
  'acScaleUpDown',
  'acSway',
  'acMorph',
] as const;

type AnimationName =
  | (typeof ENTRANCE_ANIMATIONS)[number]
  | (typeof ATTENTION_ANIMATIONS)[number]
  | (typeof LOOPING_ANIMATIONS)[number];

const ALL_ANIMATIONS: AnimationName[] = [
  ...ENTRANCE_ANIMATIONS,
  ...ATTENTION_ANIMATIONS,
  ...LOOPING_ANIMATIONS,
];

const ANIMATION_DURATIONS: Record<string, string> = {
  // Entrance
  acFadeIn: '0.3s',
  acFadeInScale: '0.3s',
  acSlideInUp: '0.4s',
  acSlideInRight: '0.4s',
  acSlideInDown: '0.4s',
  acSlideInLeft: '0.4s',
  acBounceIn: '0.6s',
  acZoomIn: '0.4s',
  acFlipInX: '0.5s',
  acFlipInY: '0.5s',
  acDropIn: '0.5s',
  acSwingIn: '0.6s',
  // Attention
  acShake: '0.6s',
  acHeartbeat: '0.8s',
  acJello: '0.8s',
  acWobble: '0.8s',
  acRubberBand: '0.7s',
  acTada: '1s',
  // Looping
  acSpin: '1s',
  acPulse: '1.5s',
  acFloat: '2s',
  acGlowPulse: '2s',
  acBorderGlow: '2s',
  acColorPulse: '2s',
  acScaleUpDown: '1.5s',
  acSway: '2s',
  acMorph: '3s',
};

const ANIMATION_ITERATIONS: Record<string, string> = {
  acSpin: 'infinite',
  acPulse: 'infinite',
  acFloat: 'infinite',
  acGlowPulse: 'infinite',
  acBorderGlow: 'infinite',
  acColorPulse: 'infinite',
  acScaleUpDown: 'infinite',
  acSway: 'infinite',
  acMorph: 'infinite',
};

const PRESETS_CODE = `import '@acstane/ui/styles.css';

<div style={{ animation: 'acBounceIn 0.6s ease-out both' }}>
  Animated content
</div>

<div style={{ animation: 'acFloat 2s ease-in-out infinite' }}>
  Floating element
</div>`;

const STAGGER_CODE = `{items.map((item, i) => (
  <div style={{
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 300ms ease-out, transform 300ms ease-out',
    transitionDelay: \`\${i * 50}ms\`,
  }}>
    {item}
  </div>
))}`;

export function MotionSection() {
  const theme = useTheme();
  const [easingPlayed, setEasingPlayed] = useState<Record<number, boolean>>({});
  const [activeAnimation, setActiveAnimation] = useState<AnimationName>('acFadeIn');
  const [animKey, setAnimKey] = useState(0);
  const [staggerVisible, setStaggerVisible] = useState(false);
  const [durationKeys, setDurationKeys] = useState(0);

  const subTitle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: theme.colors.neutral[100],
    fontFamily: theme.fonts.display,
    marginBottom: 12,
  };

  const mono: React.CSSProperties = {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    color: theme.colors.neutral[400],
  };

  const categoryLabel: React.CSSProperties = {
    fontFamily: theme.fonts.mono,
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: theme.colors.neutral[500],
    marginTop: 12,
    marginBottom: 4,
    paddingLeft: 12,
  };

  const animBtn = (anim: AnimationName): React.CSSProperties => ({
    background:
      activeAnimation === anim
        ? `${theme.colors.primary[400]}18`
        : 'none',
    border:
      activeAnimation === anim
        ? `1px solid ${theme.colors.primary[400]}40`
        : '1px solid transparent',
    borderRadius: theme.radius.sm,
    color:
      activeAnimation === anim
        ? theme.colors.primary[300]
        : theme.colors.neutral[400],
    fontSize: 13,
    fontWeight: activeAnimation === anim ? 600 : 400,
    padding: '6px 12px',
    cursor: 'pointer',
    textAlign: 'left' as const,
    fontFamily: theme.fonts.mono,
  });

  const handleSelectAnim = (anim: AnimationName) => {
    setActiveAnimation(anim);
    setAnimKey((k) => k + 1);
  };

  const renderAnimButton = (anim: AnimationName) => (
    <button
      key={anim}
      onClick={() => handleSelectAnim(anim)}
      style={animBtn(anim)}
    >
      {anim}
    </button>
  );

  const isLooping = !!ANIMATION_ITERATIONS[activeAnimation];

  return (
    <div>
      {/* Duration Scale */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Duration Scale</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDurationKeys((k) => k + 1)}
          style={{ marginBottom: 16 }}
        >
          Replay
        </Button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {DURATIONS.map((d) => (
            <div
              key={d.ms}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div
                style={{
                  width: 80,
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.neutral[200],
                  flexShrink: 0,
                }}
              >
                {d.ms}ms
                <span
                  style={{
                    display: 'block',
                    fontSize: 11,
                    color: theme.colors.neutral[500],
                    fontWeight: 400,
                  }}
                >
                  {d.label}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: theme.radius.full,
                  overflow: 'hidden',
                  backgroundColor: theme.colors.surface.border,
                }}
              >
                <div
                  key={`${d.ms}-${durationKeys}`}
                  style={{
                    height: '100%',
                    borderRadius: theme.radius.full,
                    background: `linear-gradient(90deg, ${theme.colors.primary[400]}, ${theme.colors.accent.cyan})`,
                    animation: `acSlideInLeft ${d.ms}ms ease-out both`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Easing Curves */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Easing Curves</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {EASINGS.map((easing, i) => (
            <div
              key={easing.name}
              style={{
                backgroundColor: theme.colors.surface.elevated,
                border: `1px solid ${theme.colors.surface.border}`,
                borderRadius: theme.radius.lg,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.colors.neutral[100],
                  marginBottom: 4,
                }}
              >
                {easing.name}
              </div>
              <div style={{ ...mono, marginBottom: 4 }}>{easing.value}</div>
              <div
                style={{
                  fontSize: 12,
                  color: theme.colors.neutral[500],
                  marginBottom: 12,
                }}
              >
                {easing.use}
              </div>
              <div
                style={{
                  position: 'relative',
                  height: 24,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: theme.radius.sm,
                    backgroundColor: theme.colors.primary[400],
                    transform: easingPlayed[i]
                      ? 'translateX(120px)'
                      : 'translateX(0)',
                    transition: `transform 600ms ${easing.value}`,
                  }}
                />
              </div>
              <button
                onClick={() =>
                  setEasingPlayed((prev) => ({ ...prev, [i]: !prev[i] }))
                }
                style={{
                  background: 'none',
                  border: `1px solid ${theme.colors.surface.border}`,
                  borderRadius: theme.radius.sm,
                  color: theme.colors.neutral[300],
                  fontSize: 11,
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontFamily: theme.fonts.body,
                }}
              >
                {easingPlayed[i] ? 'Reset' : 'Play'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Presets */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Animation Presets</h3>
        <CodePreview code={PRESETS_CODE} title="Animation Presets">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Animation button list */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                minWidth: 160,
                maxHeight: 480,
                overflowY: 'auto',
              }}
            >
              {/* Entrance */}
              <div style={categoryLabel}>Entrance</div>
              {ENTRANCE_ANIMATIONS.map(renderAnimButton)}

              {/* Attention */}
              <div style={categoryLabel}>Attention</div>
              {ATTENTION_ANIMATIONS.map(renderAnimButton)}

              {/* Looping */}
              <div style={categoryLabel}>Looping</div>
              {LOOPING_ANIMATIONS.map(renderAnimButton)}
            </div>

            {/* Preview area */}
            <div
              style={{
                flex: 1,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                backgroundColor: theme.colors.surface.elevated,
                border: `1px solid ${theme.colors.surface.border}`,
                borderRadius: theme.radius.lg,
              }}
            >
              <div
                key={animKey}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: theme.radius.lg,
                  background: `linear-gradient(135deg, ${theme.colors.primary[400]}, ${theme.colors.accent.cyan})`,
                  animation: `${activeAnimation} ${ANIMATION_DURATIONS[activeAnimation] || '0.4s'} ease-out ${isLooping ? 'infinite' : 'both'}`,
                  animationFillMode: isLooping ? undefined : 'both',
                }}
              />
              <div style={{ ...mono, marginTop: 4 }}>
                {activeAnimation} &middot; {ANIMATION_DURATIONS[activeAnimation] || '0.4s'}
                {isLooping ? ' · infinite' : ''}
              </div>
              {!isLooping && (
                <button
                  onClick={() => setAnimKey((k) => k + 1)}
                  style={{
                    background: 'none',
                    border: `1px solid ${theme.colors.surface.border}`,
                    borderRadius: theme.radius.sm,
                    color: theme.colors.neutral[300],
                    fontSize: 11,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    fontFamily: theme.fonts.body,
                  }}
                >
                  Replay
                </button>
              )}
            </div>
          </div>
        </CodePreview>
      </div>

      {/* Staggered List */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={subTitle}>Staggered List</h3>
        <CodePreview code={STAGGER_CODE} title="Stagger Pattern">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setStaggerVisible(false);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => setStaggerVisible(true));
              });
            }}
            style={{ marginBottom: 16 }}
          >
            Trigger Stagger
          </Button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: 44,
                  borderRadius: theme.radius.md,
                  backgroundColor: theme.colors.surface.elevated,
                  border: `1px solid ${theme.colors.surface.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16,
                  fontSize: 13,
                  color: theme.colors.neutral[300],
                  fontFamily: theme.fonts.body,
                  opacity: staggerVisible ? 1 : 0,
                  transform: staggerVisible
                    ? 'translateY(0)'
                    : 'translateY(12px)',
                  transition: `opacity 300ms ease-out, transform 300ms ease-out`,
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                Item {i + 1}
                <span style={{ ...mono, marginLeft: 8 }}>
                  delay: {i * 50}ms
                </span>
              </div>
            ))}
          </div>
        </CodePreview>
      </div>
    </div>
  );
}
