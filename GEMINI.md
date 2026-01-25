# H20 Immigration Agency Website

## Project Overview

This project is a modern, responsive landing page for "H20 Immigration Agency", built to showcase immigration services, success stories, and contact information. It utilizes the latest web technologies to ensure high performance, accessibility, and a premium visual aesthetic.

**Core Technologies:**
*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm, yarn, pnpm, or bun

### Installation
Install the project dependencies:
```bash
npm install
```

### Development Server
Start the local development server:
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

### Build & Production
Build the application for production:
```bash
npm run build
```
Start the production server:
```bash
npm start
```

## Project Structure

The project follows the standard Next.js App Router structure, organized for modularity and scalability.

```
/
├── app/                  # Application Source
│   ├── layout.tsx        # Root layout (Html, Body, Fonts)
│   ├── page.tsx          # Home page composition
│   └── globals.css       # Global styles & Tailwind theme
│
├── components/           # React Components
│   ├── layout/           # Global structural components
│   │   ├── Header.tsx    # Navigation bar
│   │   └── Footer.tsx    # Site footer
│   │
│   ├── sections/         # Landing page sections
│   │   ├── Hero.tsx      # Above-the-fold content
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   └── ...           # (Features, Calculators, etc.)
│   │
│   └── ui/               # Reusable UI atoms
│       ├── Button.tsx
│       ├── Container.tsx
│       └── ...
│
├── lib/                  # Utilities and helper functions
│   └── utils.ts
│
└── public/               # Static assets (images, svg)
```

## Design System & Styling

The project uses a centralized design system defined via Tailwind CSS v4 variables in `app/globals.css`.

### Color Palette
*   **Primary:** Deep Blue (`#1e3a8a`) - Used for main backgrounds and branding.
*   **Secondary:** Teal (`#0d9488`) - Used for supporting elements and gradients.
*   **Accent:** Bright Coral (`#ff6b35`) - Used for Call-to-Actions (CTAs) and highlights.
*   **Background:** White (`#ffffff`)
*   **Text:** Dark Charcoal (`#1f2937`)

### Typography
Fonts are loaded via `next/font/google` in `app/layout.tsx`.
*   **Headings:** Poppins (Weights: 300-700)
*   **Body:** Inter

### Component Conventions
*   **Structure:** All new components should be created in the `components/` directory.
*   **Naming:** PascalCase for component files (e.g., `MyComponent.tsx`).
*   **Styling:** Use Tailwind utility classes. Avoid custom CSS files unless absolutely necessary for complex animations.
*   **Responsive Design:** Use Tailwind's responsive modifiers (`md:`, `lg:`) to ensure layouts work on all device sizes. Mobile-first design is encouraged.
*   **Animations:** Use `framer-motion` for complex entrance animations and interactions (e.g., `<motion.div>`).

## Scripts

*   `dev`: Starts the Next.js development server.
*   `build`: Creates an optimized production build.
*   `start`: Runs the built application in production mode.
*   `lint`: Runs ESLint to check for code quality issues.
