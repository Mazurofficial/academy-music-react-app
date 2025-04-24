# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx tiged reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)

# 🎵 Academy Music React App

> **Genesis Academy Frontend School Testing Project**

This is a music application built with **React**, **Redux**, and **TypeScript**, powered by **Vite** for blazing-fast development 🚀. 

Designed with scalability and maintainability in mind, this project serves as a robust template for modern frontend apps.

---

## ⚙️ Tech Stack

| Tech              | Description                                      |
| ----------------- | ------------------------------------------------ |
| **React**         | UI Library for building user interfaces          |
| **Redux Toolkit** | State management with simplified configuration   |
| **TypeScript**    | Typed superset of JavaScript                     |
| **Vite**          | Next-gen frontend tooling for development & build|
| **Vitest**        | Lightning fast unit testing powered by Vite      |
| **React Testing Library** | Testing utilities for React components  |

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

