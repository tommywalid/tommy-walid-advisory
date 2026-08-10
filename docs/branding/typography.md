# Typography

## Primary Typeface

**Fraunces** (variable serif, optical sizing enabled) — used for all headings (`h1`–`h4`, section titles, card titles). Chosen for its warm, editorial, "family office" character: a serif with enough presence to feel established without tipping into ornate/luxury cliché.

Implemented via `next/font/google`, exposed as the `--font-heading` CSS variable and the `font-heading` Tailwind utility.

## Secondary Typeface

**Inter** — used for all body copy, navigation, buttons, and form fields. Chosen for legibility at small sizes, extensive language coverage (including French accented characters), and neutrality alongside the more expressive heading serif.

Implemented via `next/font/google`, exposed as the `--font-sans` CSS variable (Tailwind's default `font-sans`).

## Type Scale

Uses Tailwind's default fluid type scale (`text-sm` through `text-6xl`), applied contextually rather than a bespoke scale:

- Hero title: `text-4xl` → `text-6xl` (responsive)
- Section titles: `text-3xl` / `text-4xl`
- Card/step titles: `text-lg`
- Body: `text-sm` / `text-base`
- Kickers/eyebrows: `text-xs`, uppercase, wide tracking (`tracking-[0.28em]`)

## Multilingual Typography (Latin & Arabic)

Both current typefaces (Fraunces, Inter) cover Latin script with full French diacritic support. Neither includes Arabic glyphs — an Arabic-appropriate pairing (and RTL layout mirroring) will need to be selected when Arabic support is scoped; see `docs/design/multilingual-rtl-design.md`.
