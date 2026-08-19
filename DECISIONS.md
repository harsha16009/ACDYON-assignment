# Technical Decisions and Design Choices — CulturaSphere

This document explains the technical architecture, layout decisions, trade-offs, and verification steps taken for the CulturaSphere frontend challenge.

---

## 1. Design & Architecture Strategy

*   **Ivory/Warm Heritage Aesthetic**: Instead of a generic tech-startup dark theme, we used a warm, light-ivory background (`#FAF6F0`) and dark brown-charcoal text (`#2D251E`) from Photo 1. This styling matches the historical theme of the platform. We combined it with a warm orange terracotta accent (`#E27D2C`).
*   **Dual Theme CSS Variables**: To support both Light and Dark modes without separate style sheets, we defined `:root` and `[data-theme="dark"]` CSS variables in `src/index.css`. These are mapped directly to Tailwind's color config (`theme-bg`, `theme-text`, etc.), enabling seamless dynamic rendering.
*   **Performance-First Inline SVG Map**: Rather than loading external map libraries (e.g. Mapbox, Leaflet) which bloat the javascript bundle and trigger layout shifts, we designed a responsive inline SVG representing key cultural regions. It has 0 extra dependencies and triggers instant state-filtering in React.
*   **Restrained GPU Motion**: Framer Motion is configured to animate only `transform: translateY` and `opacity` properties. This prevents layout recalculations and repaints, ensuring high frame rates on both mobile and desktop.

---

## 2. Time-Constrained Trade-Offs

*   **Virtual QR Scanner Simulator vs. Camera Webcams**: Due to time constraints, we simulated the QR scanner by letting users select or input pre-defined tags (e.g. `KH-101`) to unlock audio guides and local diaries.
    *   *With a real week*: We would integrate a camera stream scanner using a library like `html5-qrcode` to scan physical QR codes printed at actual monument sites, enabling a real-world museum engagement demo. We would also implement a serverless database backend to persist submitted traveler stories across sessions.

---

## 3. AI Usage and Personal Verification

*   **Scaffolding & Seed Data**: AI tools were utilized to generate the structural arrays for monument data and historical eras, as well as baseline Tailwind settings.
*   **Manual Developer Verification Checklist**:
    1.  **Contrast Compliance**: Verified that the dark charcoal text (`#2D251E`) on warm cream (`#FAF6F0`) yields a contrast ratio of > 10:1, exceeding the WCAG AAA standard.
    2.  **Responsiveness (390px - 1440px)**: Inspected the page on mobile and desktop layout viewports, ensuring zero horizontal scroll, clipping, or overlapping items.
    3.  **Keyboard Accessibility**: Audited interactive tabs, buttons, and forms. Verified that the custom outline indicator (`focus-visible:ring-2 focus-visible:ring-orange-500`) makes keyboard navigation visible and usable.
    4.  **Scroll & Interactivity States**: Confirmed that clicking the map states successfully filters the catalog, and clicking the category cards scrolls the viewport to anchor locations.
    5.  **Easter Egg Trigger**: Confirmed that typing "namaste" on the keyboard launches the Sunken City of Dwaraka achievement card modal successfully.
