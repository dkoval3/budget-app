# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BudgIT: a personal budgeting web UI (Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3,
Bootstrap Icons). The backend API is a separate project and isn't in this repo.

## Commands

```bash
npm run dev     # dev server (Turbopack) at http://localhost:3000
npm run build   # production build
npm run lint    # next lint (next/core-web-vitals + next/typescript)
npx tsc --noEmit  # type check (not wired to a script)
```

There's no test framework, test script or tests yet. The constitution specifies Vitest, React
Testing Library and Playwright, but none is installed.

## Spec Kit and the constitution

- This repo uses Spec Kit. Its skills live in `.claude/skills/speckit-*`. Run them in this order:
  `/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`.
  Specs go in `specs/<NNN-feature>/`, on a branch of the same name.
- `.specify/memory/constitution.md` is the **UI constitution**. New and changed code must follow it.
  The backend has its own separate constitution. `docs/constitution-open-questions.md` holds the
  answers the constitution was built from.
- **The existing code predates the constitution and violates much of it.** Examples: float money,
  hard-coded Cognito config, tokens in `localStorage`, one global context, sample data in `src/`,
  duplicate button components, a client-only app, and state-based page switching. Don't copy those
  patterns into new code. Move existing code to the new rules as you touch it, not in a big-bang
  refactor.
- Commits use Conventional Commits with the Spec Kit feature number and task ID, e.g.
  `feat(003): add split validation [T004]`.

## Current architecture

- **Everything renders in the browser.** `src/app/page.tsx` and `src/app/login/page.tsx` are
  `'use client'`. Each one wraps its content in `ConfigProvider` → react-oidc-context `AuthProvider`.
  `page.tsx` then wraps the app in `BudgetProvider`. Auth is checked only in the browser:
  logged-out users are sent to `/login` with `redirect('/login')`.
- **Config:** `config.ts` (repo root) holds per-`NODE_ENV` Cognito/OIDC settings.
  `src/app/components/Hooks/UseBudgetConfig.tsx` picks the settings for the current `NODE_ENV` and
  exposes them through `useBudgetConfig()`.
- **State:** `src/app/components/Hooks/UseBudget.tsx` is one large hook that holds the budget,
  accounts, transactions, cell selection, undo history, the current month/year and which page is
  shown. It's shared through `BudgetContext`. Watch the naming: the internal `useBudget()` creates
  the state, and the **default export `UseBudget()`** is the context consumer that components call.
  All updates use `useImmer`.
- **Navigation** isn't routed. `pageToDisplay` (`BUDGET` / `ACCOUNTS` from `src/Constants.ts`)
  chooses between the budget view and the accounts view inside `BudgetPage`.
- **Data:** state is seeded from `src/model/Test/SampleBudget.ts` and `SampleAccounts.ts`.
  `src/crud-api.ts` contains only placeholder functions that return `Promise.resolve`. Nothing is
  persisted.
- **Budget model** (`src/model/BudgetTypes.ts`): `Budget = BudgetCategory[]`, and each category has
  `lineItems`. Cells are addressed by index pairs `(i, j)` = (category, line item).
  `budgetToLineItemList` flattens the budget into rows, inserting a synthetic header row
  (`isCategoryHeader`) per category. Selection flags (`isSelected`) are stored on the model objects.
- **Undo:** budget edits push `BudgetAction` entries (`src/model/history/`). `applyUndo` in
  `src/common/UndoRedoUtil.ts` reverses them. Transactions and accounts can't be undone. Under the
  constitution, undo moves to the server and `UndoRedoUtil` is removed.
- **Totals** (balances, Amount to Assign, category rollups) are recomputed with `reduce` on every
  render. Nothing is stored.
- **Shared helpers:** `src/common/Formatter.tsx` (money/date formatting), `DateUtil.ts`, and
  `MessageConstants.ts` (user-facing messages).
- **Styling:** custom color tokens are defined in `tailwind.config.ts`. Tailwind's `content` globs
  cover only `src/app`, `src/components` and `src/pages`. Tailwind can't detect class names built at
  runtime (e.g. `` `hover:${color}` `` in `Button1`), so those classes never get generated.
- Path alias: `@/*` → `src/*`.
