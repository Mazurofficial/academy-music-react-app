# ADR 002: Transition to Redux Toolkit 2.0 Syntax

## Context

The application currently uses older Redux Toolkit patterns (`createAsyncThunk`, separate `slice` and `async` logic functions). As part of modernizing and simplifying state management, a new `RTK 2.0 API` is available that enables defining both sync and async reducers directly inside `createSlice`.

---

## Decision

Adopt **Redux Toolkit 2.0** syntax across the project by:

- Defining all reducers — including asynchronous ones — directly inside `createSlice`.
- Centralizing all state logic for a given feature within a single slice file.
- Phasing out `createAsyncThunk` in favor of inline async reducer definitions.

---

## Rationale

- **Consistency**: The RTK 2.0 approach standardizes how logic is written and handled.
- **Less boilerplate**: Eliminates verbose thunk definitions and extra action creators.
- **Improved developer experience**: Simplifies reasoning about state changes.
- **Alignment with the future of Redux**: Keeps the project aligned with the current best practices and evolution of the library.

---

## Status

`Proposed`

---

## Consequences

### Positive:

- Cleaner and more concise code.
- Better cohesion between sync and async logic.
- Easier maintenance and onboarding with modern patterns.

### Negative:

- May lead to harder to read slice files.
- Requires time for refactoring and learning the new API.
- Development speed may temporarily decrease as the team adapts.
