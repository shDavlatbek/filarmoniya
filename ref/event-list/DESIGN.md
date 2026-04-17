# Design System: Aetheric Resonance

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Maestro"**

This design system is a study in the tension between classical formality and futuristic precision. It avoids the "template" look of modern web design by embracing **Architectural Brutalism**—defined by sharp 0px corners—and **Editorial Asymmetry**. 

We are not just building a website; we are composing a visual symphony. The interface acts as a high-end gallery space where information is "curated" rather than just displayed. By utilizing extreme typographic scales, overlapping brush-stroke textures, and a strict "No-Line" philosophy, we create a digital experience that feels as intentional and sophisticated as a live philharmonic performance.

## 2. Colors
The palette is rooted in high-chroma whites and sophisticated grays, punctuated by a deep, technological purple and a golden tertiary accent.

*   **Primary (`#5f5e5e`) & Secondary (`#853bb5`):** Use the secondary purple for artistic flourishes—specifically the brush-stroke overlays seen in the hero imagery. It represents the "soul" of the music against the "structure" of the gray primary tones.
*   **The "No-Line" Rule:** To maintain a premium, seamless feel, **1px solid borders are strictly prohibited** for sectioning. Structural boundaries must be defined through tonal shifts. For example, a `surface-container-low` section should sit directly against a `surface` background to create a soft, sophisticated edge.
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of physical layers. 
    *   Use `surface-container-lowest` (`#ffffff`) for the most prominent content cards.
    *   Nest these within `surface-container-low` (`#f2f4f6`) sections.
    *   This "paper-on-stone" layering creates depth without the clutter of lines.
*   **The Glass & Gradient Rule:** For the navigation bar and floating futuristic modules, use Glassmorphism. Apply `surface` colors at 70% opacity with a `20px` backdrop-blur. Use subtle linear gradients from `primary` to `primary-container` on high-action CTAs to provide a tactile, "lit-from-within" quality.

## 3. Typography
The typography system relies on a high-contrast pairing: **Space Grotesk** for technological precision and **Manrope** for formal elegance.

*   **Display & Headlines (Space Grotesk):** These should be treated as architectural elements. Use `display-lg` (3.5rem) for hero statements. The geometric nature of Space Grotesk provides the "futuristic" edge requested.
*   **Titles & Body (Manrope):** Manrope provides the "formal" counterbalance. Its humanist characteristics ensure readability and an approachable, high-end editorial feel.
*   **Intentional Scale:** Do not be afraid of "white space" (or in this case, "light gray space"). A small `label-md` in all-caps with `0.1em` letter spacing positioned near a massive `display-lg` title creates a signature, award-winning editorial rhythm.

## 4. Elevation & Depth
In this system, depth is achieved through **Tonal Layering** and **Atmospheric Perspective** rather than traditional dropshadows.

*   **The Layering Principle:** Depth is conveyed by stacking surface tokens. A `surface-container-highest` element feels "closer" to the user than a `surface-dim` element.
*   **Ambient Shadows:** If a floating element (like a modal or dropdown) requires a shadow, it must be nearly invisible. Use the `on-surface` color at 5% opacity with a `40px` blur and `0px` spread. It should look like a natural ambient occlusion, not a digital effect.
*   **The "Ghost Border" Fallback:** If a container requires definition against an identical color, use the `outline-variant` (`#acb3b8`) at **15% opacity**. This "Ghost Border" provides just enough hint of a container without breaking the "No-Line" rule.
*   **Artistic Overlays:** Incorporate the "brush-stroke" elements (using the `secondary` or `secondary-fixed-dim` colors) at low opacities (10-30%) behind text or overlapping image containers to disrupt the rigid grid and add "human" texture to the tech-focused layout.

## 5. Components

### Buttons
*   **Primary:** Sharp 0px corners. Background: `primary`. Text: `on-primary`. Transition: On hover, shift background to `secondary` with a `0.4s` ease-out.
*   **Tertiary (Editorial):** No background. Underline using a 2px stroke of `secondary` positioned 4px below the text.

### Cards & Lists
*   **Forbid Divider Lines:** Use `24px` or `32px` of vertical white space to separate list items. 
*   **Card Styling:** Use `surface-container-lowest` with 0px border-radius. Instead of a border, use a subtle `surface-variant` background shift on hover to indicate interactivity.

### Input Fields
*   **Styling:** Use a "Bottom Line Only" approach or a solid `surface-container-high` background.
*   **States:** On focus, the bottom border or background should transition to `secondary`. Labels should use `label-sm` and remain visible above the input to maintain the formal aesthetic.

### Artistic Overlays (Signature Component)
*   Create a component for "Brush Strokes." These are SVG overlays positioned absolutely. They should always break the container bounds—overlapping from a `surface` section into a `surface-container` section—to weave the layout together.

## 6. Do's and Don'ts

### Do:
*   **Do** use 0px border-radius on everything. The "formal" and "advanced" vibe comes from these sharp, architectural lines.
*   **Do** use dark overlays (using `inverse-surface` at 40-60% opacity) on hero images to ensure `inverse-primary` text remains passing for AAA accessibility.
*   **Do** embrace asymmetry. Position a headline on the left and the body copy on the far right of the grid to create a sophisticated, non-template look.

### Don't:
*   **Don't** use standard "Material Design" shadows. They feel too "app-like" and not "editorial" enough.
*   **Don't** use 1px solid borders to separate sections. It makes the site look like a budget wireframe.
*   **Don't** use rounded corners. Even a 2px radius will break the "Architectural" feel of this specific design system.
*   **Don't** crowd the content. If a section feels full, add 40px of extra padding. Premium design is defined by what you choose not to include.