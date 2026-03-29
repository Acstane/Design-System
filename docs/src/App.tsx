import { useState, useCallback, type ReactNode } from 'react';
import { Logo, Icon, Badge, useTheme } from '../../src';
import styles from './App.module.css';

import { ColorsSection } from './sections/Colors';
import { TypographySection } from './sections/Typography';
import { SpacingSection } from './sections/Spacing';
import { RadiusSection } from './sections/Radius';
import { ShadowsSection } from './sections/Shadows';
import { IconsSection } from './sections/Icons';
import { MotionSection } from './sections/Motion';
import { EffectsSection } from './sections/Effects';
import { GradientsSection } from './sections/Gradients';
import { ButtonsSection } from './sections/Buttons';
import { InputsSection } from './sections/Inputs';
import { SelectSection } from './sections/SelectSection';
import { CheckboxSection } from './sections/CheckboxSection';
import { ToggleSection } from './sections/ToggleSection';
import { BadgesSection } from './sections/BadgesSection';
import { AvatarsSection } from './sections/AvatarsSection';
import { TooltipsSection } from './sections/TooltipsSection';
import { CardsSection } from './sections/CardsSection';
import { AlertsSection } from './sections/AlertsSection';
import { ModalSection } from './sections/ModalSection';
import { TablesSection } from './sections/TablesSection';
import { TabsSection } from './sections/TabsSection';
import { BreadcrumbsSection } from './sections/BreadcrumbsSection';
import { PaginationSection } from './sections/PaginationSection';
import { ProgressSection } from './sections/ProgressSection';
import { AccordionSection } from './sections/AccordionSection';
import { TokensSection } from './sections/TokensSection';
import { LogoSection } from './sections/LogoSection';
import { BrandAssetsSection } from './sections/BrandAssets';

/* ─── Nav structure ──────────────────────────────────────── */

interface NavItem {
  id: string;
  label: string;
}

interface NavGroup {
  group: string;
  icon: 'layers' | 'box' | 'shield' | 'palette';
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    group: 'Foundation',
    icon: 'layers' as const,
    items: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'radius', label: 'Border Radius' },
      { id: 'shadows', label: 'Shadows & Elevation' },
      { id: 'icons', label: 'Iconography' },
      { id: 'motion', label: 'Motion & Animation' },
      { id: 'effects', label: 'Effects & Surfaces' },
      { id: 'gradients', label: 'Gradients' },
    ],
  },
  {
    group: 'Components',
    icon: 'box' as const,
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'inputs', label: 'Inputs' },
      { id: 'select', label: 'Select & Dropdown' },
      { id: 'checkbox', label: 'Checkbox & Radio' },
      { id: 'toggle', label: 'Toggle / Switch' },
      { id: 'badges', label: 'Badges' },
      { id: 'avatars', label: 'Avatars' },
      { id: 'tooltips', label: 'Tooltips' },
      { id: 'cards', label: 'Cards' },
      { id: 'alerts', label: 'Alerts' },
      { id: 'modal', label: 'Modal / Dialog' },
      { id: 'tables', label: 'Tables' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'breadcrumbs', label: 'Breadcrumbs' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'progress', label: 'Progress & Skeleton' },
      { id: 'accordion', label: 'Accordion' },
    ],
  },
  {
    group: 'Brand',
    icon: 'shield' as const,
    items: [
      { id: 'logo', label: 'Logo' },
      { id: 'brand-assets', label: 'Brand Assets' },
    ],
  },
  {
    group: 'Customization',
    icon: 'palette' as const,
    items: [{ id: 'tokens', label: 'Token Swap Guide' }],
  },
];

/* ─── Helper components ──────────────────────────────────── */

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <div id={id} className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {description && (
          <p className={styles.sectionDescription}>{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

interface SubSectionProps {
  title: string;
  note?: string;
  children: ReactNode;
}

export function SubSection({ title, note, children }: SubSectionProps) {
  return (
    <div className={styles.subSection}>
      <h3 className={styles.subSectionTitle}>
        {title}
        {note && <span className={styles.subSectionNote}>{note}</span>}
      </h3>
      {children}
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────── */

export function App() {
  const theme = useTheme();

  const [activeSection, setActiveSection] = useState('colors');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    NAV.map((g) => g.group),
  );

  const navigate = useCallback(
    (id: string) => {
      setActiveSection(id);
      setSidebarOpen(false);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    },
    [],
  );

  const toggleGroup = useCallback((group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  }, []);

  const filteredNav = NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className={styles.root}>
      {/* ── Mobile header ─────────────────────────────────── */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Icon name="menu" size={20} />
        </button>
        <span className={styles.mobileTitle}>Acstane Design System</span>
      </div>

      {/* ── Overlay ───────────────────────────────────────── */}
      <div
        className={styles.overlay}
        data-open={sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside className={styles.sidebar} data-open={sidebarOpen}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarHeaderTop}>
            <Logo variant="mark" size={28} />
            <span className={styles.sidebarTitle}>Acstane</span>
          </div>
          <span className={styles.sidebarSubtitle}>Design System v1.0</span>

          <div className={styles.searchWrap}>
            <Icon
              name="search"
              size={14}
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Search sections..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className={styles.nav}>
          {filteredNav.map((group) => {
            const expanded = expandedGroups.includes(group.group);
            return (
              <div key={group.group} className={styles.navGroup}>
                <button
                  className={styles.navGroupBtn}
                  onClick={() => toggleGroup(group.group)}
                >
                  <span className={styles.navGroupIcon}>
                    <Icon name={group.icon} size={13} />
                    {group.group}
                  </span>
                  <span
                    className={styles.navGroupChevron}
                    data-expanded={expanded}
                  >
                    <Icon name="chevronRight" size={12} />
                  </span>
                </button>
                <div
                  className={styles.navGroupItems}
                  style={{
                    maxHeight: expanded
                      ? `${group.items.length * 34}px`
                      : '0px',
                  }}
                >
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      className={styles.navItem}
                      data-active={activeSection === item.id}
                      onClick={() => navigate(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <span style={{ color: '#fff' }}><Logo variant="mark" size={16} /></span>
          <span>&copy; {new Date().getFullYear()} Acstane</span>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────── */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.heroTop}>
              <Logo variant="mark" size={44} />
              <h1 className={styles.heroTitle}>Design System</h1>
            </div>
            <p className={styles.heroDescription}>
              A comprehensive, token-based design system built for React.
              Every color, radius, shadow, and spacing value is driven by
              design tokens, making it easy to theme, extend, and maintain a
              consistent UI across your entire product.
            </p>
            <div className={styles.heroBadges}>
              <Badge variant="primary">v1.0</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Token-based</Badge>
              <Badge variant="secondary">Responsive</Badge>
            </div>
          </div>

          <Section id="colors" title="Colors" description="The full color system. Primary purple conveys brand and interactivity. Neutrals provide dark-mode depth. Accents carry semantic meaning."><ColorsSection /></Section>
          <Section id="typography" title="Typography" description="Three font families with distinct roles. Satoshi for display. Inter for UI. JetBrains Mono for code and tokens."><TypographySection /></Section>
          <Section id="spacing" title="Spacing" description="A 4px base grid. All spacing values are multiples of 4."><SpacingSection /></Section>
          <Section id="radius" title="Border Radius" description="Consistent rounding scale. Smaller radii for compact elements, larger for cards and containers."><RadiusSection /></Section>
          <Section id="shadows" title="Shadows & Elevation" description="Dark mode shadows are deep and diffuse. Glow variants add brand presence to interactive elements."><ShadowsSection /></Section>
          <Section id="icons" title="Iconography" description="Lucide-style icon set at 24x24 viewbox, 2px stroke."><IconsSection /></Section>
          <Section id="motion" title="Motion & Animation" description="Consistent motion language. All animations use the same duration scale and easing curves."><MotionSection /></Section>
          <Section id="effects" title="Effects & Surfaces" description="Layering techniques for depth and visual interest. Glassmorphism, glow, blur, and shimmer effects."><EffectsSection /></Section>
          <Section id="gradients" title="Gradients" description="Predefined gradient presets for backgrounds, cards, and decorative elements."><GradientsSection /></Section>
          <Section id="buttons" title="Buttons" description="Five variants, three sizes. Primary commands attention, secondary offers alternatives, ghost recedes, danger warns."><ButtonsSection /></Section>
          <Section id="inputs" title="Inputs" description="Clean inputs with purple focus ring. Monospace variant for technical fields."><InputsSection /></Section>
          <Section id="select" title="Select & Dropdown" description="Custom dropdown with keyboard navigation. Purple focus ring matches input system."><SelectSection /></Section>
          <Section id="checkbox" title="Checkbox & Radio" description="Purple active state. Animated check/dot transition."><CheckboxSection /></Section>
          <Section id="toggle" title="Toggle / Switch" description="Binary settings. Purple glow when active."><ToggleSection /></Section>
          <Section id="badges" title="Badges" description="Compact status indicators. Six semantic variants with optional status dot."><BadgesSection /></Section>
          <Section id="avatars" title="Avatars" description="Initials with deterministic background color. Status indicators for presence."><AvatarsSection /></Section>
          <Section id="tooltips" title="Tooltips" description="Contextual hints on hover. Four positions."><TooltipsSection /></Section>
          <Section id="cards" title="Cards" description="Elevated containers with hover state. Border brightens on hover, subtle shadow appears."><CardsSection /></Section>
          <Section id="alerts" title="Alerts" description="Four semantic alert variants. Left icon, title, and description."><AlertsSection /></Section>
          <Section id="modal" title="Modal / Dialog" description="Centered dialog with backdrop blur. Used for destructive confirmations and focused workflows."><ModalSection /></Section>
          <Section id="tables" title="Tables" description="Data-dense tables with hover highlight, monospace IDs, and inline badges."><TablesSection /></Section>
          <Section id="tabs" title="Tabs" description="Segmented control for switching views. Active state has elevated background."><TabsSection /></Section>
          <Section id="breadcrumbs" title="Breadcrumbs" description="Path navigation with chevron separators. Last item is current page."><BreadcrumbsSection /></Section>
          <Section id="pagination" title="Pagination" description="Page navigation with prev/next and numbered pages."><PaginationSection /></Section>
          <Section id="progress" title="Progress & Skeleton" description="Progress bars for determinate loading. Skeleton loaders for content placeholders."><ProgressSection /></Section>
          <Section id="accordion" title="Accordion" description="Collapsible content sections. Smooth height animation."><AccordionSection /></Section>
          <Section id="tokens" title="Token Swap Guide" description="This design system is token-based. Swap the theme object, every component updates automatically."><TokensSection /></Section>
          <Section id="logo" title="Logo" description="The Acstane mark. Available in light and dark variants."><LogoSection /></Section>
          <Section id="brand-assets" title="Brand Assets" description="Business card, folder cover, and letterhead templates using the Acstane visual language."><BrandAssetsSection /></Section>
        </div>
      </main>
    </div>
  );
}
