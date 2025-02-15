import {Budget} from "@/model/BudgetTypes";

export function isOnlyOneBoxChecked(budget: Budget) {
    return budget
        .flatMap(budgetCategory => budgetCategory.lineItems.map(lineItem => lineItem.isSelected))
        .filter(isSelected => isSelected)
        .length === 1;
}