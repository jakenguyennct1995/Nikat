# Design System Document: The Vibrant Curator

## 1. Overview & Creative North Star
The **Creative North Star** for this design system is **"The Vibrant Curator."** It moves away from the sterile "boxed-in" nature of traditional e-commerce to create an energetic, high-density environment that feels both authoritative and accessible. 

Rather than relying on a rigid grid of lines, this system utilizes **Tonal Depth and Kinetic Layers**. We treat the UI as an editorial experience where content is king. We break the "template" look by using intentional overlapping elements (e.g., product images breaking out of their containers) and sophisticated surface nesting to guide the eye through a dense information architecture without overwhelming the user.

## 2. Colors
Our palette is anchored by a high-energy `primary` orange, balanced by a sophisticated suite of "Warm Neutrals" that prevent the interface from feeling "cheap" or purely utilitarian.

### Palette Strategy
*   **The "No-Line" Rule:** 1px solid borders for sectioning are strictly prohibited. Section boundaries must be achieved through background color shifts. For example, a `surface-container-low` (#ffedeb) product grid should sit directly on a `surface` (#fff4f3) background.
*   **Surface Hierarchy & Nesting:** Use surface tiers to create "pods" of information. 
    *   **Level 0 (Background):** `surface` (#fff4f3)
    *   **Level 1 (Sub-sections):** `surface-container-low` (#ffedeb)
    *   **Level 2 (Active Cards):** `surface-container-lowest` (#ffffff)
*   **The Glass & Gradient Rule:** For the header and primary promotional banners, use a subtle linear gradient from `primary` (#a83206) to `primary-container` (#ff784e). This provides a "soulful" depth that flat hex codes lack. Floating elements, such as the "LIVE" indicator or mini-cart, should utilize a glassmorphism effect: `surface` at 80% opacity with a `20px` backdrop-blur.

## 3. Typography
We use **Plus Jakarta Sans** to bridge the gap between commercial efficiency and premium editorial design.

*   **Display (Display-LG to SM):** Reserved for hero banners and major promotions. Use `-0.02em` letter spacing to give it an authoritative, "tight" look.
*   **Headlines & Titles:** Set in Bold. These are the anchors of our high-density layout. They use `on-surface` (#4e2120) to maintain high contrast and trustworthiness.
*   **Body (Body-LG to SM):** Optimized for readability in dense lists. Use `body-md` (#834c4a) for descriptions to create a soft hierarchy against the darker titles.
*   **Labels:** Used for "MUA NGAY" (Buy Now) and category tags. These should always be uppercase with `+0.05em` tracking for a refined, intentional feel.

## 4. Elevation & Depth
Depth is a functional tool, not a decoration. We avoid heavy, artificial drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Soft lift is achieved by stacking. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural, physical separation.
*   **Ambient Shadows:** Use only for floating elements (like the search dropdown or mobile navigation). 
    *   *Shadow:* `0px 12px 32px rgba(78, 33, 32, 0.08)` (A tint of our `on-surface` color).
*   **The "Ghost Border" Fallback:** If a container requires further definition (e.g., an input field), use the `outline-variant` (#e09c98) at **15% opacity**. Never use 100% opaque borders.
*   **Glassmorphism:** Navigation bars that stick to the top during scroll should use the `surface` color with 85% opacity and a `backdrop-filter: blur(12px)` to maintain the user's context of the content beneath.

## 5. Components

### Buttons
*   **Primary ("MUA NGAY"):** Rounded `lg` (1rem). Background uses the signature orange gradient. Text is `on-primary` (#ffefeb), Bold, Uppercase.
*   **Secondary:** `surface-container-lowest` background with a `ghost border`. 
*   **Interaction:** On hover, primary buttons should scale slightly (1.02x) rather than just changing color, reinforcing the "energetic" brand pillar.

### Search Bar (Header)
*   A high-density "Command Center." Use `surface-container-lowest` with a `xl` (1.5rem) roundedness. 
*   The search button should be integrated into the bar using `primary` (#a83206) to draw immediate focus.

### Cards (Product & Promo)
*   **Rules:** No dividers. Use `md` (0.75rem) corner radius.
*   **Promotional Banners:** Images should use a "Break-out" style, where the pet or product image overflows the container's visual bounds to create a 3D effect.

### Input Fields
*   Use `surface-container-low` for the field background. Labels use `label-md` in `on-surface-variant`.
*   **Error State:** Border becomes `error` (#b31b25) at 40% opacity, with helper text in `error`.

### Category Navigation
*   A horizontal scrolling bar below the header. Active states are indicated by a `primary` pill background; inactive states are transparent with `on-surface` text.

## 6. Do's and Don'ts

### Do
*   **Do** use high-density layouts; pack information tightly but organize it using surface color shifts.
*   **Do** use the `primary-fixed` (#ff784e) for accent highlights to keep the energy high.
*   **Do** ensure all images have a consistent warm temperature to match the `background` (#fff4f3).
*   **Do** use "Plus Jakarta Sans" weight variants (Medium to Bold) to differentiate information instead of adding more colors.

### Don't
*   **Don't** use 1px solid black or grey borders. Use background tonal shifts or "Ghost Borders."
*   **Don't** use sharp corners (`none`). Use the `DEFAULT` (0.5rem) or `lg` (1rem) for a friendly, trustworthy feel.
*   **Don't** use pure white (#FFFFFF) for the main page background; always use `surface` (#fff4f3) to maintain the premium, "paper-like" warmth.
*   **Don't** clutter the header with too many colors; keep the focus on the search bar and the `primary` orange action areas.