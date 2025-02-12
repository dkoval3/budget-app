export type Budget = BudgetCategory[];

export interface BudgetCategory {
    categoryName: string,
    lineItems: BudgetLineItem[],
}

export class BudgetLineItem {
    lineItem: string;
    assigned: number;
    activity: number;
    isCategoryHeader?: boolean = false;
    isSelected: boolean = false;

    constructor(lineItem: string = '', assigned: number = 0, activity: number = 0) {
        this.lineItem = lineItem;
        this.assigned = assigned;
        this.activity = activity;
    }
}

function budgetLineItemToObject(lineItem: BudgetLineItem) {
    return {
        lineItem: lineItem.lineItem,
        assigned: lineItem.assigned,
        activity: lineItem.activity,
        isCategoryHeader: lineItem.isCategoryHeader ?? false,
    };
}

export function budgetToLineItemList(budget: Budget): BudgetLineItem[] {
    return budget.flatMap(budgetCategory => {
        const categoryLineItem = generateCategoryLineItem(budgetCategory);
        categoryLineItem.isCategoryHeader = true;
        return [categoryLineItem, ...budgetCategory.lineItems];
    })
}

function generateCategoryLineItem(budgetCategory: BudgetCategory): BudgetLineItem {
    const categoryLineItem = { lineItem: budgetCategory.categoryName, assigned: 0, activity: 0, isSelected: false, isCategoryHeader: true };
    return budgetCategory.lineItems.reduce((previousVal, currentValue) => {
        previousVal.activity += currentValue.activity;
        previousVal.assigned += currentValue.assigned;
        return previousVal;
    }, categoryLineItem);
}

export const sampleBudget: Budget = [
    {
        categoryName: 'Needs',
        lineItems: [
            {lineItem: 'Rent', assigned: 1800, activity: 1601, isSelected: false },
            {lineItem: 'Apartment', assigned: 400, activity: 150, isSelected: false},
            {lineItem: 'Groceries', assigned: 450, activity: 100, isSelected: false}
        ],
    },
    {
        categoryName: 'Wants',
        lineItems: [
            {lineItem: 'Restaurants', assigned: 300, activity: 143.23 , isSelected: false},
            {lineItem: 'Fun', assigned: 350, activity: 134, isSelected: false},
            {lineItem: 'Clothes', assigned: 234, activity: 192, isSelected: false}
        ]
    }
];