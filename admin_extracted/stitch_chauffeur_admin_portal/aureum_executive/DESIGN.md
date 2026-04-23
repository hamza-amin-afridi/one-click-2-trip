# Design System: The Midnight Concierge

## 1. Overview & Creative North Star
This design system is built to evoke the feeling of a high-end, private members' club. In the world of luxury chauffeur services, the portal should not feel like a "database," but rather a bespoke digital cockpit. 

**Creative North Star: "The Digital Concierge"**
Our aesthetic rejects the cluttered "SaaS-standard" look. We prioritize **intentional asymmetry**, where large editorial typography meets high-contrast, dark surfaces. By utilizing wide tracking, generous white space (which we treat as a luxury commodity), and tonal layering, we create an interface that feels quiet, authoritative, and expensive.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the interplay between deep obsidians and the warmth of refined gold.

### The Palette
- **Primary (The Gold Standard):** `#e6c364` (Primary) and `#c9a84c` (Primary Container). This color is used for "moments of intent"—CTAs, active states, and critical highlights.
- **Backgrounds:** `#131313` (Surface). A near-black that prevents the "harshness" of true `#000000` while maintaining deep contrast.
- **Neutrals:** A scale from `surface_container_lowest` (#0e0e0e) to `surface_bright` (#3a3939) provides the tonal range needed to define space without lines.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. In this design system, boundaries are created through **Background Color Shifts**. 
- To separate a sidebar from a main content area, use `surface_container_low` against a `surface` background.
- If a section needs emphasis, nest a `surface_container_high` element within a `surface_container_low` parent.

### The "Glass & Gradient" Rule
To move beyond a flat UI, primary buttons and hero cards should utilize a **Signature Texture**. Instead of a flat gold, use a subtle linear gradient: `linear-gradient(135deg, #e6c364 0%, #c9a84c 100%)`.
For floating panels (e.g., flight trackers or chauffeur status overlays), use **Glassmorphism**: 
- Background: `surface_variant` at 60% opacity.
- Effect: `backdrop-blur: 12px`.

---

## 3. Typography: Editorial Authority
We pair the timeless elegance of a serif with the modern precision of a geometric sans-serif.

- **Display & Headlines (Playfair Display / Noto Serif):** Used for data storytelling. A "Revenue" figure should be in `display-lg`, treated like a headline in a luxury magazine.
- **UI & Body (DM Sans / Manrope):** Used for all functional elements. We use `body-md` for standard text and `label-sm` with 0.05em letter-spacing for metadata to maintain a "technical" but premium feel.
- **Hierarchy through Contrast:** Use `on_surface` for primary text and `on_surface_variant` for secondary info. This 20% drop in contrast creates immediate visual hierarchy without the need for bolding everything.

---

## 4. Elevation & Depth
In a dark-first system, traditional shadows are often invisible. We use **Tonal Layering** and **Ambient Glows**.

- **The Layering Principle:** 
    1. Base: `surface` (#131313)
    2. Section: `surface_container_low` (#1c1b1b)
    3. Card/Component: `surface_container_high` (#2a2a2a)
- **Ambient Shadows:** For floating elements, use a shadow with a 40px blur, 0px offset, and 4% opacity using the `on_surface` color. This creates a soft "aura" that feels like a physical object catching light.
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in input fields), use the `outline_variant` token at **20% opacity**. It should be a suggestion of a line, not a hard barrier.

---

## 5. Components

### Buttons
- **Primary:** Gold gradient, `on_primary` text (deep brown/black), 6px radius. No border.
- **Secondary:** `surface_container_highest` background with `primary` text. Provides contrast without competing with the primary action.
- **Tertiary:** Ghost style. No background, `on_surface_variant` text, shifting to `on_surface` on hover.

### Cards & Lists
- **Rule:** Absolute prohibition of divider lines between list items. 
- **Execution:** Use 16px or 24px vertical padding (from the spacing scale) to separate items. For lists of "Live Trips," use a subtle background hover state (`surface_container_highest`) to define the row.

### Input Fields
- **Styling:** Use `surface_container_lowest` for the field background. 
- **Active State:** Instead of a thick border, use a 1px "Ghost Border" of `primary` and a 2px bottom-accent in Gold.

### Chips (Status Tags)
- **Luxury Status:** For "In Transit" or "Confirmed," use a low-saturation version of the status color.
- **Style:** `surface_container_highest` background with a small 6px dot of the status color (e.g., `primary` for Gold/Premium) and `label-md` text.

### Tooltips
- **Styling:** `surface_container_highest` with 90% opacity and a subtle `outline_variant` ghost border. They should feel like small, floating glass shards.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts. A left-aligned headline with a right-aligned CTA creates a sophisticated, editorial "white space."
- **Do** use the gold `primary` color as a "surgical" accent. If everything is gold, nothing is luxury.
- **Do** use `6px` (md) radius consistently for a "sharp but approachable" tailored look.

### Don't
- **Don't** use 100% opaque, high-contrast borders. It breaks the "Midnight" immersion.
- **Don't** use standard "Success Green" or "Warning Orange" at full saturation. Mute them to fit the dark theme (e.g., use `tertiary` for a sophisticated blue/purple status).
- **Don't** crowd the interface. If a screen feels busy, increase the padding by two steps on the spacing scale. Luxury is the ability to breathe.