# Data model overview

This app is built around a small set of domain models that are kept in the shared `src/model` folder and then composed together in the central budget state hook (`src/app/components/Hooks/UseBudget.tsx`). The UI mostly treats that hook as the single source of truth for both the budget and account data.

## 1. Core budget model

### `Budget`

Defined in `src/model/BudgetTypes.ts`.

```ts
export type Budget = BudgetCategory[];
```

A budget is an array of categories. Each category contains a name, a selection flag, and a list of line items.

### `BudgetCategory`

```ts
export type BudgetCategory = {
    categoryName: string,
    lineItems: BudgetLineItem[],
    isSelected: boolean,
}
```

Used to group budget line items under a heading like "Needs" or "Wants".

### `BudgetLineItem`

```ts
export type BudgetLineItem = {
    lineItem: string,
    assigned: number,
    activity: number,
    isSelected: boolean,
    isCategoryHeader?: boolean,
    target?: Target,
};
```

This is the actual row in the budget table.

- `lineItem`: the label, such as "Rent" or "Groceries"
- `assigned`: the current monthly assignment / budgeted amount
- `activity`: actual spend or activity for that item
- `isSelected`: row selection state
- `target`: optional goal / target attached to the line item
- `isCategoryHeader`: a flag used when the UI renders a synthetic header row for each category

### Helper functions

`BudgetTypes.ts` also contains helper constructors and flattening utilities:

- `newBudgetLineItem()`
- `newBudgetCategoryGroup()`
- `budgetToLineItemList()`
- `generateCategoryLineItem()`

These are used to create rows and aggregated category totals for display. For example, the table renders `[category summary row, ...category line items]` by building a synthetic header row via `generateCategoryLineItem()`.

### `BudgetObject`

```ts
export type BudgetObject = {
    budget: Budget,
    metadata: {
        totalAvailable: number
    },
}
```

This is a container type used in sample data (`src/model/Test/SampleBudget.ts`). In practice, the runtime state in `UseBudget` stores just the `BudgetCategory[]`, not the `BudgetObject` wrapper.

## 2. Budget target model

Defined in `src/model/Target.ts`.

Targets are attached to a `BudgetLineItem` and describe a spending rule or savings rule.

```ts
export type Target = RecurringTarget | CustomTarget;
```

### `CustomTarget`

```ts
export interface CustomTarget {
    amount: number,
    type: TargetType,
    due?: Date
}
```

Used for one-off or non-recurring targets.

### `RecurringTarget`

```ts
export interface RecurringTarget extends Omit<CustomTarget, 'due'> {
    timeframe: TargetTimeframe,
    due: Date
}
```

Used for repeating targets such as weekly/monthly/yearly goals.

### Target enums and constants

```ts
export const WEEKLY = 'WEEKLY';
export const MONTHLY = 'MONTHLY';
export const YEARLY = 'YEARLY';
export type TargetTimeframe = 'WEEKLY' | 'MONTHLY' | 'YEARLY';
```

```ts
export const FILL_UP = 'FILL_UP';
export const SET_ASIDE = 'SET_ASIDE';
export const HAVE_BALANCE = 'HAVE_BALANCE';
export type TargetType = 'FILL_UP' | 'SET_ASIDE' | 'HAVE_BALANCE';
```

These constants drive target label and message formatting throughout the app.

### How targets are used

- `BudgetLineItem.target?: Target` stores the target on a budget row.
- `UseBudget.addTarget(i, j, target)` attaches or updates a target on a specific line item.
- `UseBudget.target` resolves the selected target when exactly one line item is selected.
- In `BudgetRow.tsx`, the target is used to determine if a row is "on track":

```ts
const target = item.target ?? { amount: Number.MAX_VALUE };
const targetMet = item.assigned >= target.amount;
```

That means a row can be highlighted if its assigned amount reaches the target threshold.

## 3. Account and transaction model

### `Transaction`

Defined in `src/model/Transaction.ts`.

```ts
export type Transaction = {
    id: string,
    checked: boolean,
    date: Date,
    payee: string,
    category: string,
    categoryId: string,
    categoryIdx: number,
    notes: string,
    amount: number,
};
```

The transaction model is the account ledger entry:

- `id`: unique transaction identity
- `checked`: whether the row is selected/edited
- `date`: transaction date
- `payee`: merchant or source
- `category`: category name used for typeahead and display
- `categoryId` / `categoryIdx`: bookkeeping for category linkage
- `notes`: freeform note text
- `amount`: signed amount

`newTransaction(amount = 0)` creates a default blank transaction row with a fresh UUID.

### `Account`

Defined in `src/model/Account.ts`.

```ts
export type Account = {
    id: string,
    name: string,
    type: string,
    linked: boolean,
    transactions: Transaction[],
};
```

An account groups a set of transaction records. A user can switch among accounts in the app, and the current account is stored in `UseBudget`.

### Account calculations

`UseBudget` exposes:

- `calculateAccountBalance(account)`
- `calculateAccountTypeTotal(type)`

These compute totals from the `transactions` array; the account page uses them to render balances.

## 4. Undo/redo history model

Defined in `src/model/history/BudgetHistoryTypes.ts`.

This is not a full app-wide state history model; it only records budget mutations.

### Abstract action

```ts
export type AbstractBudgetAction = {
    action: 'item_add' | 'item_delete' | 'item_update' | 'category_add' | 'category_delete' | 'category_update',
    index: { i: number, j: number },
};
```

The history system tracks the mutated index and the action type, then stores the previous/updated object payload as `toAdd`.

### Example action types

- `BudgetAddAction`
- `BudgetDeleteAction`
- `BudgetUpdateAction`
- `BudgetAction = BudgetAddAction | BudgetDeleteAction | BudgetUpdateAction`
- `BudgetHistory = BudgetAction[]`

The undo logic lives in `src/common/UndoRedoUtil.ts`:

- `item_add` => remove the item from the budget
- `item_delete` => re-insert the item
- `item_update` => restore the prior version of the item/category
- `category_add` => remove the category
- `category_delete` => reinsert the category

This is wired into `UseBudget.undo()` which looks at the latest modification and replays the inverse action.

## 5. Sample data models

### `sampleBudget`

`src/model/Test/SampleBudget.ts` creates a realistic `BudgetObject` with nested category/line-item data. It includes sample targets for items like rent, apartment, restaurants, and fun categories.

This is used as the initial data seed for the budget UI and drives:

- `BudgetTable`
- `BudgetRow`
- `BudgetCategoryRow`
- Summary panels like available balance and amount-to-assign calculations

### `sampleAccounts`

`src/model/Test/SampleAccounts.ts` creates a list of `Account` objects with sample `Transaction[]` data for credit and cash accounts.

These sample accounts populate the Accounts tab and the account page.

## 6. Central state container: `UseBudget`

The main stateful hook lives in `src/app/components/Hooks/UseBudget.tsx`.

It owns and exposes:

- `budgetObject`: the current `BudgetCategory[]`
- `accounts`: the current `Account[]`
- `currentAccount`: currently selected account
- `pageToDisplay`: whether the app is on the budget or accounts screen
- `undoList`: history for budget updates
- selection state (`isSelected`, `headerIsSelected`, etc.)
- month/year navigation state

### Important budget mutations it supports

- `switchBox`, `switchCategoryBoxes`, `switchAllBoxes`
- `updateAssignedValue`
- `updateLineItemName`
- `updateCategoryName`
- `addLineItem`
- `addCategoryGroup`
- `deleteLineItem`
- `deleteCategory`
- `addTarget`
- `undo`

### Important account mutations it supports

- `addAccount`
- `updateAccountName`
- `addTransaction`
- `saveTransaction`
- `deleteTransaction`
- `switchTransactionBox`

This hook is passed via `BudgetContext.Provider` and consumed by almost all UI components.

## 7. Component usage by model

### Budget UI

#### `src/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTable.tsx`

This is the main budget display. It iterates over `budgetObject` and renders each category plus category summary row. It uses:

- `BudgetCategory` to know each category's `lineItems`
- `generateCategoryLineItem()` to create a summary row
- `switchAllBoxes` and `switchBoxes` from `UseBudget` to manage selection state

#### `BudgetRow.tsx`

Renders one `BudgetLineItem` row:

- `item.lineItem` = label
- `item.assigned` = displayed as the budgeted amount
- `item.activity` = actual activity
- `item.target` = used to determine whether goal threshold is met
- `item.isSelected` = checkbox state

#### `BudgetCategoryRow.tsx`

Renders the summary/header row for each category using the category aggregate data.

### Summary / selected cells panels

The summary panels consume the selected subset of the budget state via `UseBudget.subBudget` and `UseBudget.target`.

The app calculates:

- current selected rows
- the associated target if one row is selected
- the total amount to assign
- overall budget balance

This is based on `SubBudgetLineItem[]`, which is created by `subBudgetFromSelected()` in `UseBudget`:

```ts
export type SubBudgetLineItem = BudgetLineItem & {
    index: { i: number, j: number }
};
```

This carries both the line item data and its coordinates in the table so the UI can update the right item.

### Account UI

#### `src/app/components/Accounts/AccountPage.tsx`

Reads:

- `accounts`
- `currentAccountIdx`
- `calculateAccountBalance`

Then renders the selected `Account` and its balance.

#### `src/app/components/Accounts/Common/AccountTable.tsx`

This is the key consumer of `Transaction` objects. It maps `currentAccount.transactions` to rows and allows editing fields such as:

- `date`
- `payee`
- `category`
- `notes`
- `amount`

It uses `BudgetTypeahead` to suggest category names coming from `getAllCategories()`, which is built from the budget's `lineItem` names.

It also calls `saveTransaction()` to persist edited rows back to the account state.

## 8. Derived and supporting types

### `SubBudgetLineItem`

```ts
export type SubBudgetLineItem = BudgetLineItem & {
    index: { i: number, j: number }
};
```

This is a derived shape used when the user selects rows in the budget. It lets the UI identify which specific category/line-item was selected.

### `CreateEditTargetProps`

`src/model/CreateEditTargetProps.ts` defines the input props used by the target editor UI. It is not a persisted app entity, but it describes the form state for editing a `Target`.

This includes:

- `Setters`
- `Values`
- `CreateRecurringTargetProps`
- `CreateCustomTargetProps`

## 9. Summary

The app uses a relatively compact domain model:

- `Budget` + `BudgetCategory` + `BudgetLineItem` for the budget planner
- `Target` for goals attached to budget rows
- `Transaction` + `Account` for ledger/account data
- `BudgetAction` / `BudgetHistory` for undoable mutation tracking

The central hook (`UseBudget`) composes these into a single stateful store and exposes methods so the components can render, edit, and mutate the underlying data without a separate Redux/Zustand store.

