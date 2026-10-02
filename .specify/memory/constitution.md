<!--
Sync Impact Report
- Version change: (unversioned template) → 1.0.0
- Scope: UI (Next.js web app) only. Backend/API rules belong in a separate backend constitution.
- Source: docs/constitution-open-questions.md (answers dated 2026-09-27), filtered to UI-relevant rules.
- Modified principles: all template placeholders replaced (initial ratification)
- Added principles:
  I. Financial Correctness (NON-NEGOTIABLE)
  II. Dates and Time
  III. State Management
  IV. API Contract and Server Data
  V. Rendering and Routing
  VI. Security and Privacy
  VII. Test-First Domain Logic
  VIII. Design System and Code Organization
  IX. Accessibility and UX
  X. Performance
- Added sections: Scope and Technology Constraints; Development Workflow and Quality Gates
- Removed sections: none
- Templates: plan-template.md "Constitution Check" reads this file at runtime; no template edits made.
- Deferred TODOs: none
-->

# BudgIT UI Constitution

This constitution governs the BudgIT web UI (the Next.js application in this repository). Rules for
the backend API live in a separate backend constitution. Where this document refers to API behavior,
it describes the contract the UI relies on, not how the backend implements it.

## Core Principles

### I. Financial Correctness (NON-NEGOTIABLE)

- Money MUST be represented as integer cents everywhere in the UI: models, state, calculations and
  API payloads. Floating-point dollar values MUST NOT be used for money.
- Rounding and currency formatting MUST happen only at display time, and only in `Formatter`.
  Calculations MUST NOT round partway through.
- Transactions and category assignments are the only source of truth. Account balances and Amount
  to Assign are computed by the API. The UI MUST treat those values as read-only, MUST NOT persist
  or mutate them independently, and MUST replace them with the server's values after every write.
  Optimistic estimates (Principle IV) are allowed only until the server result arrives.
- Only USD is supported in v1. Currency MUST NOT be hard-coded outside `Formatter` and the money
  helpers, so more currencies can be added later without touching components.
- Unparseable amount input (e.g. `abc`) MUST be rejected with a message in the field. It MUST NOT be
  silently converted to `0` or `NaN`.

**Rationale**: A budgeting app that is off by a cent loses the user's trust. Integer cents and a
single formatting point remove whole classes of rounding bugs.

### II. Dates and Time

- All date math and formatting MUST go through `DateUtil`. Components MUST NOT call `Date` getters
  directly or write millisecond arithmetic.
- `DateUtil` MUST use date-fns (with `@date-fns/tz` for timezone conversion).
- Calendar days (e.g. transaction dates) are `YYYY-MM-DD` strings with no timezone and MUST NOT be
  converted, so every viewer sees a transaction on the same day and in the same budget month.
- Moments in time (`created_at`, `updated_at`, import time) arrive as ISO 8601 UTC strings and are
  converted to the user's local timezone only for display.
- A budget month MUST be a single `YYYY-MM` value, never separate month and year state.
- JavaScript `Date` objects MUST exist only at the edges: parsing input, formatting output, and
  inside a single date-fns calculation. They MUST NOT be stored in React state or API payloads.

**Rationale**: The current `formatAsDate` bug (0-based month, weekday used as day) shows how easily
hand-rolled date code goes wrong. One utility and string-based values make dates predictable.

### III. State Management

- State MUST be split by area; there is no single global context. Server data (budget, accounts,
  transactions) lives in the TanStack Query cache and is read through one hook per area (e.g.
  `useBudget(month)`, `useAccounts()`), not stored in React contexts.
- UI-only state MUST NOT go in a domain context. It lives in the first of these that fits:
    1. the component's own `useState` (popups, hover, expanded sections, unsaved form drafts);
    2. the URL, for anything that should survive a refresh, work with the back button or be linkable
       (current page, budget month such as `/budget/2026-09`, selected account, filters);
    3. a small, separate UI context, only when distant components share a value (e.g. selected
       transactions used by both a list and a bulk-action toolbar).
       UI-only state is never sent to the API and is not undoable. Preferences that should follow the
       user across devices are user settings saved through the API.
- A hook or component that takes on more than one responsibility MUST be split. Files SHOULD stay
  under 300–400 lines; this is a heuristic, not a hard limit.
- Updates that change part of a nested object or array MUST go through Immer. Replacing a whole
  value or setting a primitive uses plain `setState`. Hand-written spreads are allowed only for a
  measured bulk-update performance problem.
- Business rules (validation, splits, date bucketing) MUST be pure functions in their own files with
  no React, API calls or side effects. Hooks and components only call them and store the result.
  The API is the authority on business rules; the UI repeats only the checks needed for instant
  feedback. Rules checked on both sides MUST share one set of test fixtures (e.g. JSON inputs and
  expected results) run against both implementations.
- Undo and redo are owned by the API. The UI MUST NOT keep its own undo stack; it calls
  `POST /undo` and `POST /redo` and renders the `canUndo`, `canRedo` and labels returned by every
  write. If the API refuses an undo because the records changed, the UI shows the explanation and
  refetches. `UndoRedoUtil` is to be removed.

**Rationale**: The 384-line `useBudget` hook mixing data, navigation, selection and undo is the main
source of coupling today. Splitting by concern keeps re-renders and changes local.

### IV. API Contract and Server Data

- All network calls MUST go through one API layer. Components and hooks MUST NOT call `fetch`
  directly.
- API types MUST be generated from the backend's OpenAPI spec; UI models are mapped from them.
- All server data MUST be loaded through TanStack Query (loading, error, retry, caching, refetch on
  window focus or reconnect). Views show the shared loading skeleton and the shared error message
  with a retry button.
- After a write, the UI MUST update from the write response (updated records, recomputed totals,
  new versions) and MUST NOT issue a follow-up read to see its own write.
- Budget-table edits MUST be optimistic, with rollback and an error message if the request fails.
- Every record carries a version. When the API rejects a save because a newer version exists, the
  UI MUST show a message and refetch; the last save never silently wins.
- Offline use is out of scope for v1.
- Sample data MUST NOT ship in production builds. It is used only in tests and a dev-only seed.

**Rationale**: One API layer, generated types and one data-fetching library keep the UI consistent
with the server and remove ad hoc loading and error handling.

### V. Rendering and Routing

- Route pages and layouts are Server Components: they load initial data from the API and pass it to
  client components as props. Interactive UI (forms, buttons, anything with state or context) is a
  client component. Components MUST NOT be restructured solely to make them server-rendered.
- Existing code migrates gradually, starting by removing `'use client'` from `src/app/page.tsx`.
  No big-bang refactor.
- File names describe what a component does, not where it runs; the `'use client'` directive is the
  only marker. Modules that must never reach the browser MUST import `server-only`.
- Page-level navigation MUST use Next.js routes (e.g. `/budget/2026-09`, `/accounts/12`) via
  `<Link>` and `useRouter()`, with filters in the query string. Shared UI and providers live in
  `app/layout.tsx` so they keep state across pages.

**Rationale**: Routes make views linkable and refresh-safe, and Server Components keep data loading
and server-only code out of the browser bundle.

### VI. Security and Privacy

- Non-secret settings (API URL, Cognito pool ID, client ID, domain) live in committed
  per-environment config files read at startup, overridable by the remote configuration service.
  Secrets MUST NOT be committed; they come from environment variables or a secret manager and are
  read only on the server (`server-only`). The merged config MUST be validated at startup, and the
  app MUST refuse to start if a value is missing or points at `localhost` outside development.
- Tokens MUST be stored only in `HttpOnly`, `Secure`, `SameSite=Lax` cookies set by the Next.js
  server, which handles the Cognito login and token exchange. Tokens MUST NOT be in `localStorage`,
  `sessionStorage` or browser-readable memory. Every write request MUST carry CSRF protection.
- Routes MUST be protected on the server by Next.js middleware, which redirects logged-out users to
  `/login` and refreshes expiring tokens. Server Components and route handlers that load user data
  MUST verify the session again. A 401 in the browser redirects to `/login` for UX only.
- The UI MUST NOT assume it has access; the backend enforces authorization.
- Amounts, balances, payees, memos, account names or numbers, tokens and emails MUST NOT appear in
  logs, analytics, error reports or URLs. IDs, error codes and request IDs are allowed. Request and
  response bodies are never logged. Error tracking scrubs events and does not record sessions.
- Financial data is held only in memory in the browser: no persisted query cache, and all caches
  are cleared on logout.
- Any new third party that receives financial data requires its own explicit decision.
- A Content Security Policy MUST be configured in `next.config.ts`, and `npm audit` MUST run in CI.

**Rationale**: This app handles personal financial data; the browser is the least trusted part of
the system.

### VII. Test-First Domain Logic

- Test-first development is REQUIRED for domain logic (money, balances, targets, undo handling) and
  RECOMMENDED for UI components.
- Tools: Vitest for unit tests, React Testing Library for components, Playwright for end-to-end
  tests.
- Domain logic MUST keep at least 85% coverage. There is no coverage minimum for UI code.
- End-to-end tests MUST cover at least: sign-in, assigning money, adding a transaction, creating a
  target, and undo. New critical flows are added to this list as they ship.
- Test fixtures live in `tests/fixtures`, not in `src/`.

**Rationale**: Money and undo bugs are silent and costly; pure, tested domain functions catch them
before users do.

### VIII. Design System and Code Organization

- Basic UI components live in `components/ui`, one each of Button, Input, Select, Popup,
  `EmptyState` and so on. Duplicate or copied versions (e.g. `Button1`) are not allowed. Different
  looks come from `variant` and `size` props; a new look is a new variant, not a new component.
  A `className` prop is allowed for layout only (margin, width), merged with `tailwind-merge`, never
  to restyle color or shape.
- Colors MUST come only from semantic theme tokens (e.g. `primary`, `muted`, `destructive`), with
  Tailwind's default palette removed. Spacing, radius and font sizes use Tailwind's default scales,
  extended with a token only when the scale truly lacks a value. Arbitrary values are not allowed
  for colors, spacing, radius or font sizes; they are allowed for one-off layout values such as grid
  templates. Tokens live in `@theme` blocks under `src/styles/tokens/` (Tailwind v4).
- Dynamically built Tailwind class names (e.g. `` `hover:${color}` ``) are banned. Use full class
  names looked up from a map.
- Code is organized by feature, at most 3 levels deep under `src/`. Each feature folder (e.g.
  `features/budget`, `features/accounts`, `features/transactions`) holds `components/`, `hooks/`,
  `api.ts`, `logic.ts` (pure rules) and `types.ts`. Folders MUST NOT mirror on-screen nesting;
  components sit flat in the feature's `components/` folder. Route files in `app/` stay thin.
  Shared UI lives in `components/ui`, shared non-UI code (API client, session, `DateUtil`,
  `Formatter`) in `lib/`, and tokens in `styles/tokens/`. Code used by two or more features moves
  up into `components/ui` or `lib/`.
- Icons come from Bootstrap Icons, used only through one `Icon` component.
- Components are PascalCase with a `Props` type in the same file. Numbered names are not allowed.

**Rationale**: One component set and one token set keep the UI consistent and stop styling bugs
like runtime-built class names that Tailwind never generates.

### IX. Accessibility and UX

- The target is WCAG 2.2 AA, built in rather than bolted on: semantic HTML, a label on every input,
  keyboard access, visible focus, contrast through the color tokens, and no meaning shown by color
  alone (e.g. overspent amounts also show a minus sign). Checked automatically with
  `eslint-plugin-jsx-a11y` and axe in Playwright tests. A formal audit and routine screen-reader
  testing are deferred until the app is offered to other people.
- Every action MUST work with the keyboard alone. Use native elements (`button`, `input`, `select`,
  `a`); clickable `div`s are not allowed. Popups move focus inside when opened, close with Esc and
  return focus to their trigger. The budget table is a semantic `<table>` whose cells are reachable
  with Tab, with Enter to edit and Esc to cancel. Arrow-key grid navigation is deferred.
- Every view MUST have loading, empty and error states using the shared skeleton, `EmptyState` and
  error-with-retry components. Errors are explained in text, not only with color.
- The UI is desktop-first, and layouts MUST still work at 200% zoom and on narrow screens (content
  reflows; the budget table may scroll horizontally). A dedicated mobile design is out of scope
  until specified.
- Destructive actions that can be undone happen without a confirmation dialog and show an undo
  message that is announced to screen readers, reachable by keyboard, and stays until dismissed or
  the next action. Actions that cannot be undone MUST require a confirmation dialog.
- Error, status and undo messages live in `MessageConstants.ts`. Static labels and headings may stay
  in their components. No translation library until translation is needed.

**Rationale**: Accessibility basics cost little when built in from the start and are expensive to
retrofit.

### X. Performance

- Sizing targets: 50 categories, 300 line items and 10k transactions per account. No feature may
  assume all of a user's data is in the browser: the budget loads one month at a time and
  transaction lists are fetched in pages (cursor or date range), with totals computed by the API.
- Editing a budget cell MUST update the cell and its totals in under 100 ms on a mid-range laptop,
  achieved through optimistic updates regardless of server speed.
- Re-renders are avoided by structure first: state as low in the tree as possible, narrow TanStack
  Query selectors, small contexts split by concern, and list rows as separate components keyed by
  ID. The React Compiler is enabled; manual `useMemo`, `useCallback` and `memo` are added only when
  the React Profiler shows a problem.
- Transaction lists MUST be virtualized (TanStack Virtual). The budget table is not virtualized
  unless it misses the 100 ms target.
- First-page-load JavaScript MUST stay within 250 KB gzipped, enforced in CI. Large or rarely used
  features (charts, import flow) load on demand with `next/dynamic`; `@next/bundle-analyzer` is used
  to find what to trim.

**Rationale**: Measurable budgets keep the app fast as data grows without premature optimization.

## Scope and Technology Constraints

- **Stack**: TypeScript (strict), React, Next.js App Router, Tailwind CSS, Bootstrap Icons, TanStack
  Query, TanStack Virtual, Immer, date-fns, and Amazon Cognito (OIDC) for identity.
- **v1 includes**: manual transaction entry and CSV import, budgeting, targets and account views.
- **Out of scope for v1**: shared or multi-user budgets, investments, multiple currencies, a native
  mobile app, offline use, and server push of changes (Server-Sent Events or WebSockets; revisit if
  shared budgets or simultaneous multi-device editing are added).
- **Next goal after v1**: bank linking with automatic transaction imports.

## Development Workflow and Quality Gates

- Features MUST have a Spec Kit spec before any code is written. Bug fixes and chores skip specs.
- A merge MUST be blocked unless `tsc --noEmit`, `next lint`, tests, the build, `npm audit` and the
  bundle-size check all pass in CI.
- `eslint-disable` comments, `any` and `as` casts are allowed only with a comment explaining why.
  `any` is not allowed in domain code.
- Prettier formats all code, run by a pre-commit hook.
- Commits follow Conventional Commits and reference the Spec Kit feature number and task ID, e.g.
  `feat(003): add split validation [T004]`.
- One branch per feature, named by Spec Kit (e.g. `003-split-transactions`), merged into `main` by
  pull request when the spec is complete. Task branches (e.g.
  `003-split-transactions--T004-validation`) may branch off the feature branch and merge back by
  pull request. Spec Kit commands run on the feature branch, which pulls in `main` regularly.
- Every merge requires a self-review against this constitution.

## Governance

- This constitution supersedes other UI practices. Where existing code conflicts with it, new and
  changed code MUST follow the constitution; existing code migrates as it is touched or through
  planned migration tasks.
- Only the project owner may amend it. Amendments go through a pull request that includes a version
  bump and a note on how existing code moves to the new rule.
- Versioning: MAJOR when a principle is removed or reversed; MINOR when a principle or section is
  added or materially expanded; PATCH for wording-only changes.
- Every plan's Constitution Check and every pre-merge self-review MUST verify compliance with these
  principles. Any deviation MUST be justified in the plan's Complexity Tracking table.

**Version**: 1.0.0 | **Ratified**: 2026-10-01 | **Last Amended**: 2026-10-01