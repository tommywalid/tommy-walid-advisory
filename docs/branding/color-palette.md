# Color Palette

Implemented as CSS custom properties in `src/app/globals.css` and exposed as Tailwind utilities (`bg-forest`, `text-gold`, etc.) via `@theme inline`.

## Primary Colors

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#FAF7F1` | Primary background (warm white) |
| `forest` | `#14261D` | Primary dark — header/footer bands, hero, primary buttons, headline text on light backgrounds |

## Secondary Colors

| Token | Hex | Usage |
|---|---|---|
| `beige` | `#EFE6D8` | Alternating section backgrounds |
| `beige-dark` | `#E0D0B4` | Borders, dividers, muted card outlines |
| `forest-light` | `#1F3A2A` | Hover state for dark surfaces |

## Accent Colors

| Token | Hex | Usage |
|---|---|---|
| `gold` | `#AD8A3F` | Primary accent — kickers, icons, links, primary CTA on dark backgrounds |
| `gold-light` | `#D8BD7F` | Accent on dark backgrounds (hover states, gold text on `forest`) |

## Text

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#201F1A` | Body text (warm near-black, not pure black) |
| `ink-soft` | `#5C5A50` | Secondary/muted text |

## Accessibility & Contrast

- `ink` on `cream` and `cream` on `forest` both exceed WCAG AA for body text.
- `gold` is used for accents, kickers, and icons — never as the sole carrier of body copy — since gold-on-cream contrast is decorative-grade, not body-text-grade.
- Focus states use a `gold` outline (`:focus-visible`) at 2px with offset, visible on both light and dark surfaces.
- Full accessibility audit (contrast ratios, colorblind simulation) is tracked in `docs/design/accessibility.md`.
