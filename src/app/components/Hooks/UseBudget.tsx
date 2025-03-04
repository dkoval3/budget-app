'use client'

import React, {RefObject, useContext, useRef, useState} from "react";
import {useImmer} from "use-immer";
import {Budget, BudgetCategory, BudgetLineItem, newBudgetCategoryGroup, SubBudgetLineItem} from "@/model/BudgetTypes";
import {WritableDraft} from "immer";
import {sampleBudget} from "@/model/SampleBudget";
import {Target} from "@/model/Target";

export const BudgetContext = React.createContext({} as UseBudgetReturnType);

function useBudget() {
    const [budgetObject, updateBudgetObject] = useImmer<BudgetCategory[]>(sampleBudget.budget);
    const [amountToAssign, setAmountToAssign] = useState(sampleBudget.metadata.amountToAssign);
    const [headerIsSelected, setHeaderIsSelected] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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
        updateBudgetObject(draft => {
            draft[i].lineItems[j].assigned = assigned;
        })
    };

    const getLineItem = (i: number, j: number) => {
        return budgetObject[i].lineItems[j];
    }

    const updateLineItemName = (i: number, j: number, name: string ) => {
        updateBudgetObject(draft => {
            draft[i].lineItems[j].lineItem = name;
        });
    }

    const addTarget = (i: number, j: number, target: Target) => {
        updateBudgetObject(draft => {
            draft[i].lineItems[j].target = target;
        });
    }

    const addLineItem = (i: number, name: string) => {
        updateBudgetObject(draft => {
            draft[i].lineItems.unshift({
                lineItem: name,
                assigned: 0,
                activity: 0,
                isSelected: false,
                isCategoryHeader: false
            });
        });
    }

    const addCategoryGroup = (name: string) => {
        updateBudgetObject(draft => {
            const newGroup = newBudgetCategoryGroup();
            newGroup.categoryName = name;
            draft.push(newGroup);
        });
    };

    const deleteLineItem = (i: number, j: number) => {
        updateBudgetObject(draft => {
           draft[i].lineItems.splice(j, 1);
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

    const subBudget = subBudgetFromSelected();
    const target = subBudget.length === 1 ? subBudget[0]?.target : undefined;

    return {
        budgetObject,
        numberOfCategoryGroups: budgetObject.length,
        amountToAssign,
        setAmountToAssign,
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
    setAmountToAssign: (amount: number) => void,
    getLineItem: (i: number, j: number) => BudgetLineItem,
    switchBox: (i: number, j: number) => void,
    switchAllBoxes: () => void,
    switchCategoryBoxes: (i: number) => void,
    switchBoxes: (i: number, j: number, isCategoryHeader: boolean) => void,
    updateAssignedValue: (i: number, j: number, assigned: number) => void,
    updateLineItemName: (i: number, j: number, name: string) => void,
    addLineItem: (i: number, name: string) => void,
    addCategoryGroup: (name: string) => void,
    deleteLineItem: (i: number, j: number) => void,
    addTarget: (i: number, j: number, target: Target) => void,
    inputRef: RefObject<HTMLInputElement | null>,
    subBudget: SubBudgetLineItem[],
    target?: Target,
    isOnlyOneBoxChecked: boolean,
    isAnythingSelected: boolean,
}