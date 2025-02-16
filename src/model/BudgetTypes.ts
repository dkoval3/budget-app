import {Target} from "@/model/Target";

export type Budget = BudgetCategory[];

export interface BudgetCategory {
    categoryName: string,
    lineItems: BudgetLineItem[],
    isSelected: boolean,
}

export class BudgetLineItem {
    lineItem: string;
    assigned: number;
    activity: number;
    isSelected: boolean = false;
    isCategoryHeader?: boolean = false;
    target?: Target;

    constructor(lineItem: string = '', assigned: number = 0, activity: number = 0) {
        this.lineItem = lineItem;
        this.assigned = assigned;
        this.activity = activity;
    }
}

export function newBudgetLineItem(): BudgetLineItem {
    return { lineItem: '', assigned: 0, activity: 0, isSelected: false, isCategoryHeader: false };
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

