# BudgIT Constitution — Open Questions

Sep 27, 2026 · @Dane

Answer the questions below. Each answer becomes a principle or constraint in `.specify/memory/constitution.md`. Every section starts with what the UI codebase does today, then asks what the rule should be.

- **Priority:** P1 = decide before the next spec (it affects every feature). P2 = decide before the related feature lands. P3 = good to settle eventually.
- **Suggested default:** my recommendation. Keep it, change it, or reject it.
- **Your answer:** fill this in. Leave it blank to defer, or write "N/A" to leave it out of the constitution.

## 1. Money and financial correctness (P1)

**Today:** `Transaction.amount`, `assigned` and balances are JS `number` floats. `parseAsDollarAmount` rounds with `parseFloat(...).toFixed(2)`. Balances are recalculated with `reduce` on every render. Formatting lives in `src/common/Formatter.tsx`.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 1.1 | How are amounts stored: floats, integer cents, or a decimal library? | Integer cents everywhere, so no floats are ever used for money. Make this non-negotiable. | Use integer cents everywhere, we can format them as dollar amounts wherever needed in the UI. In the DB,  store these values as a BIGINT |
| 1.2 | Where may rounding and currency formatting happen? | Only at display time, and only in `Formatter`. Calculations never round partway through. | Only at display time, and only in `Formatter`. Calculations never round partway through. |
| 1.3 | Are balances and "Amount to Assign" always calculated from transactions, never stored? | Yes. Calculate them from transactions and write this down as a rule that must always hold. | Transactions and category assignments are the only persisted source of truth. Account balances and Amount to Assign are always derived from them, never persisted or mutated independently. Compute them with database aggregates by default. Clients may hold the computed values returned by the API, but treat them as read-only and refresh them from the server after any write. Any cache or stored total is added only for a measured performance need, must be updated in the same database transaction as the write it depends on, and must be verifiable by recomputing it from transactions. |
| 1.4 | Currency scope: only USD, or leave room for more currencies? | Only USD for now, stated as a known limitation. | For the first implementation, only support USD. But the design should be built in a way that makes it easy to add more currencies later. |
| 1.5 | What happens when input can't be parsed (like `abc` in an amount field)? | Reject it with a message in the field. Never quietly turn it into 0 or NaN. | Reject it with a message in the field. Never quietly turn it into 0 or NaN. |

## 2. Dates and time (P2)

**Today:** `formatAsDate` uses `getMonth()` (which counts from 0) and `getDay()` (the weekday), so it prints the wrong date. `useBudget` tracks `currentMonth` and `currentYear` as two separate pieces of state. `DateUtil.ts` exists but isn't required.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 2.1 | Must all date math and formatting go through `DateUtil`? | Yes. Components never call `Date` getters directly. | Yes. Components never call `Date` getters directly. |
| 2.2 | Use a date library (date-fns, Temporal polyfill) or plain `Date`? | date-fns for math. Keep `Date` only at the edges. | Date math uses date-fns (with `@date-fns/tz` for timezone conversion), called only through `DateUtil`, never hand-written millisecond arithmetic. There are two kinds of date values. Calendar days, such as transaction dates (see 2.3), are stored as Postgres `DATE` and sent over the API as `YYYY-MM-DD` strings, with no timezone and no conversion. Moments in time (`created_at`, `updated_at`, `approved_at`, import time) are stored as UTC `timestamptz`, sent as ISO 8601 UTC strings (e.g. `2026-09-27T19:30:00Z`), and converted to the user's local timezone only for display. JavaScript `Date` objects exist only at the edges: parsing input, formatting output, and inside a single date-fns calculation. They are never kept in React state, API payloads or the database. |
| 2.3 | Is a transaction date a calendar day or a timestamp? | A calendar day (`YYYY-MM-DD`), with no time zone. | A calendar day (`YYYY-MM-DD`), stored as Postgres `DATE` with no timezone, so every viewer sees a transaction on the same day and in the same budget month. Bank imports that include a timestamp are converted to a calendar day once, at import, using the timezone saved in the user's profile (not the browser's current timezone). Only the `DATE` is stored. |
| 2.4 | Is a budget month one value (`YYYY-MM`) or separate month and year? | One `YYYY-MM` value. | One `YYYY-MM` value. |

## 3. State management (P2)

**Today:** one 384-line `useBudget` hook shared through `BudgetContext` holds budget, accounts, navigation, selection and undo. Updates go through `use-immer`. Undo (`UndoRedoUtil`) covers only budget edits, not transactions or accounts.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 3.1 | One global context, or state split by area (budget, accounts, UI)? | Split by area. One hook and one context per area. | Split by area, with no single global context. Server data (budget, accounts, transactions) lives in the TanStack Query cache, not in React contexts, and is read through one hook per area (e.g. `useBudget(month)`, `useAccounts()`). Contexts hold only shared UI state (see 3.5), one small context per concern. |
| 3.2 | At what size must a hook or component be split? | Around 200 lines, or when it takes on a second responsibility. | When it takes on more than one responsibility, a hook or component should be split up. Ideally, keep files under 300-400 lines of code, but this is more of a heuristic than a hard rule. |
| 3.3 | Is Immer required for every change to nested state? | Yes, so changes are made the same way everywhere. | Any update that changes part of a nested object or array goes through Immer. Replacing a whole value, or setting a primitive, uses plain `setState`. Hand-written spreads are allowed only for measured bulk-update performance problems. |
| 3.4 | Must every user action that changes data be undoable? | Yes for budget, transaction and account edits. New features must add undo. | Yes. Undo and redo are handled by the API, not the UI. Every write records a change entry (before and after values) in the same database transaction, grouped per user action so a multi-row action undoes as one step. Undo applies a compensating change rather than erasing history, and deletes are soft deletes so they can be undone. The server keeps an undo/redo stack per session; undo reaches back only through the current session, and any new action clears the redo stack. If the affected records changed since the action (another device or session), undo is refused with a clear explanation, and the UI refetches the latest data. The UI keeps no undo stack of its own: it calls `POST /undo` and `POST /redo`, and every write response includes `canUndo`, `canRedo` and a label for each (e.g. "Undo delete transaction"). `UndoRedoUtil` is removed. |
| 3.5 | Where does UI-only state live (current page, popups, selection)? | In the component, or in the URL for navigation. Keep it out of domain contexts. | UI-only state (what the screen shows, not the user's data) never goes in a domain context. It lives in the first of these that fits: (1) the component's own `useState`, for popups, hover, expanded sections and unsaved form drafts; (2) the URL, for anything that should survive a refresh, work with the back button or be linkable, such as the current page, budget month (`/budget/2026-09`), selected account and filters; (3) a small, separate UI context, only when distant components share a value, such as selected transactions used by both the list and a bulk-action toolbar. UI-only state is never sent to the API and is not undoable. Preferences that should follow the user across devices are user settings, saved through the API like other data. |
| 3.6 | Should the business logic be pure functions you can test without React? | Yes. Hooks only connect those functions to state. | Yes. Business rules (validation, splits, date bucketing) are pure functions in their own files, with no React, API calls or side effects, and are unit-tested without rendering. Hooks and components only call them and store the result. The API (Java, but subject to change) is the authority on business rules; the UI repeats only the checks needed for instant feedback. Rules checked on both sides share one set of test cases (e.g. JSON fixtures of inputs and expected results) that run against both the TypeScript and Java versions, so they can't drift apart. |
| 3.7 | How does the UI stay consistent with the server after a write? | Write endpoints return the resulting state; the UI never follows a write with a separate read. | Every write endpoint returns the resulting state (updated records, recomputed totals, new version numbers) from the same database transaction as the write. The UI updates from that response and never issues a follow-up read to see its own write. If read replicas are ever added, reads that follow a write go to the primary. Every record carries a version, and writes that target a stale version are refused so the UI refetches. Not decided: server push of changes to open sessions (Server-Sent Events or WebSockets). Revisit if shared budgets or editing from multiple devices at once are added; until then, the UI refetches when the window regains focus or reconnects. |

## 4. Server vs. client rendering (P3)

**Today:** `src/app/page.tsx` starts with `'use client'`, so the whole app renders in the browser. The README says you want more server-side rendering. `CreateEditTargetServer.tsx` has "Server" in its name but isn't a Server Component.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 4.1 | What's the default: Server Components, or client-only for now? | Server Components by default. Add `'use client'` only to interactive leaf components. | Route pages and layouts are Server Components: they load initial data from the API and pass it to client components as props. Interactive UI (forms, buttons, anything with state or context) is a client component, which in this app will be most components. Don't restructure components just to make them server-rendered. Existing code migrates gradually, starting by removing `'use client'` from `page.tsx`; no big-bang refactor. |
| 4.2 | Do file names say where a component runs? | No suffixes. Use the directive, and rename `*Server.tsx`. | No. File names say what a component does, not where it runs; the `'use client'` directive is the only marker. Rename `CreateEditTargetServer.tsx` to describe its purpose. Modules that must never reach the browser import `server-only`, so the build fails if a client component imports them. |
| 4.3 | Is page-level navigation (Budget / Accounts) done with routes or state? | Next.js routes, so views can be linked to and the back button works. | Next.js routes, so views can be linked to, survive a refresh and work with the back button (e.g. `/budget/2026-09`, `/accounts/12`). Navigation uses `<Link>` and `useRouter()`; filters go in the query string (see 3.5). Shared UI and context providers live in `app/layout.tsx` so they keep their state across pages. |

## 5. Data access and backend contract (P1)

**Today:** every function in `src/crud-api.ts` is a placeholder that returns `Promise.resolve`. The app runs entirely on `SampleBudget.ts` and `SampleAccounts.ts`, which are imported directly by `useBudget`. Types in `src/model` are written by hand.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 5.1 | Must all network calls go through one API layer? | Yes. Components and hooks never call `fetch` directly. | Yes. Components and hooks never call `fetch` directly. |
| 5.2 | Where do API types come from? | Generated from the backend's OpenAPI spec, with UI models mapped from them. | Generated from the backend's OpenAPI spec, with UI models mapped from them. |
| 5.3 | Optimistic updates, or wait for the server to confirm? | Optimistic for edits made in the budget table, with rollback and an error message if the request fails. | Optimistic for edits made in the budget table, with rollback and an error message if the request fails. |
| 5.4 | How should offline use and edit conflicts be handled? | Offline is out of scope for v1. If a newer version exists on the server, the save is rejected and the user sees a message (the last save does not silently win). | Offline is out of scope for v1. If a newer version exists on the server, the save is rejected and the user sees a message (the last save does not silently win). The UI then refetches the latest data (see 3.7) |
| 5.5 | Can sample data ship in production builds? | No. Use it only for tests and a dev-only seed. | No. Use it only for tests and a dev-only seed. |
| 5.6 | How are loading and error states from requests handled? | Through one shared pattern (for example a data-fetching library or a single `useQuery`-style hook). | TanStack Query for all server data: loading, error, retry, caching and refetch on window focus. Components show a shared skeleton while loading and a shared error message with a retry button on failure. Server data lives in the query cache, not in React contexts (see 3.1). |

## 6. Security and auth (P1)

**Today:** `config.ts` hard-codes the Cognito client ID, pool ID and domain in the committed code. The `test` and `production` configs are copies of `development`, all pointing at `localhost:3000`. OIDC tokens are kept in `localStorage`. The auth check runs only in the browser, through `redirect('/login')` in `page.tsx`.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 6.1 | Where do environment-specific settings live? | In environment variables (`NEXT_PUBLIC_*` where needed), checked when the app starts. Nothing environment-specific in committed code. | Non-secret settings (API URL, Cognito pool ID, client ID, domain) live in committed per-environment config files. The CI pipeline uploads the file for each environment to a separate location, and the app reads it at startup, so config changes don't require a rebuild. Values in the remote configuration service override values from the static file, so settings can change without a redeploy. Secrets (client secrets, API keys, signing keys) are never committed: they come from environment variables or a secret manager and are read only on the server (`server-only`, see 4.2). The merged config is validated at startup, and the app refuses to start if a value is missing or points at `localhost` outside development. The same rules apply to the Java API. |
| 6.2 | Where are tokens stored? | Not in `localStorage`. Use cookies the server manages, or keep tokens in memory with silent renew. | In cookies, never in `localStorage`, `sessionStorage` or browser-readable memory. The Next.js server handles the Cognito login and token exchange and stores tokens in `HttpOnly`, `Secure`, `SameSite=Lax` cookies, so browser JavaScript can never read them. Server-side route protection (6.3) and Server Components (4.1) read the session from these cookies. Every write request requires CSRF protection (a CSRF token or custom header check) in addition to `SameSite`. |
| 6.3 | How are routes protected? | With Next.js middleware on the server. The browser-side redirect is only there for UX. | Next.js middleware (`proxy.ts` in Next.js 16) checks the session cookie on the server before every page request except login and static files, redirects logged-out users to `/login`, and refreshes expiring access tokens. Middleware is not the only check: Server Components and route handlers that load user data verify the session again, and the Java API authorizes every request (6.6). In the browser, a 401 from the API sends the user to `/login`; this is for UX only, not security. |
| 6.4 | What financial data may be logged, cached in the browser, or sent to third parties? | No amounts, payees or account names in logs or analytics. Nothing cached in the browser beyond the session. | No amounts, balances, payees, memos, account names or numbers, tokens or emails in logs, analytics, error reports or URLs; IDs, error codes and request IDs are allowed. Loggers redact these fields, and request and response bodies are never logged. Financial data is held only in memory in the browser: no persisted query cache, API responses sent with `Cache-Control: no-store`, and all caches cleared on logout. Error tracking scrubs events before sending and does not record sessions. Any new third party that receives financial data (e.g. bank imports) requires its own explicit decision. |
| 6.5 | Are security headers (CSP and others) and dependency scanning required? | Yes. A CSP in `next.config.ts`, and `npm audit` in CI. | Yes. A CSP in `next.config.ts`, and `npm audit` in CI. |
| 6.6 | Does the backend enforce authorization, or is the UI trusted? | The backend enforces it. The UI never assumes it has access. | The backend enforces it. The UI never assumes it has access. |

## 7. Testing (P1)

**Today:** there's no test framework, no test script in `package.json`, and no tests. Sample data sits in `src/model/Test/`, inside the app's source code.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 7.1 | Is test-first development required? For which code? | Required for domain logic (money, balances, targets, undo). Recommended for UI. | Required for domain logic (money, balances, targets, undo). Recommended for UI. |
| 7.2 | Which test tools? | Vitest for unit tests, React Testing Library for components, Playwright for end-to-end tests. | Vitest for unit tests, React Testing Library for components, Playwright for end-to-end tests. |
| 7.3 | Is there a coverage minimum? | 85% for the domain logic code. No minimum for UI. | 85% for the domain logic code. No minimum for UI. |
| 7.4 | Which user flows need end-to-end tests? | Sign-in, assigning money, adding a transaction, creating a target, and undo. | Sign-in, assigning money, adding a transaction, creating a target, and undo. More to come |
| 7.5 | Where do fixtures live? | Move `src/model/Test` to `tests/fixtures`. | Move `src/model/Test` to `tests/fixtures`. |

## 8. Components and design system (P2)

**Today:** there are three button components (`Button`, `Button1`, `BudgetButton`), each with a different API. `Button1` builds `hover:${hoverColor}` at runtime, which Tailwind can't detect, so that hover color is never generated. Color tokens live in `tailwind.config.ts`, but arbitrary values (`rounded-[5px]`, `border-[0.5px]`) show up throughout. Bootstrap is installed only for its icons. Component folders go up to 6 levels deep (`BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/...`).

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 8.1 | Should there be one shared set of basic UI components, with duplicates banned? | Yes. A `components/ui` folder with one Button, Input, Select and Popup each. | Yes. A `components/ui` folder with one main Button, Input, Select and Popup each; no duplicate or copied versions. Different looks for different contexts come from props on the shared component: named `variant` options (e.g. primary, secondary, ghost, danger) and `size` options, each defined as full Tailwind class names (see 8.3). A new look is added as a new variant, not a new component. A `className` prop is allowed for layout adjustments such as margin or width, merged with `tailwind-merge`, but not for restyling colors or shape. |
| 8.2 | Styling limits: tokens only, or are arbitrary values allowed? | Tokens only. A new value is added to `tailwind.config.ts` first. | Colors come only from our theme tokens (semantic names such as `primary`, `muted`, `destructive`), with Tailwind's default palette removed. Spacing, corner radius and font sizes use Tailwind's default scales, extended with a new token only when the scale truly lacks a value. Arbitrary values are not allowed for colors, spacing, radius or font sizes; they are allowed for one-off layout values such as grid templates. Tokens live in `@theme` blocks under `src/styles/tokens/` (Tailwind v4). |
| 8.3 | Are dynamically built Tailwind class names banned? | Yes. Use full class names looked up from a map instead. | Yes. Use full class names looked up from a map instead. |
| 8.4 | How are folders organized? | By feature (`features/budget`, `features/accounts`), at most 3 levels deep. | By feature, at most 3 levels deep under `src/`. Each feature folder (`features/budget`, `features/accounts`, `features/transactions`) holds everything for that area: `components/`, `hooks/`, `api.ts`, `logic.ts` (pure rules, see 3.6) and `types.ts`. Folders do not mirror the on-screen component nesting; components within a feature sit flat in its `components/` folder. Route files in `app/` stay thin: they load data and render components from `features/`. Shared UI lives in `components/ui` (8.1), shared non-UI code (API client, session, `DateUtil`, `Formatter`) in `lib/`, and design tokens in `styles/tokens/` (8.2). Code needed by two or more features moves up into `components/ui` or `lib/`. |
| 8.5 | Icon source: keep Bootstrap Icons or switch? | Keep it, and use it only through one `Icon` component. | Keep it, and use it only through one `Icon` component. |
| 8.6 | Naming conventions for components, props and files? | PascalCase components with a `Props` type in the same file. No numbered names like `Button1`. | PascalCase components with a `Props` type in the same file. No numbered names like `Button1`. |

## 9. Accessibility and UX (P2)

**Today:** there are no `aria-*` or `role` attributes anywhere in `src`. The budget table is a grid of selectable cells with inline inputs. Loading and error states are bare `<div>Loading...</div>` and `Error occurred: ...`. The README calls the app "fully responsive".

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 9.1 | What accessibility standard applies? | WCAG 2.1 AA. | WCAG 2.2 AA as the target, applied as built-in basics rather than a separate effort: semantic HTML, a label on every input, keyboard access, visible focus, text contrast through the color tokens (8.2), and no meaning shown by color alone (e.g. overspent amounts also show a minus sign). Checked automatically with `eslint-plugin-jsx-a11y` and axe in the Playwright tests. No formal audit or routine screen-reader testing until the app is offered to other people. |
| 9.2 | Must every action work with the keyboard alone? | Yes. The budget table follows the ARIA grid pattern (arrow keys, Enter to edit, Esc to cancel). | Yes. Use native elements (`button`, `input`, `select`, `a`) so keyboard support comes built in; no clickable `div`s. Focus is always visible. Popups move focus inside when opened, close with Esc and return focus to what opened them. The budget table is a semantic `<table>` whose cells are reachable with Tab, with Enter to edit and Esc to cancel. Full arrow-key grid navigation is deferred. |
| 9.3 | Must every view have loading, empty and error states? | Yes, using shared components. | Yes, using shared components: the loading skeleton and error message with retry from 5.6, plus an `EmptyState` component in `components/ui`. Errors are explained in text, not only shown with color. |
| 9.4 | Desktop-first or mobile-ready? | Desktop-first. Mobile gets a read-only view until it's specified. | Desktop-first. Layouts must still work when zoomed to 200% and on narrow screens: content reflows, and the budget table may scroll horizontally. A dedicated mobile design is out of scope until it is specified. |
| 9.5 | Must destructive actions (deleting a category or transaction) be confirmed or undoable? | Undoable without a confirmation dialog, with an undo message after deleting. | Undoable without a confirmation dialog, using the server-side undo from 3.4. After a delete, an undo message appears; it is announced to screen readers, can be reached with the keyboard, and stays until dismissed or the next action. Actions that cannot be undone still require a confirmation dialog. |
| 9.6 | Where does user-facing text live? | In `MessageConstants.ts`, ready for translation later. | Error, status and undo messages live in `MessageConstants.ts`. Static labels and headings may stay in the components that use them. No translation library until translation is actually needed. |

## 10. Performance (P3)

**Today:** there are no `useMemo`, `useCallback` or `memo` calls. Every change to any context re-renders all consumers and recalculates totals across all categories and transactions. The app has no size limits and no measurements.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 10.1 | How much data must the app handle? | 50 categories, 300 line items, and 10k transactions per account. | Targets: 50 categories, 300 line items and 10k transactions per account. The app is built so these limits can grow without a refactor: totals are computed by the API (1.3), the budget is loaded one month at a time, transaction lists are fetched in pages (cursor pagination or date ranges) rather than all at once, and no feature assumes all of a user's data is in the browser. |
| 10.2 | How fast must interactions respond? | Editing a cell updates totals in under 100 ms on a mid-range laptop. | Editing a cell updates the cell and its totals in under 100 ms on a mid-range laptop. Budget-table edits update optimistically (5.3), so this holds regardless of server speed; the server's result replaces the estimate when it arrives. |
| 10.3 | When is memoizing or virtualizing lists required? | Only when measured against 10.2. Tables longer than 200 rows are virtualized. | Re-renders are avoided by structure first: state lives as low in the tree as possible, components read server data through narrow TanStack Query selectors so they only re-render when their own slice changes, contexts stay small and split by concern (3.1), and list rows are separate components keyed by ID. The React Compiler is enabled to memoize automatically; manual `useMemo`, `useCallback` and `memo` are added only when the React Profiler shows a problem. Transaction lists are virtualized from the start (TanStack Virtual). The budget table is not virtualized unless it misses 10.2, since virtualization complicates inline editing and keyboard access (9.2). |
| 10.4 | Is there a JavaScript bundle size limit? | 250 KB gzipped for the first page load, checked in CI. | Yes: 250 KB gzipped of JavaScript for the first page load, checked in CI so a build that exceeds it fails. Server Components (4.1) keep server-only code out of the bundle, Next.js splits code per route automatically, and large or rarely used features (charts, the import flow) load on demand with `next/dynamic`. `@next/bundle-analyzer` is used to find what to trim when the limit is hit. |

## 11. Quality gates and workflow (P2)

**Today:** `tsconfig` has `strict: true` and ESLint uses the `next/core-web-vitals` preset. There's no formatter, no CI and no pre-commit hooks. `config.ts` has three `eslint-disable` comments. Commits look like `task #2: ...`.

| # | Question | Suggested default | Your answer |
| --- | --- | --- | --- |
| 11.1 | What blocks a merge? | `tsc --noEmit`, `next lint`, tests and the build, all run in CI. | `tsc --noEmit`, `next lint`, tests and the build, all run in CI. |
| 11.2 | Are `eslint-disable` comments, `any` and `as` casts allowed? | Only with a comment saying why. No `any` in domain code. | Only with a comment saying why. No `any` in domain code. |
| 11.3 | Which formatter? | Prettier, run by a pre-commit hook. | Prettier, run by a pre-commit hook. |
| 11.4 | Commit and branch convention? | Conventional Commits that reference the speckit feature or task ID. One branch per spec. | Conventional Commits that reference the Spec Kit feature number and task ID, e.g. `feat(003): add split validation [T004]`. One branch per feature, named by Spec Kit (e.g. `003-split-transactions`), merged into `main` by pull request when the spec is complete. When several people work on one feature, they may create task branches off it (e.g. `003-split-transactions--T004-validation`) that merge back into the feature branch by pull request. Spec Kit commands run on the feature branch. The feature branch pulls in `main` regularly to avoid drift. |
| 11.5 | Is a review required for a solo project? | Self-review against a constitution checklist before each merge. | Self-review against a constitution checklist before each merge. |
| 11.6 | Must a feature have a spec before any code is written? | Yes for features. Bug fixes and chores skip specs. | Yes for features. Bug fixes and chores skip specs. |

## 12. Scope and governance (P1)

**Today:** the README's goal is an "affordable, bare-bones budgeting application that supports automatic transaction imports". Bank linking, sorting and filtering, and persistent storage are listed as future work. The constitution template expects semantic versioning (MAJOR.MINOR.PATCH) and ratification dates.

| # | Question | Suggested default | Your answer |  |
| --- | --- | --- | --- | --- |
| 12.1 | What is out of scope for v1? | Shared or multi-user budgets, investments, multiple currencies, a native mobile app. | What is out of scope for v1? | Shared or multi-user budgets, investments, multiple currencies, a native mobile app. |
| 12.2 | Is bank linking (automatic imports) a v1 goal or later? | Later. v1 is manual entry plus CSV import. | Later. v1 is manual entry plus CSV import. IT will be the immediate next goal after the basics required for the frontend and backend of a budgeting app  are completed. |  |
| 12.3 | Who can amend the constitution, and how? | The owner. Changes go through a PR with a version bump and a note on how existing code moves to the new rule. | The owner. Changes go through a PR with a version bump and a note on how existing code moves to the new rule. |  |
| 12.4 | What counts as MAJOR, MINOR and PATCH? | MAJOR = a principle removed or reversed. MINOR = a principle added. PATCH = wording only. | MAJOR = a principle removed or reversed. MINOR = a principle added. PATCH = wording only. |  |
| 12.5 | Does the constitution also cover the backend, or only the UI? | UI only for now, with a separate backend constitution. | UI only for now, with a separate backend constitution. |  |
| 12.6 | Project name for the title? | BudgIT. | BudgIT |  |
