import {BudgetLineItem} from "@/model/BudgetTypes";
import {RefObject} from "react";

export interface BudgetTableProps {
    className?: string,
}

export interface BudgetRowProps {
    item: BudgetLineItem,
    index: {i: number, j: number},
    className?: string,
    onClick?: () => void,
}

export interface BudgetCategoryRowProps {
    item: BudgetLineItem,
    index: number,
    className?: string,
    onClick?: () => void,
}

export interface BudgetCellProps {
    className?: string,
    index: { i: number, j: number},
    includeAddIcon?: boolean,
    // ref: RefObject<HTMLInputElement>,
    message: string | number,
    includeCheckbox?: boolean,
    isSelected?: boolean,
    onClick?: () => void,
}
