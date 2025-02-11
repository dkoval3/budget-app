export type Budget = BudgetCategory[];

export interface BudgetCategory {
    categoryName: string,
    lineItems: BudgetLineItem[],
}

export class BudgetLineItem {
    lineItem: string;
    assigned: number;
    activity: number;

    constructor(lineItem: string = '', assigned: number = 0, activity: number = 0) {
        this.lineItem = lineItem;
        this.assigned = assigned;
        this.activity = activity;
    }
}

export const sampleBudget: Budget = [
    {
        categoryName: 'Needs',
        lineItems: [
            new BudgetLineItem('Rent', 1800, 1601),
            new BudgetLineItem('Apartment', 400, 150),
            new BudgetLineItem('Groceries', 450, 100),
        ],
    },
    {
        categoryName: 'Wants',
        lineItems: [
            new BudgetLineItem('Restaurants', 300, 143.23),
            new BudgetLineItem('Fun', 350, 134),
            new BudgetLineItem('Clothes', 234, 192),
        ]
    }
];