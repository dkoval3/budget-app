import {BudgetCategory, BudgetLineItem} from "@/model/BudgetTypes";

export type AbstractBudgetAction = {
    action: 'item_add' | 'item_delete' | 'item_update' | 'category_add' | 'category_delete' | 'category_update',
    index: { i: number, j: number },
};

export type BudgetAddAction = Omit<AbstractBudgetAction, 'action'> & {
    action: 'item_add' | 'category_add',
    toAdd: BudgetLineItem | BudgetCategory,
};

export type BudgetAddItemAction = Omit<BudgetAddAction, 'toAdd' | 'action'> & {
    action: 'item_add',
    toAdd: BudgetLineItem,
};

export type BudgetAddCategoryAction = Omit<BudgetAddAction, 'toAdd' | 'action'> & {
    action: 'category_add',
    toAdd: BudgetCategory,
};

export type BudgetDeleteAction = Omit<AbstractBudgetAction, 'action'> & {
    action: 'item_delete' | 'category_delete',
    toAdd: BudgetLineItem | BudgetCategory,
};

export type BudgetDeleteItemAction = Omit<BudgetAddAction, 'toAdd' | 'action'> & {
    action: 'item_delete',
    toAdd: BudgetLineItem,
};

export type BudgetDeleteCategoryAction = Omit<BudgetAddAction, 'toAdd' | 'action'> & {
    action: 'category_delete',
    toAdd: BudgetCategory,
};

export type BudgetUpdateAction = Omit<AbstractBudgetAction, 'action'> & {
    action: 'item_update' | 'category_update',
    toAdd: BudgetLineItem | BudgetCategory,
};

export type BudgetUpdateItemAction = Omit<BudgetAddAction, 'toAdd' | 'action'> & {
    action: 'item_update',
    toAdd: BudgetLineItem,
};

export type BudgetUpdateCategoryAction = Omit<BudgetAddAction, 'toAdd' | 'action'> & {
    action: 'category_update',
    toAdd: BudgetCategory,
};

export type BudgetAction = BudgetAddAction | BudgetDeleteAction | BudgetUpdateAction;

export type BudgetHistory = BudgetAction[];