'use client'

import AvailableBalance
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/AvailableBalance";
import TargetPanel from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/TargetPanel";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import {useState} from "react";

export default function SelectedCellsSummary({className}: SelectedCellsSummaryProps) {
    const { isOnlyOneBoxChecked, subBudget, isAnythingSelected } = UseBudget();
    return (
        <div className={`${className} flex border-[0.5px] border-gray-700`}>
            { !isAnythingSelected ? null :
                <div>
                    <CategoryHeader/>
                    <AvailableBalance/>
                    { isOnlyOneBoxChecked ? <TargetPanel /> : null }
                </div>
            }
        </div>
    );
}

const CategoryHeader = ({}) => {
    const { isOnlyOneBoxChecked, subBudget } = UseBudget();
    const [categoryName, setCategoryName] = useState(subBudget[0].lineItem);
    const [isEditing, setIsEditing] = useState(false);

    return(
        <div className='flex justify-between items-center m-2'>
            <div className='text-xl'>{subBudget.length === 1 ? subBudget[0].lineItem : `${subBudget.length} Categories Selected`}</div>
            <i className="bi bi-pencil"></i>
        </div>
    );
}

interface SelectedCellsSummaryProps {
    className?: string,
}