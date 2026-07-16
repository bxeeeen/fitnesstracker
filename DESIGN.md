---
name: Fitnesstracker
description: A warm, inviting, light-only progress ledger for gym strength training, with a blue-to-green brand gradient and liquid-glass surfaces.
colors:
  lavender: "#C5D1EB"
  powder-blue: "#92AFD7"
  blue-slate: "#5A7684"
  granite: "#395B50"
  evergreen: "#1F2F16"
  off-white: "#FAF8F3"
  surface-white: "#FFFFFF"
  danger: "#B3433A"
typography:
  display:
    fontFamily: "Instrument Serif, Inter, system-ui, serif"
    fontSize: "2.2rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "10px"
  md: "12px"
  lg: "16px"
  xl: "20px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.blue-slate}, {colors.granite})"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.evergreen}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  card-glass:
    backgroundColor: "rgba(255,255,255,0.55)"
    textColor: "{colors.evergreen}"
    rounded: "{rounded.lg}"
    padding: "16px"
  tile-selected:
    backgroundColor: "linear-gradient(135deg, {colors.blue-slate}, {colors.granite})"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
  tile-unselected:
    backgroundColor: "rgba(255,255,255,0.55)"
    textColor: "{colors.evergreen}"
    rounded: "{rounded.lg}"
---

# Design System: Fitnesstracker

## 1. Overview

**Creative North Star: "The Warm Glass Ledger"**

Fitnesstracker's second design pass moves deliberately away from its first identity ("The Progress Ledger," dark-by-default, Void Black + Electric Blue). This system keeps the same job — a precise, unshowy record of getting stronger — but asks it to feel welcoming instead of technical. The canvas is a warm off-white (#FAF8F3), never stark white and never dark. Every surface that used to be a flat bordered card is now liquid glass: translucent, soft-edged, gently blurred, with a hue-tinted shadow instead of a hard black one. The brand color is no longer a single electric accent but a five-step blue-to-green family (Lavender → Powder Blue → Blue Slate → Granite → Evergreen) that reads as one continuous, calming gradient rather than five separate colors.

This system explicitly rejects: the cluttered multi-metric fitness-app look (steps, sleep, calories, social feeds, workout-category tabs), and its own former dark-mode identity — this is a light-only app now, by deliberate choice, not an oversight.

**Key Characteristics:**
- Warm off-white canvas, light-only — no dark mode
- Liquid-glass surfaces everywhere a card or tile would otherwise sit flat: translucent white, blurred, softly shadowed, with an inner highlight edge
- One locked accent family (the five-color blue-to-green gradient), never mixed with an unrelated hue
- A serif display face (Instrument Serif, explicitly brand-chosen) for numbers and headings that matter, paired with plain-spoken Inter for everything functional
- Calm, precise interaction — feedback is clear but never loud

## 2. Colors

Five colors, one family, running light-to-dark and cool-to-warm: Lavender, the lightest and coolest, through Powder Blue and Blue Slate, into Granite and Evergreen, the deepest and most grounded. Locked per the One-Palette rule — no color outside this family appears as a brand accent anywhere in the app.

### Primary
- **Blue Slate** (#5A7684): the anchor accent. Start of the primary gradient, used for buttons, selected tiles, the chart line, the active nav icon.
- **Granite** (#395B50): the gradient's deep end, always paired with Blue Slate at 135°. Also does double duty as the "success" / positive-change color (a rising weight number), so the app never needs to borrow an unrelated green.

### Secondary
- **Lavender** (#C5D1EB) and **Powder Blue** (#92AFD7): the lightest members of the family. Reserved for soft tints — text selection accents, subtle highlight washes — never as a button background, since neither clears WCAG AA contrast with white text (verified: Powder Blue + white text ≈ 2.25:1, well under the 3:1 minimum for large bold text).
- **Evergreen** (#1F2F16): the deepest member. Doubles as the app's heading-text color instead of a generic near-black — every `h1`/`h3` and every serif stat number is Evergreen, not gray or black.

### Neutral
- **Off-White** (#FAF8F3): the canvas. Warm, not stark — chosen specifically so the app reads as inviting rather than clinical.
- **Surface White** (#FFFFFF): the solid background for functional controls (text inputs, selects) that need full opacity for legibility. Glass surfaces are translucent versions of this same white, not a different neutral.
- **Danger** (#B3433A): a warmed brick-red for delete actions only, deliberately less clinical than a pure saturated red, so it stays inside the app's warm-inviting register even as a warning color.

### Named Rules
**The One Family Rule.** Every accent in the app — buttons, selected states, the chart, the active nav icon, even the "success" indicator — draws from the same five-color family. No unrelated hue (a generic green for success, a generic red-adjacent orange for warnings beyond delete) is ever introduced.
**The Contrast-Checked Gradient Rule.** The primary gradient runs Blue Slate → Granite, not Lavender or Powder Blue, specifically because the lighter two colors fail white-text contrast. Never swap the gradient's start color for a lighter family member without re-checking contrast.

## 3. Typography

**Display Font:** Instrument Serif (with Inter, system-ui, serif fallback) — explicitly brand-chosen, not a default reach.
**Body Font:** Inter (with system-ui, Segoe UI, sans-serif fallback)

**Character:** A quiet, editorial serif for the numbers and words that deserve a moment — greetings, page titles, the weight on a stat card — paired with a completely unornamented sans for every functional surface. Against the new warm, light background this pairing reads as calm and considered rather than cold and technical.

### Hierarchy
- **Display** (400, 2rem, 1.2 line-height, Evergreen): page titles (`h1`) and the greeting headline.
- **Headline** (400, 1.2rem, 1.3 line-height, Evergreen): section headings (`h3`) — muscle-group labels, "Eigene Übung hinzufügen."
- **Title** (400, 1.2–1.4rem, Instrument Serif, Evergreen): stat-card values and the logged weight in history cards.
- **Body** (400, 1rem, 1.5 line-height, Inter): all form labels, inputs, buttons, running text.
- **Label** (500–600, 0.7–0.9rem, Inter): stat labels, nav labels, badges.

### Named Rules
**The Serif-Is-Earned Rule.** Instrument Serif only renders numbers or headings that represent a milestone or a title — never a button, a form label, or a badge.

## 4. Elevation

The opposite of the first design's "No-Shadow Rule." Liquid glass requires real elevation to read as glass: every glass surface (`.card`, `.tile`, `.auth-form`, `.stat-card`, the bottom nav) carries a soft, hue-tinted shadow (`0 8px 32px rgba(90,118,132,0.16)`) plus an inset top highlight (`inset 0 1px 0 rgba(255,255,255,0.6)`) that reads as light catching a glass edge. Shadows are never pure black — always tinted toward Blue Slate, the cool anchor of the palette, so they read as atmosphere rather than a heavy drop shadow.

### Shadow Vocabulary
- **Glass elevation** (`0 8px 32px rgba(90,118,132,0.16), inset 0 1px 0 rgba(255,255,255,0.6)`): the default for every glass surface.
- **Selected-tile glow** (`0 8px 24px rgba(57,91,80,0.28)`): a deeper, Granite-tinted shadow under a selected exercise tile, reinforcing the gradient fill with real lift.
- **Slider-thumb shadow** (`0 2px 6px rgba(90,118,132,0.4)`): the one small, tight shadow for a draggable control, tinted to match.

### Named Rules
**The Tinted-Shadow Rule.** No shadow in this system is pure black. Every shadow's rgba uses Blue Slate or Granite as its color channel, so elevation reads as part of the same warm, cohesive palette rather than a generic UI-kit default.
**The Reduced-Transparency Fallback Rule.** Every glass surface has a `prefers-reduced-transparency` fallback that swaps translucency for a solid white fill and a plain hairline border — the glass effect is a preference, not a requirement for the app to be legible.

## 5. Components

### Buttons
- **Shape:** 12px corner radius (`{rounded.md}`), consistent with the rest of the app's radius scale.
- **Primary:** Blue-Slate-to-Granite gradient, white text, 12px/18px padding. One primary action per screen.
- **Secondary:** solid white background, Evergreen text, hairline border. Never glass — buttons stay opaque and solid so tap targets are unambiguous even on a busy glass background.
- **Disabled:** 60% opacity, cursor default, no transform on press.

### Liquid Glass Cards & Tiles
- **Corner Style:** 16px radius (`{rounded.lg}`), matching cards throughout.
- **Background:** `rgba(255,255,255,0.55)`, `backdrop-filter: blur(20px)`.
- **Border:** a soft, near-white inner highlight (`rgba(255,255,255,0.65)`) rather than a plain gray hairline — part of the glass illusion, not a structural line.
- **Elevation:** see Section 4's glass shadow.
- **Selected state (tiles only):** the translucent glass background crossfades to the full Blue-Slate-to-Granite gradient via an opacity-animated overlay (gradients can't be CSS-transitioned directly, so the selected state is a separate layer that fades in). White text, transparent border, deeper Granite-tinted shadow.
- **Fallback:** solid white + hairline border under `prefers-reduced-transparency`.

### Inputs / Sliders
- **Text/date/select inputs:** solid white background (not glass — legibility over aesthetic here), hairline border, 10px radius.
- **Sliders:** flat 6px track in the hairline border color, gradient-filled circular thumb (22px) with a tinted shadow, scales up slightly on `:active` for tactile feedback.

### Navigation
- **Bottom nav:** fixed to the viewport bottom, translucent white (`rgba(255,255,255,0.68)`), 24px backdrop blur, soft upward-tinted shadow instead of a hard top border alone. Three items (Home, Fortschritt, Ich). Active item's icon and label shift to Blue Slate.

## 6. Do's and Don'ts

### Do:
- **Do** keep every accent — buttons, selected tiles, chart, active nav, success indicator — inside the five-color Lavender-to-Evergreen family. No outside hue.
- **Do** use Blue Slate → Granite (never Lavender or Powder Blue) for any surface that needs white text on top of the gradient.
- **Do** tint every shadow toward Blue Slate or Granite — never a plain black drop shadow.
- **Do** keep buttons and form inputs solid and opaque even while cards and tiles are glass — legibility of interactive controls outranks the glass aesthetic.
- **Do** provide a `prefers-reduced-transparency` solid-fill fallback on every glass surface.

### Don't:
- **Don't** reintroduce dark mode. This app is light-only by deliberate decision, not by omission — a `prefers-color-scheme: dark` override would contradict the current brand direction.
- **Don't** use Powder Blue or Lavender as a button or tile-selected background — both fail WCAG AA contrast with white text.
- **Don't** add steps, sleep, calories, hydration, or a social/friends feed — this system rejects the cluttered multi-metric fitness-app look on principle.
- **Don't** use Instrument Serif for buttons, labels, badges, or any functional chrome.
- **Don't** apply a pure-black or ungraded gray shadow anywhere — every shadow in this system is hue-tinted.
