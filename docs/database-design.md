# Database technology recommendation

PostgreSQL is a strong fit for this application.

Why PostgreSQL fits this app well:

- The app’s data model is highly structured and relational: users have accounts, accounts have transactions, budget categories contain line items, and line items can have targets.
- The app needs reliable financial calculations with strong integrity guarantees: account balances, month totals, available budget, target tracking, and undoable changes all benefit from transactional consistency.
- The UI already models the data as nested objects, which maps well to normalized relational tables with a few well-defined joins.
- This project is a personal finance app, which usually benefits from relational reporting and aggregate queries more than document-style storage.
- PostgreSQL also has good support for JSONB, which would be useful later if you want to store optional metadata or imported bank-data payloads without disrupting the schema.

If the app later grows into a more complex multi-user SaaS product, PostgreSQL still scales well for this use case and supports indexes, views, reporting, and background jobs.

## Recommended database

- PostgreSQL 15+ is the best default choice.
- Use Prisma, Drizzle, or SQLAlchemy depending on your preferred TypeScript/backend stack.
- If you want to keep the backend simple, Prisma with Next.js is a very natural fit for this app because the object model is already very explicit.

## Proposed relational schema

The schema below reflects the current data models in the app and the likely future needs around monthly budgets and linked accounts.

### 1. users

Stores application users.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Purpose:
- Each money record belongs to a user.
- This keeps the app ready for multi-user or future auth integration.

### 2. accounts

Represents a financial account (cash, credit, checking, etc.).

```sql
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Cash', 'Credit', 'Checking', 'Savings', 'Other')),
  linked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Purpose:
- Matches the current `Account` model.
- Supports future linked-account imports and account-type filtering.

### 3. transactions

Represents transactions recorded for an account.

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  external_id TEXT,
  date DATE NOT NULL,
  payee TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  category_id UUID,
  category_idx INTEGER NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  amount NUMERIC(12,2) NOT NULL,
  checked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Purpose:
- Matches the current `Transaction` model almost exactly.
- `amount` is a decimal to avoid float issues in financial calculations.
- `external_id` is useful for imported bank feeds later.

### 4. budget_cycles

Represents a monthly budget period.

```sql
CREATE TABLE budget_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL,
  total_available NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, year, month)
);
```

Purpose:
- The app tracks a current month/year, so a separate cycle table is useful.
- This aligns with the app’s existing budgeting by month.

### 5. budget_categories

Represents a budget category group, such as “Needs” or “Wants”.

```sql
CREATE TABLE budget_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_cycle_id UUID NOT NULL REFERENCES budget_cycles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_selected BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Purpose:
- Matches `BudgetCategory`.
- `sort_order` keeps category ordering stable.

### 6. budget_line_items

Represents one row under a category, matching `BudgetLineItem`.

```sql
CREATE TABLE budget_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_category_id UUID NOT NULL REFERENCES budget_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  assigned NUMERIC(12,2) NOT NULL DEFAULT 0,
  activity NUMERIC(12,2) NOT NULL DEFAULT 0,
  is_selected BOOLEAN NOT NULL DEFAULT FALSE,
  is_category_header BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Purpose:
- This is the core of the budget planner.
- A synthetic category header is not always required as a persisted row; it can be derived in the app instead of stored.
- The `is_category_header` field is included only if you want to keep the UI model more literal.

### 7. targets

Stores goals attached to line items.

```sql
CREATE TABLE targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_line_item_id UUID NOT NULL UNIQUE REFERENCES budget_line_items(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('FILL_UP', 'SET_ASIDE', 'HAVE_BALANCE')),
  timeframe TEXT CHECK (timeframe IN ('WEEKLY', 'MONTHLY', 'YEARLY')),
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Purpose:
- Matches the current `Target` model.
- `due_date` is nullable because custom targets may not always have a date.
- `timeframe` is nullable because custom targets are not recurring.

### 8. import_jobs

Useful for future bank-feed or CSV import support.

```sql
CREATE TABLE import_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  file_name TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

Purpose:
- This is a good place to store future bank transaction import metadata and audit logs.

## Relationship summary

The mapping to the app’s current model is:

- `users` -> application identity
- `accounts` -> `Account`
- `transactions` -> `Transaction[]`
- `budget_cycles` -> current month/year budget period
- `budget_categories` -> `BudgetCategory[]`
- `budget_line_items` -> `BudgetLineItem[]`
- `targets` -> optional `Target` attached to a line item

## Optional enhancements

### 1. category normalization

Right now the app stores a category string on each transaction and a category name on each budget line item. If you want stronger consistency, you could add a `categories` table and link both transactions and budget items to a canonical category ID.

That would enable:
- shared category dictionaries
- cleaner reporting
- better import matching

### 2. recurring target rules

If recurring targets become more advanced, a separate table may be better than overloading the target row with schedule metadata.

For example:

```sql
CREATE TABLE recurring_target_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_id UUID NOT NULL UNIQUE REFERENCES targets(id) ON DELETE CASCADE,
  timeframe TEXT NOT NULL CHECK (timeframe IN ('WEEKLY', 'MONTHLY', 'YEARLY')),
  due_day INTEGER,
  day_of_week TEXT
);
```

This is optional and not necessary for the current app.

### 3. audit or undo history

The current frontend undo/redo model is lightweight and in-memory. If you want persistent change history or auditability, a table like this would be helpful:

```sql
CREATE TABLE budget_change_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

This is more advanced than the current app needs, but it’s a common pattern for personal finance tools.

## Recommended final design for this app

For the current version of the app, I would start with this minimal but scalable set:

- `users`
- `accounts`
- `transactions`
- `budget_cycles`
- `budget_categories`
- `budget_line_items`
- `targets`

This covers the app’s current domain modeling and leaves room for future import, auth, and reporting features without forcing a more complex schema too early.

## Conclusion

Yes — PostgreSQL is a very good fit for this app.

It matches the current model shape, gives strong financial-data guarantees, and is easy to extend as the product gains more features such as:

- recurring transactions
- importer jobs
- better category normalization
- historical budget tracking
- reporting and exports

If you want, I can also create a second document with:
- a SQL schema dump ready to run in PostgreSQL
- Prisma models matching the tables above
- or a simple entity-relationship diagram in Mermaid format.

