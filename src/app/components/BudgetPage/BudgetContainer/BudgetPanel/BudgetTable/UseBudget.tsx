'use client'

import React, {RefObject, useContext, useRef, useState} from "react";
import {useImmer} from "use-immer";
import {Budget, BudgetLineItem} from "@/model/BudgetTypes";
import {WritableDraft} from "immer";
import {sampleBudget} from "@/model/SampleBudget";

export const BudgetContext = React.createContext({} as UseBudgetReturnType);

function useBudget() {
    const [budgetObject, updateBudgetObject] = useImmer(sampleBudget);
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

    const subBudgetFromSelected = () => {
        return budgetObject
            .filter(budgetCategory => budgetCategory.isSelected)
            .flatMap(budgetCategory => {
                return budgetCategory.lineItems
                    .filter(lineItem => lineItem.isSelected);
            });
    }

    const isOnlyOneBoxChecked = () => {
        return budgetObject
            .flatMap(budgetCategory => budgetCategory.lineItems.map(lineItem => lineItem.isSelected))
            .filter(isSelected => isSelected)
            .length === 1;
    }

    return {
        budgetObject,
        switchBox,
        switchAllBoxes,
        switchCategoryBoxes,
        switchBoxes,
        updateAssignedValue,
        subBudget: subBudgetFromSelected(),
        isOnlyOneBoxChecked: isOnlyOneBoxChecked(),
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
    headerIsSelected: boolean,
    switchBox: (i: number, j: number) => void,
    switchAllBoxes: () => void,
    switchCategoryBoxes: (i: number) => void,
    switchBoxes: (i: number, j: number, isCategoryHeader: boolean) => void,
    updateAssignedValue: (i: number, j: number, assigned: number) => void,
    inputRef: RefObject<HTMLInputElement | null>,
    subBudget: BudgetLineItem[],
    isOnlyOneBoxChecked: boolean,
}