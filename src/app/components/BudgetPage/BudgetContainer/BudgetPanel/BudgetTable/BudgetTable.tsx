'use client'

import {Budget, BudgetLineItem, generateCategoryLineItem} from "@/model/BudgetTypes";
import {formatAsDollarAmount} from "@/common/Formatter";
import {useImmer} from "use-immer";
import {useState} from "react";
import {WritableDraft} from "immer";

const cellStyle = '';
const rowStyle = '';

export default function BudgetTable({ budget, className }: BudgetTableProps) {
    const [budgetObject, updateBudgetObject] = useImmer(budget);
    const [headerIsSelected, setHeaderIsSelected] = useState(false);

    const BudgetCell = ({className, message, includeCheckbox = false, isSelected = false, onClick = () => {}}: BudgetCellProps) => (
        <td className={`${className} ${cellStyle}`}>
            {includeCheckbox ? <input checked={isSelected} onClick={onClick} onChange={() => {}} type='checkbox' className='mx-2' /> : null}
            {message}
        </td>
    );

    const BudgetRow = ({ item, isSelected, onClick, className }: BudgetRowProps) => (
        <tr className={`${className} ${rowStyle} text-right border-[0.5px] border-gray-700`}>
            <BudgetCell includeCheckbox={true} onClick={onClick} isSelected={isSelected} className='text-left' message={item.lineItem}/>
            <BudgetCell message={formatAsDollarAmount(item.assigned)}/>
            <BudgetCell message={formatAsDollarAmount(item.activity)}/>
            <BudgetCell message={formatAsDollarAmount(item.assigned - item.activity)}/>
        </tr>
    );

    const switchAllBoxes = () => {
        updateBudgetObject(draft => {
            draft.forEach(budgetCategory => {
                budgetCategory.isSelected = !headerIsSelected;
                budgetCategory.lineItems.forEach(lineItem => {
                    lineItem.isSelected = !headerIsSelected;
                });
            });
            setHeaderIsSelected(!headerIsSelected);
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
                draft[i].isSelected = true
            } else if (!draft[i].lineItems.some(item => item.isSelected)) {
                draft[i].isSelected = false;
            }
            updateHeaderIsSelected(draft);
        });
    }

    const updateHeaderIsSelected = (budgetDraft: WritableDraft<Budget>) => {
        const anySelected = budgetDraft.some(category => category.isSelected);
        setHeaderIsSelected(anySelected);
    }

    const onCheckboxClick = (i: number, j: number, isCategoryHeader: boolean) => isCategoryHeader ? switchCategoryBoxes(i) : switchBox(i, j);

    return (
        <div className='overflow-auto w-full'>
            <table className={`${className} h-full w-full max-h-5`} >
                <thead>
                    <tr className={`${rowStyle}`}>
                        <th className='text-left'>
                            <input
                                onClick={() => switchAllBoxes()}
                                checked={headerIsSelected}
                                type="checkbox"
                                className='mx-2' />
                            Category
                        </th>
                        <th className='text-right'>Assigned</th>
                        <th className='text-right'>Activity</th>
                        <th className='text-right'>Available</th>
                    </tr>
                </thead>
                <tbody>
                {
                    budgetObject.map((budgetCategory, i) => {
                        const categoryLineItem = generateCategoryLineItem(budgetCategory);
                        return [categoryLineItem, ...budgetCategory.lineItems].map((lineItem, j) => {
                            return (
                                lineItem.isCategoryHeader
                                    ? <BudgetRow onClick={() => onCheckboxClick(i, j, true)} key={`${i},${j}`} item={lineItem} isSelected={lineItem.isSelected} className='font-bold text-lg bg-sidebarBackground' />
                                    : <BudgetRow onClick={() => onCheckboxClick(i, j - 1, false)} key={`${i},${j}`} item={lineItem} isSelected={lineItem.isSelected} />
                            );
                        });
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

interface BudgetTableProps {
    budget: Budget,
    className?: string,
}

interface BudgetRowProps {
    item: BudgetLineItem,
    className?: string,
    isSelected?: boolean,
    onClick?: () => void,
}

interface BudgetCellProps {
    className?: string,
    message: string | number,
    includeCheckbox?: boolean,
    isSelected?: boolean,
    onClick?: () => void,
}
