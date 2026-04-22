# Design Brief

## Direction

**Professional Data-Focused Dashboard** — A trustworthy, information-dense interface for educational institutions to track student performance at scale.

## Tone

Brutally minimal with restrained color. Let data speak; remove all decoration. Cool blue anchors trust; secondary palette emphasizes semantic meaning (green = success, amber = warning, red = error).

## Differentiation

Elevated surface treatment across structural zones (header, cards, sections) creates clear visual hierarchy without ornamentation, enabling teachers to scan performance data in seconds.

## Color Palette

| Token           | Light OKLCH      | Dark OKLCH      | Role                                   |
| --------------- | ---------------- | --------------- | -------------------------------------- |
| background      | 0.98 0 0         | 0.11 0 0        | Page base, spacious breathing room     |
| foreground      | 0.16 0 0         | 0.93 0 0        | Body text, high contrast               |
| card            | 1.0 0 0          | 0.155 0 0       | Content containers, elevated           |
| primary         | 0.51 0.18 262    | 0.71 0.2 262    | Buttons, active states, trust signal  |
| accent          | 0.51 0.18 262    | 0.71 0.2 262    | Highlights, focus rings                |
| muted           | 0.92 0 0         | 0.19 0 0        | Disabled states, secondary text        |
| destructive     | 0.54 0.18 21     | 0.65 0.22 25    | Delete/error actions                   |
| chart-1         | 0.58 0.21 262    | 0.74 0.21 262   | Primary metric (blue)                  |
| chart-2         | 0.65 0.19 118    | 0.68 0.19 118   | Secondary metric (teal/green)          |
| chart-3         | 0.59 0.19 147    | 0.71 0.19 147   | Tertiary metric (green)                |
| chart-4         | 0.72 0.2 40      | 0.55 0.2 40     | Warm accent (amber)                    |
| chart-5         | 0.62 0.2 25      | 0.62 0.2 25     | Alert/warning (red)                    |

## Typography

- **Display**: General Sans — clean hierarchy in headers, titles, metric labels. Weights: 500/600 for emphasis, 400 for balance.
- **Body**: General Sans — efficient text for descriptions, table data, form labels. Weight 400 with generous leading (1.5–1.6).
- **Mono**: Geist Mono — performance numbers, timestamps, student IDs in tables.
- **Scale**: h1 text-3xl/4xl, h2 text-2xl, label text-xs/sm uppercase tracking, body text-base leading-relaxed.

## Elevation & Depth

Cards use `border border-border` + `shadow-sm` to create contained elevation. Dark mode sustains visual depth by lightening card backgrounds incrementally. Section separators use subtle borders (border-border) rather than shadows.

## Structural Zones

| Zone              | Background         | Border            | Notes                                   |
| ----------------- | ------------------ | ----------------- | --------------------------------------- |
| Header            | bg-card            | border-b          | Sticky nav + branding, elevated         |
| Sidebar (Nav)     | bg-sidebar         | border-r          | Primary navigation, accent on active    |
| Main Content      | bg-background      | —                 | Spacious, allows breathing room         |
| Card (Data)       | bg-card            | border             | Data containers, subtle shadow          |
| Upload Zone       | bg-background      | border-dashed     | File drop area, active/error states     |
| Table             | bg-card            | border             | Striped rows (muted/20), clear headers  |
| CO Analysis       | bg-card            | border             | CO metrics with tiles and charts        |
| Section Divider   | bg-muted/20        | border-t/border-b | Subtle rhythm breaks                    |
| Footer/Status     | bg-muted/10        | border-t          | Secondary info, muted text              |

## Spacing & Rhythm

Sections spaced 4rem apart (gap-16). Cards within sections use 1.5rem padding (p-6). Row gaps in tables are 0.5rem. Data elements (labels + values) paired with 0.75rem (gap-3). Micro-spacing (text-button distance) is 0.5rem (gap-2).

## Component Patterns

- **Buttons**: Primary `bg-primary text-primary-foreground` with hover opacity, secondary `border border-border` with fill on hover, destructive `bg-destructive` with warning color.
- **Cards**: 8px radius (rounded-md), `border border-border`, light shadow-sm, 1.5rem padding. Dark mode uses slightly lighter background for card-in-card nesting.
- **Badges**: 4px radius (rounded-sm), semantic colors (success-green, warning-amber, error-red), uppercase label, 0.5rem padding.
- **Tables**: Header `font-semibold`, striped rows (odd: `bg-muted/20`), hover row highlight `bg-primary/5`, monospace numbers for alignment.
- **Upload Zone**: Dashed border, 2px width, rounded-lg, 2rem padding. Active state: `bg-primary/5 border-primary`. Error state: `bg-destructive/5 border-destructive`. Status badges use chart colors (success=chart-2, warning=chart-4, error=chart-5).
- **CO Attainment Tiles**: Card-elevated containers with CO label, metric value (monospace), and attainment level indicator using chart palette.

## Motion

- **Entrance**: Page load uses fade-in (opacity 0→1) staggered 50ms per element. No scale distortion.
- **Hover**: Interactive elements (buttons, rows, cards) shift background-color 150ms cubic-bezier(0.4, 0, 0.2, 1). No bounce.
- **Decorative**: Chart data animations fade-in 300ms on load. Table row expansion slides down 200ms. No parallax.

## Constraints

- No gradients, skeuomorphism, or glassmorphism. Flat surfaces only.
- Color reserved for semantic meaning (status, action, hierarchy) — never purely decorative.
- Typography: max 2 font families, 3–4 size tiers, consistent weight usage (400 body, 500–600 headers/labels).
- No more than 2 prominent colors per page (primary + 1 semantic). Blue is primary across all pages; semantic colors (green/amber/red) appear only in status/charts.

## Signature Detail

**Elevated surface treatment across every structural zone** (header border-b, card border + shadow-sm, section borders) creates visual hierarchy purely through elevation, not color or decoration—enabling teachers to scan performance data in seconds without cognitive overload.

