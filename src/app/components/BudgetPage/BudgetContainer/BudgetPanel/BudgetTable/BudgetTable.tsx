'use client'

import {generateCategoryLineItem} from "@/model/BudgetTypes";
import {BudgetTableProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import UseBudget from "@/app/components/Hooks/UseBudget";
import BudgetRow from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/Rows/BudgetRow";
import BudgetCategoryRow from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/Rows/BudgetCategoryRow";

export default function BudgetTable({ className }: BudgetTableProps) {
    const {
        budgetObject,
        headerIsSelected,
        switchAllBoxes,
        switchBoxes,
    } = UseBudget();

    return (
        <div className='overflow-auto w-full'>
            <table className={`${className} h-full w-full max-h-5`} >
                <thead>
                    <tr className={``}>
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
                                    ? <BudgetCategoryRow onClick={() => switchBoxes(i, j, true)} key={`${i},${j}`} item={lineItem} index={i} />
                                    : <BudgetRow index={{i, j: j -1}} onClick={() => switchBoxes(i, j - 1, false)} key={`${i},${j}`} item={lineItem} />
                            );
                        });
                    })
                }
                </tbody>
            </table>
        </div>
    );
}