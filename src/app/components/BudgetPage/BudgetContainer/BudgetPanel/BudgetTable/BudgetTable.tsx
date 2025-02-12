'use client'

import {Budget, BudgetLineItem, budgetToLineItemList} from "@/model/BudgetTypes";
import {formatAsDollarAmount} from "@/common/Formatter";
import {useImmer} from "use-immer";

const cellStyle = '';
const rowStyle = '';

export default function BudgetTable({ budget, className }: BudgetTableProps) {
    const [budgetList, updateBudgetList] = useImmer(budgetToLineItemList(budget));

    const switchAllBoxes = () => {
        updateBudgetList(draft => {
            draft.forEach(item => item.isSelected = !item.isSelected);
        })
    };

    return (
        <div className='overflow-auto w-full'>
            <table className={`${className} h-full w-full max-h-5`} >
                <thead>
                    <tr className={`${rowStyle}`}>
                        <th className='text-left'>
                            <input onClick={() => switchAllBoxes()} type="checkbox" className='mx-2' />
                            Category
                        </th>
                        <th className='text-right'>Assigned</th>
                        <th className='text-right'>Activity</th>
                        <th className='text-right'>Available</th>
                    </tr>
                </thead>
                <tbody>
                {
                    budgetList.map((lineItem, i) => (
                        lineItem.isCategoryHeader
                            ? <BudgetRow key={i} item={lineItem} isSelected={lineItem.isSelected} className='font-bold text-lg bg-sidebarBackground' />
                            : <BudgetRow key={i} item={lineItem} isSelected={lineItem.isSelected} />
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

const BudgetRow = ({ item, isSelected, className }: BudgetRowProps) => (
    <tr className={`${className} ${rowStyle} text-right border-[0.5px] border-gray-700`}>
        <BudgetCell includeCheckbox={true} isSelected={isSelected} className='text-left' message={item.lineItem}/>
        <BudgetCell message={formatAsDollarAmount(item.assigned)}/>
        <BudgetCell message={formatAsDollarAmount(item.activity)}/>
        <BudgetCell message={formatAsDollarAmount(item.assigned - item.activity)}/>
    </tr>
);

const BudgetCell = ({className, message, includeCheckbox = false, isSelected = false}: BudgetCellProps) =>
    <td className={`${className} ${cellStyle}`}>
        {includeCheckbox ? <input checked={isSelected} onChange={() => {}} type='checkbox' className='mx-2' /> : null}
        {message}
    </td>;

interface BudgetTableProps {
    budget: Budget,
    className?: string,
}

interface BudgetRowProps {
    item: BudgetLineItem,
    className?: string,
    isSelected?: boolean,
}

interface BudgetCellProps {
    className?: string,
    message: string | number,
    includeCheckbox?: boolean,
    isSelected?: boolean,
}
