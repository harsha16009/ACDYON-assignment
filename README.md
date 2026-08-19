# DevPulse — Premium SaaS Product Landing Page

DevPulse is a fictional engineering intelligence SaaS product designed to turn development and deployment activity into clear, actionable signals for software engineering teams. 

This repository houses the frontend-only landing page for DevPulse, built as part of the Acdyon Part 2 frontend engineering assessment.

---

## 🚀 Technologies

- **React** (v18)
- **Vite** (Next-generation build tool)
- **Tailwind CSS** (Utility-first styling framework)
- **Framer Motion** (Production-ready animation framework)
- **Lucide React** (Crisp vector icons)

---

## ✨ Features Included

1. **Hero Section**: Clear engineering value proposition with dual CTAs ("Explore Demo" and "See How It Works").
2. **Interactive Product Dashboard**:
   - Time-range selector (`7 days`, `30 days`, `90 days`) that dynamically updates metric cards and graphs.
   - Customized SVG Engineering Activity graph with smooth bezier paths.
   - Workflow Health metrics with responsive progression bars.
3. **Restrained Motion**: Subtle scroll-reveal effect on the dashboard and card hovers using Framer Motion.
4. **Responsive Layouts**: Crafted for 390px (mobile viewport) and 1440px (desktop viewport) layouts with no horizontal scroll issues.
5. **Clear Navigation**: Desktop sticky header and mobile slide-down hamburger navigation.
6. **Honest Content**: Zero fake user counts, customer logos, or fabricated testimonials. Clear messaging specifying sample data usage.

---

## 📂 Project Directory Structure

```
acdyon-premium-homepage/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Responsive top-nav header
│   │   ├── Hero.jsx             # Tagline and CTA actions
│   │   ├── ProductPreview.jsx   # Interactive dashboard preview with dynamic data
│   │   ├── Features.jsx         # Analyze, Detect, and Improve cards
│   │   ├── HowItWorks.jsx       # Connecting timeline (Connect -> Analyze -> Improve)
│   │   ├── CTA.jsx              # Closing call-to-action block
│   │   └── Footer.jsx           # Copyright and quick navigation
│   │
│   ├── App.jsx                  # Main layouts
│   ├── main.jsx                 # React mount root
│   └── index.css                # Tailwind directives & global overrides
│
├── DECISIONS.md                 # Technical decisions, AI usage, and trade-offs
├── README.md                    # Project documentation
├── package.json                 # Dependency list & build scripts
├── vite.config.js               # Vite configurations
└── tailwind.config.js           # Tailwind styles setup
```

---

## ⚙️ How to Install and Run Locally

Ensure you have [Node.js](https://nodejs.org/) (v16+) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The compiled static assets will be output to the `/dist` directory, ready to be hosted on Vercel, Netlify, or GitHub Pages.
