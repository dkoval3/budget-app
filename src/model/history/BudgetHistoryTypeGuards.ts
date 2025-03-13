import {
    BudgetAction,
    BudgetAddAction, BudgetAddCategoryAction, BudgetAddItemAction,
    BudgetDeleteAction, BudgetDeleteCategoryAction, BudgetDeleteItemAction,
    BudgetUpdateAction, BudgetUpdateCategoryAction, BudgetUpdateItemAction
} from "@/model/history/BudgetHistoryTypes";

export function isAddAction(action: BudgetAction): action is BudgetAddAction {
    return action.action === 'item_add' || action.action === 'category_add';
}

export function isDeleteAction(action: BudgetAction): action is BudgetDeleteAction {
    return action.action === 'item_delete' || action.action === 'category_delete';
}

export function isUpdateAction(action: BudgetAction): action is BudgetUpdateAction {
    return action.action === 'item_update' || action.action === 'category_update';
}

export function isDeleteItemAction(action: BudgetDeleteAction): action is BudgetDeleteItemAction {
    return action.action === 'item_delete';
}

export function isDeleteCategoryAction(action: BudgetDeleteAction): action is BudgetDeleteCategoryAction {
    return action.action === 'category_delete';
}

export function isAddItemAction(action: BudgetAddAction): action is BudgetAddItemAction {
    return action.action === 'item_add';
}

export function isAddCategoryAction(action: BudgetAddAction): action is BudgetAddCategoryAction {
    return action.action === 'category_add';
}

export function isUpdateItemAction(action: BudgetUpdateAction): action is BudgetUpdateItemAction {
    return action.action === 'item_update';
}

export function isUpdateCategoryAction(action: BudgetUpdateAction): action is BudgetUpdateCategoryAction {
    return action.action === 'category_update';
}
