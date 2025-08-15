# ADR 001: Refactoring project structure to improve Scalability and Maintainability

## Context

The application was developed as a mini-project for selection to school purposes, focused on the quick implementation of basic functionality. Due to limited timeframes and requirements, the project structure was not carefully thought out, and decisions were made in favor of development speed rather than long-term maintainability.

In case of further development of the project as a full-fledged application, critical non-functional qualities are scalability and maintainability. The current architecture hinders functionality expansion, support, and testing.

---

## Decision

Restructure the application to follow a **feature-based modular organization**. This includes:

### Grouping components and business logic by features.

This migration targets components that are **tightly coupled with specific features and contain business logic** (e.g. use `Redux state`, `dispatch` actions, contain feature-specific logic). These components will be moved from `src/components/` into a corresponding `src/features/<feature>/components/` directory. Steps:

1. **Audit and classify components in** `src/components/`
   - Tag each component as either:
      - **Feature-specific** (with business logic) — e.g., `TrackList`, `GenreSelect`, `Audio`, etc.
      - **Generic/presentational** — e.g., buttons, modal wrappers, input fields.
2. **Create feature folders under** `src/features/`
   - For each identified feature (e.g., `trackList`, `genres`, `audio`), create a directory:
     `src/features/trackList/components/`
     `src/features/genres/components/`
3. **Move only feature components**
   - Relocate components tied to a specific feature and containing business logic to the corresponding features folder.
   - Update all related imports.
4. **Refactor and test iteratively**
   - After each move, confirm that features still function correctly and no broken imports exist.

### Completion criteria

The migration is considered complete when:

- All feature-specific components with business logic have been moved to `src/features/<feature>/components/`.
- `src/components/` only contains:
   - Generic, reusable UI components.
   - Presentational components with no dependency on application logic or feature state.
- All moved components have updated and working import paths.
- New feature-specific components are placed under the appropriate `src/features/` folder by default.

---

## Rationale

- **Scalability**: Feature-based architecture allows each module to evolve independently, enabling easier integration of new features without cluttering global space.
- **Maintainability**: Keeping related code (logic, UI, tests) together makes it easier to debug and modify specific features.
- **Best Practices**: This approach aligns with modern recommendations for single-page application architecture.

---

## Status

`Proposed`

---

## Consequences

### Positive:

- **Improved scalability:** the structure makes it easier to add new features.
- **Improved separation of concerns:** logic, UI, and state management are grouped by feature, resulting in clearer responsibilities and cleaner code.
- **Better onboarding for new developers:в** consistent approach across all parts of the project.

### Negative:

- **Increased structural complexity:** new levels of abstraction may initially complicate understanding of the project.
- **Time for refactoring:** significant time must be allocated to restructuring logic and architecture.
