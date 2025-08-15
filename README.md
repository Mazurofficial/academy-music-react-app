# 🎵 Academy Music React App

> **Genesis Academy Frontend School Testing Project**

This is a music application built with **React**, **Redux**, and **TypeScript**, powered by **Vite** for blazing-fast development 🚀.

Designed with scalability and maintainability in mind, this project serves as a robust template for modern frontend apps.

---

## Scripts

- `install` - to install all dependencies
- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## ⚙️ Tech Stack

| Tech                         | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| **React**                    | UI Library for building user interfaces           |
| **Redux Toolkit**            | State management with simplified configuration    |
| **Apollo Client (GraphQL)**  | Data fetching and caching with GraphQL            |
| **TypeScript**               | Typed superset of JavaScript                      |
| **Vite**                     | Next-gen frontend tooling for development & build |
| **Vitest**                   | Lightning fast unit testing powered by Vite       |
| **React Testing Library**    | Testing utilities for React components            |
| **Storybook**                | Isolated UI component development & testing       |
| **React Router**             | Declarative routing and URL state management      |
| **rollup-plugin-visualizer** | Bundle analysis and visualization                 |

---

## 📂 Project Structure

```bash
├── public/               # Static assets
├── src/
│   ├── app/              # Redux store setup
│   ├── components/       # Reusable UI components
│   ├── features/         # Redux slices & feature logic
│   ├── pages/            # Route pages
│   ├── hooks/            # Custom hooks
│   ├── types/            # Global TypeScript types/interfaces
│   └── index.tsx         # App entry point
├── .eslintrc.js          # ESLint configuration
├── .prettierrc.json      # Prettier configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## ✨ Features Implemented

This project delivers a full-featured experience for managing music tracks, combining modern tools, clean UX, and efficient API interactions.

---

### 🔄 API Integration & State Management

- **Migrated from REST API and createAsyncThunk to GraphQL** using **Apollo Client** for all data operations
- Centralized state management via **Redux Toolkit** store
- **Server-side logic** for:
   - Filtering
   - Sorting
   - Order direction change
   - Page limit and pagination
   - Search queries

---

### 🧩 UI Component Development & Testing

- **Storybook** is used to develop and test MUI-based UI components in isolation, ensuring robust and reusable design.
- **Material UI (MUI)** components are integrated and tested for accessibility and consistency.
- **Better UX with loading states**: GraphQL mutation `loading` state is connected to the MUI `<Button loading />` prop, providing responsive feedback during async actions.

---

### 🌐 Routing & URL State

- **React Router** is used for client-side routing and managing URL parameters/props, enabling deep linking and stateful navigation.

---

### 🔒 Security & CI

- **Security audit** of dependencies is performed and documented in [`docs/security/security-audit-of-dependencies.md`](docs/security/security-audit-of-dependencies.md).
- **Continuous Integration (CI)** is set up to run tests and checks on every push, ensuring code quality and security.

---

### 🎧 Track List Experience

- **Preloader**:
   - Visual loader while fetching track data
- **Custom Audio Component**:
   - Saves playback progress
   - Ensures only one track plays at a time
- **Debounced Search**:
   - Reduces API calls with optimized search delay

---

### 📝 Track Management

- **Modal Forms** for:
   - Creating and editing track metadata
   - Fields include: title, artist, album, genres, cover image link
- **Dynamic Genre Selection**:
   - Add/remove genres using tag-style UI
- **Cover Image Handling**:
   - Validates image URL or displays default image
- **Audio Upload Flow**:
   - Separate flow for uploading and replacing files
   - Validates file type and size
   - Playback using native HTML `<audio>` element

---

### ✅ UI Components

Built with reusable and accessible custom components:

- `Checkbox`
- `Select`
- `Input`
- `Button`
- `Modal`

---

### 📦 Advanced Features

- **Bulk Select Mode**:
   - Select multiple tracks at once
   - Enables bulk actions like mass deletion

---

## 🚀 Performance Optimization

- The application is optimized for fast load times and efficient rendering.
- Achieved **98 points** on PC and **85 points** on Mobile platforms in performance audits (Lighthouse).

---

## 🏗️ Bundle Optimization & Debugging

### Bundle Analysis

- Integrated **rollup-plugin-visualizer** for bundle analysis.
- After running `npm run build`, an interactive report will open in your browser, showing the bundle composition and helping to identify unnecessary code in the final build.

#### How to use:

1. Run the production build:
   ```bash
   npm run build
   ```
2. The bundle visualizer will automatically open. Explore which modules are included and their sizes.

### Source Maps

- Source maps are enabled for production builds. This allows you to debug the original TypeScript/JSX code in the browser, even after minification.
- You can find `.map` files in the `dist/` directory after building.
