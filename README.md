# **BudgIT**
BudgIT is a React-based web application for managing your personal finances through flexible budgeting. Many budgeting apps today come with a hefty premium. The goal of this project is to create an affordable, bare-barebones budgeting application that supports automatic transaction imports.
## **Features**

- **Budgeting**
    - Create and maintain a flexible, monthly spending plan
    - Set up monthly spending goals (targets) to help rein in monthly spending
    - Track transactions across accounts, displayed as your "activity" for the month

- **Account Management**
    - Display accounts and their associated transactions.
    - Dynamically calculate and display account balances and totals.
    - Future scope: link cash and debit accounts, and automatically import transactions as they appear on your cards/accounts

- **Intuitive Design**
    - Built with modern libraries: React, Tailwind CSS, and Bootstrap.
    - Fully interactive and responsive for ease of use.

## **Technologies Used**
This project leverages the following technologies and libraries:
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering (SSR) and routing. Because this is a heavily interactive app, SSR is currently limited. In a future release, I would like to increase the use of SSR in this project.
- **Tailwind CSS**: For styling.
- **Bootstrap**: Supplies icons for this project
- **TypeScript**: Used to provide type safety to the codebase and to improve readability

## **Installation**
To run this project locally, follow these steps:
1. **Clone the Repository**:
``` bash
   git clone https://github.com/dkoval3/budget-app.git
   cd budget-app
```
1. **Install Dependencies**: Ensure you have Node.js installed. Then, run:
``` bash
   npm install
```
1. **Start the Development Server**: Launch the app in development mode:
``` bash
   npm run dev
```
1. **Access the App**: Open your browser and navigate to:
``` 
   http://localhost:3000
```

As the project continues, this guide will be updated to explain how to set up the backend as Docker containers.

## **Code Structure**
Here's a brief overview of the primary components and their responsibilities:

| **File/Folder** | **Description**                                                           |
| --- |---------------------------------------------------------------------------|
| **`/components` ** | Contains reusable UI components.       |
| **`/common` ** | Utility functions for formatting and parsing (e.g., `Formatter.ts`).      |
| **`/app/components/Hooks` ** | Custom hook (`UseBudget`) for managing app state and logic.               |
| **`/model` ** | Type definitions and example data structures (e.g., `Account`, `Transaction`). |
### Key Components:
- **`BudgetTable.tsx` **: Displays the user's current budget plan.
- **`AccountTable.tsx` **: Displays the list of transactions for the selected account. Supports inline editing and reactive state updates.
- **`UseBudget.tsx` **: Custom React hook managing the application state. Handles logic for:
    - Managing budget categories and line items, along with their targets.
    - Adding/editing transactions.
    - Selecting accounts or switching views.

## **Sample Data**
The app includes predefined sample data, which can be found in these files:
- **`SampleCashAccount.ts` **: Contains initial accounts and transactions for testing.
- **`SampleBudget.ts` ** : Contains a sample budget, with targets for many line items, for testing.
- Available sample transactions include categories like Rent, Restaurants, Fun, and Groceries.

## **Future Enhancements**
Planned features and enhancements:
- Implement sorting and filtering for transactions.
- Add user login, authentication and persistent storage.
- Increase SSR.

## **Screenshots**

| **Feature** | **Screenshot** |
| --- | --- |
| **Home Screen** |  |
| **Add Transaction** |  |
| **Transaction Table View** |  |
## **Contact**
If you have any questions or feedback, feel free to reach out!
- **Developer**: Dane Koval
- **Email**: [danekoval3@gmail.com](mailto:danekoval3@gmail.com)
- **GitHub**: [https://github.com/dkoval3](https://github.com/dkoval3)
