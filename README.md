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
```

## ✨ Features Implemented

This project delivers a full-featured experience for managing music tracks, combining modern tools, clean UX, and efficient API interactions.

---

### 🔄 API Integration & State Management

- **CRUD operations** using `createAsyncThunk` (`POST`, `PUT`, `DELETE`, `GET`)
- Centralized state management via **Redux Toolkit** store
- **Server-side logic** for:
  - Filtering
  - Sorting
  - Order direction change
  - Page limit and pagination
  - Search queries

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
