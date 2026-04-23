# Design System: The Obsidian Concierge

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Maître d’"**
This design system is not a dashboard; it is a high-end service environment. Moving away from the cluttered, "utility-first" look of standard admin portals, this system adopts a **High-End Editorial** aesthetic. It prioritizes the feeling of an exclusive digital concierge service through intentional asymmetry, dramatic typographic scale, and a focus on tonal depth over structural lines.

The interface should feel like a private lounge—quiet, authoritative, and meticulously organized. We break the "template" look by utilizing generous negative space (luxury’s greatest currency) and overlapping elements that suggest a tactile, layered physical space rather than a flat digital screen.

---

## 2. Colors

The palette is anchored in the deep, obsidian tones of the luxury automotive world, punctuated by the "liquid metal" glow of the brand’s signature gold and bronze accents.

### Color Tokens (Material Design Mapping)
*   **Surface (Base):** `#131313` (The primary canvas)
*   **Primary (Gold):** `#e6c364` | **Container:** `#c9a84c`
*   **Secondary (Bronze):** `#e7c188` | **Container:** `#5c4215`
*   **Surface Containers:** Range from `#0e0e0e` (Lowest) to `#353534` (Highest)

### The "No-Line" Rule
Standard UI borders are prohibited. In this system, sections and functional zones are defined exclusively through **Background Color Shifts**. To separate a sidebar from a main content area, place a `surface-container-low` panel against a `surface` background. The eye should perceive boundaries through light and value transitions, never through a 1px stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
*   **Level 0 (Backdrop):** `surface-container-lowest` (#0e0e0e).
*   **Level 1 (Main Content):** `surface` (#131313).
*   **Level 2 (Interactive Cards):** `surface-container-low` (#1c1b1b).
*   **Level 3 (Pop-overs/Modals):** `surface-container-highest` (#353534).

### The "Glass & Gradient" Rule
To evoke the premium feel of a luxury vehicle dashboard, use **Glassmorphism** for floating elements (e.g., global navigation or quick-action menus). Apply `surface-variant` with a 40% opacity and a 20px `backdrop-blur`. 
**Signature Texture:** Main Action buttons must use a subtle linear gradient (Primary to Primary-Container) at a 135-degree angle to mimic the reflective quality of polished gold.

---

## 3. Typography

The typography strategy pairs the timeless elegance of **Playfair Display** with the modern, geometric precision of **DM Sans**.

*   **Display & Headlines (Playfair Display):** These are your "Editorial Voices." Use large-scale `display-lg` for welcome messages or total revenue figures. The high-contrast serifs convey heritage and exclusivity. Use italics sparingly for emphasis to create a "Signature" feel.
*   **UI & Body (DM Sans):** These are your "Functional Voices." Used for all data entry, navigation, and body text. DM Sans provides the clarity required for complex chauffeur scheduling without competing with the elegance of the headings.
*   **Labels:** All `label-sm` elements should use DM Sans with a `+0.05em` letter-spacing and uppercase transform to evoke a sense of high-end branding found on luxury goods.

---

## 4. Elevation & Depth

We avoid the "pasted-on" look of traditional shadows by utilizing **Tonal Layering** and **Ambient Light**.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-low` card sitting on a `surface` background creates a natural "lift."
*   **Ambient Shadows:** For floating elements (like a driver profile modal), use a shadow with a blur radius of 40px and a 6% opacity. The shadow color should not be black, but a tinted version of `on-surface` (#e5e2e1) to simulate light reflecting off a premium surface.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. This creates a "breath" of a line rather than a hard edge.
*   **Backdrop Blur:** Use a `12px` to `20px` blur on all overlays to ensure the obsidian background bleeds through, keeping the layout feeling unified and atmospheric.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (Primary to Primary-Container), `md` (0.375rem) roundedness. Typography: DM Sans Bold.
*   **Secondary:** Ghost style. No background, `outline-variant` (15% opacity) border, Gold text.
*   **Tertiary:** No border or background. Gold text with a subtle underline that expands on hover.

### Input Fields
*   **Style:** Abandon the 4-sided box. Use a "Soft Underline" approach or a `surface-container-high` background with only a bottom-weighted accent.
*   **States:** On focus, the bottom accent transitions from `outline` to `primary` (Gold) with a subtle glow (2px outer blur).

### Cards & Lists (The Chauffeur Queue)
*   **Layout:** Forbid divider lines. Separate "Upcoming Trips" from "Completed Trips" using 48px of vertical whitespace.
*   **Interaction:** On hover, a card should shift from `surface-container-low` to `surface-container-high` and scale by 1.01% to provide a tactile "Executive" response.

### Premium Components
*   **The Status Indicator:** Instead of a standard green dot, use a "Pulse" effect—a gold ring that slowly breathes around the driver’s avatar when active.
*   **The Golden Path:** In map views, route lines should be `primary` (Gold) with a `1px` bronze outer glow to distinguish them from standard map data.

---

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace as a functional element. High-end services are never "crowded."
*   **DO** use Playfair Display for "Impact Data" (e.g., Monthly Growth %).
*   **DO** ensure that gold accents are used sparingly. Gold is a highlight, not a flood.

### Don't
*   **DON'T** use 100% opaque white text. Use `on-surface` (#e5e2e1) to keep the dark mode easy on the eyes during late-night admin shifts.
*   **DON'T** use standard Material Design drop shadows. They look "cheap" in a luxury context.
*   **DON'T** use 1px solid borders to separate dashboard modules. Trust the background color shifts.
*   **DON'T** use standard "Success Green." Use a muted Emerald or stick to Gold to maintain the brand's exclusive color story.

---
*End of Document*