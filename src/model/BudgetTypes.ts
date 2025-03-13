import {Target} from "@/model/Target";

export type Budget = BudgetCategory[];

export type BudgetObject = {
    budget: Budget,
    metadata: {
        totalAvailable: number
    },
}

export type BudgetCategory = {
    categoryName: string,
    lineItems: BudgetLineItem[],
    isSelected: boolean,
}

export type BudgetLineItem = {
    lineItem: string,
    assigned: number,
    activity: number,
    isSelected: boolean,
    isCategoryHeader?: boolean,
    target?: Target,
};

export type SubBudgetLineItem = BudgetLineItem & {
    index: { i: number, j: number }
};

export function newBudgetLineItem(): BudgetLineItem {
    return { lineItem: '', assigned: 0, activity: 0, isSelected: false, isCategoryHeader: false };
}

export function newBudgetCategoryGroup(): BudgetCategory {
    return {
        categoryName: '',
        lineItems: [],
        isSelected: false,
    };
}

export function budgetToLineItemList(budget: Budget): BudgetLineItem[] {
    return budget.flatMap(budgetCategory => {
        const categoryLineItem = generateCategoryLineItem(budgetCategory);
        categoryLineItem.isCategoryHeader = true;
        return [categoryLineItem, ...budgetCategory.lineItems];
    })
}

export function generateCategoryLineItem(budgetCategory: BudgetCategory): BudgetLineItem {
    const categoryLineItem = { lineItem: budgetCategory.categoryName, assigned: 0, activity: 0, isSelected: budgetCategory.isSelected, isCategoryHeader: true };
    return budgetCategory.lineItems.reduce((previousVal, currentValue) => {
        previousVal.activity += currentValue.activity;
        previousVal.assigned += currentValue.assigned;
        return previousVal;
    }, categoryLineItem);
}
