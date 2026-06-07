---
name: MindCraft Aesthetic
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  stat-value:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  card-gap: 16px
  section-margin: 40px
  inner-padding: 20px
---

## Brand & Style

The design system is centered on a "Digital Sanctuary" philosophy—creating a focused, tranquil, yet highly motivating environment for personal growth. It utilizes a refined **Glassmorphism** style that prioritizes legibility and depth over decorative clutter. 

The aesthetic is characterized by multi-layered translucent surfaces that feel like frosted glass floating over a kinetic gradient background. By blending high-fidelity glass effects with a clean, minimalist structural layout, the interface feels sophisticated and premium, encouraging users to treat their habit-building journey with intentionality. The emotional response should be one of "calm productivity."

## Colors

The color palette for this design system revolves around a sophisticated pairing of **Royal Purple** and **Electric Blue**. These two colors should primarily appear as mesh gradients in the background to provide a sense of depth behind the glass layers.

- **Primary & Secondary:** Used for active states, primary actions, and the "Glow" behind glass cards.
- **Success & Progress:** Emerald green is reserved for habit completion, while Sky Blue denotes active, ongoing progress.
- **Streak (Amber):** Used exclusively for high-energy momentum and "fire" streaks to create visual contrast against the cool-toned UI.
- **Neutral:** A deep Navy-Black is used for the base background to ensure the glass panels and vibrant gradients have maximum pop and readability.

## Typography

This design system utilizes **Inter** for all levels of the hierarchy to maintain a professional, systematic, and highly legible appearance. 

The typographic scale emphasizes high contrast between "Stat Values" and "Labels." Display headings should use tighter letter spacing to feel modern and "engineered," while body text maintains standard tracking for optimal readability against translucent backgrounds. Labels are often set in uppercase with slight tracking to differentiate them from interactive content.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a heavy reliance on safe margins and dynamic padding to maintain a "breathable" feel. 

A strict 8px spacing rhythm ensures consistency. Main containers utilize a 24px padding from the screen edge, while cards use a 16px gap to create clear separation. Information density is kept medium-to-low; generous whitespace is essential to prevent the glassmorphism effects from feeling cluttered or overwhelming. Sections are separated by significant vertical margins to clearly define different areas of the user's daily habit overview.

## Elevation & Depth

Hierarchy in this design system is achieved through **Backdrop Blurs** and **Ambient Tinted Shadows**. 

1. **Base Layer:** A deep neutral background with blurred purple/blue gradient orbs.
2. **Glass Level 1 (Cards):** 20px - 30px Backdrop Blur, 5% white opacity fill, and a 1px white border at 12% opacity.
3. **Glass Level 2 (Modals/Popovers):** 40px Backdrop Blur, 10% white opacity fill, and a soft shadow with a 30px blur radius, tinted with the primary purple color at very low (10%) opacity.

Shadows should never be pure black; they must be "ambient," inheriting the color of the background or the element itself to maintain the high-fidelity glass aesthetic.

## Shapes

The shape language is defined by **generous roundedness**. Standard UI elements like buttons and input fields utilize a 0.5rem (8px) radius. However, the primary "Habit Cards" and major containers must use the `rounded-xl` or `rounded-2xl` equivalents (1.5rem to 2rem) to emphasize the soft, modern, and approachable nature of the app. Interactive icons and small status chips should lean towards pill-shaped (fully rounded) geometries to contrast against the more structured rectangular cards.

## Components

- **Habit Cards:** These are the centerpiece. They feature the Glass Level 1 style with a generous 24px corner radius. They should include a subtle "inner glow" (top-left light source) to simulate physical glass.
- **Buttons:** Primary buttons should be a vibrant purple-to-blue linear gradient. Secondary buttons use the Glass Level 1 style with no fill, only a subtle border.
- **Progress Rings:** Use the "Progress Blue" token. These should have a "track" that is semi-transparent to allow the background gradients to peek through.
- **Streak Badges:** Pill-shaped elements using the "Streak Amber" color. When a streak is high, add a subtle outer glow (drop shadow) in the same amber hue.
- **Input Fields:** Semi-transparent glass backgrounds with a 1px border that brightens when focused.
- **Habit Lists:** Use vertical stacks of glass cards with 16px spacing. Avoid dividers; let the card boundaries and shadows define the separation.
- **Glass Chips:** Small, fully rounded indicators for categories (e.g., "Health", "Work") using 10% opacity fills of the primary or secondary colors.