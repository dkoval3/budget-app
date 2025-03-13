'use client'

import React, {RefObject, useContext, useRef, useState} from "react";
import {useImmer} from "use-immer";
import {
    Budget,
    BudgetCategory,
    BudgetLineItem,
    newBudgetCategoryGroup,
    SubBudgetLineItem
} from "@/model/BudgetTypes";
import {WritableDraft} from "immer";
import {sampleBudget} from "@/model/SampleBudget";
import {Target} from "@/model/Target";
import {
    BudgetAction,
    BudgetHistory,
} from "@/model/history/BudgetHistoryTypes";
import {applyUndo} from "@/common/UndoRedoUtil";

export const BudgetContext = React.createContext({} as UseBudgetReturnType);

const calculateTotalAssigned = (budgetObject: Budget) => {
    return budgetObject.reduce((categoryAccumulator, categoryCurrent) => {
        return categoryAccumulator + categoryCurrent.lineItems.reduce((itemAccumulator, itemCurrent) => {
            return itemAccumulator + itemCurrent.assigned;
        }, 0);
    }, 0);
};

function useBudget() {
    const [budgetObject, updateBudgetObject] = useImmer<BudgetCategory[]>(sampleBudget.budget);
    const [headerIsSelected, setHeaderIsSelected] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [undoList, updateUndoList] = useImmer<BudgetHistory>([]);

    const switchBoxes = (i: number, j: number, isCategoryHeader: boolean) => isCategoryHeader ? switchCategoryBoxes(i) : switchBox(i, j);

    const switchAllBoxes = () => {
        updateBudgetObject(draft => {
            draft.forEach(budgetCategory => {
                budgetCategory.isSelected = !headerIsSelected;
                budgetCategory.lineItems.forEach(lineItem => {
                    lineItem.isSelected = !headerIsSelected;
                });
            });
            updateHeaderIsSelected(draft);
        })
    };

    const switchCategoryBoxes = (i: number) => {
        updateBudgetObject(draft => {
            draft[i].isSelected = !draft[i].isSelected;
            draft[i].lineItems.forEach(lineItem => {
                lineItem.isSelected = draft[i].isSelected;
            });
            updateHeaderIsSelected(draft);
        });
    };

    const switchBox = (i: number, j: number) => {
        updateBudgetObject(draft => {
            draft[i].lineItems[j].isSelected = !draft[i].lineItems[j].isSelected;
            if (draft[i].lineItems[j].isSelected) {
                draft[i].isSelected = true;
            } else if (!draft[i].lineItems.some(item => item.isSelected)) {
                draft[i].isSelected = false;
            }
            updateHeaderIsSelected(draft)
        });
    }

    const updateHeaderIsSelected = (draft: WritableDraft<Budget>) => {
        const anySelected = draft.some(category => category.isSelected);
        setHeaderIsSelected(anySelected);
    }

    const updateAssignedValue = (i: number, j: number, assigned: number) => {
        addToUndoList({ action: 'item_update', toAdd: budgetObject[i].lineItems[j], index: { i, j } });
        updateBudgetObject(draft => {
            draft[i].lineItems[j].assigned = assigned;
        })
    };

    const getLineItem = (i: number, j: number) => {
        return budgetObject[i].lineItems[j];
    }

    const updateLineItemName = (i: number, j: number, name: string ) => {
        addToUndoList({ action: 'item_update', toAdd: budgetObject[i].lineItems[j], index: { i, j } });
        updateBudgetObject(draft => {
            draft[i].lineItems[j].lineItem = name;
        });
    }

    const addTarget = (i: number, j: number, target: Target) => {
        addToUndoList({ action: 'item_update', toAdd: budgetObject[i].lineItems[j], index: { i, j } });
        updateBudgetObject(draft => {
            draft[i].lineItems[j].target = target;
        });
    }

    const addLineItem = (i: number, name: string) => {
        const toAdd = {
            lineItem: name,
            assigned: 0,
            activity: 0,
            isSelected: false,
            isCategoryHeader: false
        };
        updateBudgetObject(draft => {
            draft[i].lineItems.unshift(toAdd)
        });
        addToUndoList({ toAdd, action: 'item_add', index: { i, j: budgetObject[i].lineItems.length - 1 }});
    }

    const addCategoryGroup = (name: string) => {
        updateBudgetObject(draft => {
            const newGroup = newBudgetCategoryGroup();
            newGroup.categoryName = name;
            draft.push(newGroup);
        });
        addToUndoList({
            action: 'category_add',
            index: { i: budgetObject.length, j: -1 },
            toAdd: {} as BudgetCategory,
        });
    };

    const deleteLineItem = (i: number, j: number) => {
        updateBudgetObject(draft => {
           draft[i].lineItems.splice(j, 1);
        });
        addToUndoList({
            action: 'item_delete',
            index: { i, j },
            toAdd: budgetObject[i].lineItems[j]
        });
    }

    function subBudgetFromSelected(): SubBudgetLineItem[] {
        const subBudget: SubBudgetLineItem[] = budgetObject.flatMap((budgetCategory, i) => {
            return budgetCategory.lineItems.flatMap((lineItem, j) => {
                return {...lineItem, index: { i, j }};
            });
        });
        return subBudget.filter(item => item.isSelected);
    }

    const isOnlyOneBoxChecked = () => {
        return budgetObject
            .flatMap(budgetCategory => budgetCategory.lineItems.map(lineItem => lineItem.isSelected))
            .filter(isSelected => isSelected)
            .length === 1;
    }

    const isAnythingSelected = () => {
        return budgetObject.some(budgetCategory => budgetCategory.isSelected);
    };

    const addToUndoList = (modification: BudgetAction) => {
        updateUndoList(draft => {
            draft.push(modification);
        });
    };
    const popFromUndoList = () => {
        updateUndoList(draft => {
            draft.pop();
        });
    };

    const undo = () => {
        if (undoList.length === 0) return;
        const modification = undoList[undoList.length - 1];
        applyUndo(modification, updateBudgetObject)
        popFromUndoList();
    };

    const subBudget = subBudgetFromSelected();
    const target = subBudget.length === 1 ? subBudget[0]?.target : undefined;

    return {
        budgetObject,
        numberOfCategoryGroups: budgetObject.length,
        amountToAssign: sampleBudget.metadata.totalAvailable - calculateTotalAssigned(budgetObject),
        undo,
        getLineItem,
        switchBox,
        switchAllBoxes,
        switchCategoryBoxes,
        switchBoxes,
        updateAssignedValue,
        updateLineItemName,
        addLineItem,
        addCategoryGroup,
        deleteLineItem,
        addTarget,
        target,
        subBudget,
        isOnlyOneBoxChecked: isOnlyOneBoxChecked(),
        isAnythingSelected: isAnythingSelected(),
        headerIsSelected,
        inputRef,
    };
}

export function BudgetProvider({ children }: { children: React.ReactNode }) {
    const value = useBudget();
    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
}

export default function UseBudget() {
    return useContext(BudgetContext);
}

interface UseBudgetReturnType {
    budgetObject: Budget,
    numberOfCategoryGroups: number
    headerIsSelected: boolean,
    amountToAssign: number,
    getLineItem: (i: number, j: number) => BudgetLineItem,
    switchBox: (i: number, j: number) => void,
    switchAllBoxes: () => void,
    switchCategoryBoxes: (i: number) => void,
    switchBoxes: (i: number, j: number, isCategoryHeader: boolean) => void,
    updateAssignedValue: (i: number, j: number, assigned: number) => void,
    updateLineItemName: (i: number, j: number, name: string) => void,
    addLineItem: (i: number, name: string) => void,
    undo: () => void,
    addCategoryGroup: (name: string) => void,
    deleteLineItem: (i: number, j: number) => void,
    addTarget: (i: number, j: number, target: Target) => void,
    inputRef: RefObject<HTMLInputElement | null>,
    subBudget: SubBudgetLineItem[],
    target?: Target,
    isOnlyOneBoxChecked: boolean,
    isAnythingSelected: boolean,
}