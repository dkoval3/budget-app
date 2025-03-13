import {BudgetAction} from "@/model/history/BudgetHistoryTypes";
import {
    isAddAction,
    isDeleteAction,
    isDeleteCategoryAction,
    isDeleteItemAction, isUpdateAction, isUpdateCategoryAction, isUpdateItemAction
} from "@/model/history/BudgetHistoryTypeGuards";
import {Budget} from "@/model/BudgetTypes";
import {Updater} from "use-immer";

export const applyUndo = (
    modification: BudgetAction,
    updateBudgetObject: Updater<Budget>,
) => {
    const { i, j } = modification.index;
    if (isAddAction(modification)) {
        // Perform an item delete
        if (modification.action === 'item_add') {
            updateBudgetObject(draft => {
                draft[i].lineItems.splice(j, 1);
            });
        } else {
            // Perform a category delete
            updateBudgetObject(draft => {
                draft.splice(i, 1);
            });
        }
    } else if (isDeleteAction(modification)) {
        if (isDeleteItemAction(modification)) {
            // add back the item that was deleted
            updateBudgetObject(draft => { draft[i].lineItems.splice(j, 0, modification.toAdd) });
        } else if (isDeleteCategoryAction(modification)) {
            // add back the category that was deleted
            updateBudgetObject(draft => { draft.splice(i, 0, modification.toAdd) });
        } else {
            throw Error('Invalid action type: ' + modification);
        }
    } else if (isUpdateAction(modification)) {
        // Revert item update
        if (isUpdateItemAction(modification)) {
            updateBudgetObject(draft => {
                draft[i].lineItems[j] = modification.toAdd;
            });
        } else if (isUpdateCategoryAction(modification)) {
            updateBudgetObject(draft => {
                draft[i] = modification.toAdd;
            });
        } else {
            throw Error('Invalid action type: ' + modification);
        }
    } else {
        throw Error('Invalid action type: ' + modification);
    }
};