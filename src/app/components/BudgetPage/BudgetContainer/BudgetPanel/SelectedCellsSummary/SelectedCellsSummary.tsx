'use client'

import AvailableBalance
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/AvailableBalance";
import TargetPanel from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/TargetPanel";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {ChangeEvent, useState} from "react";
import EditItemPopup from "@/app/components/Accounts/Common/EditNamePopup";

export default function SelectedCellsSummary({className}: SelectedCellsSummaryProps) {
    const { isOnlyOneBoxChecked, isAnythingSelected } = UseBudget();
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
    const { isOnlyOneBoxChecked, subBudget, updateLineItemName, deleteLineItem } = UseBudget();
    const [isEditing, setIsEditing] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState(subBudget[0].lineItem);

    const onOk = () => {
        updateLineItemName(subBudget[0].index.i, subBudget[0].index.j, newCategoryName);
        setIsEditing(false);
    }

    const onDelete = () => {
        deleteLineItem(subBudget[0].index.i, subBudget[0].index.j);
        setIsEditing(false);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setNewCategoryName(e.target.value);

    return(
        <div className='relative'>
            <div className='flex justify-between items-center m-2'>
                <div className={'flex flex-col'}>
                    <div className='text-xl'>{subBudget.length === 1 ? subBudget[0].lineItem : `${subBudget.length} Categories Selected`}</div>
                    { subBudget.length > 1
                        ? <div className='text-xs mt-2'>{subBudget.map(item => item.lineItem).join(', ')}</div>
                        : null
                    }
                </div>
                { isOnlyOneBoxChecked
                    ?
                    <button>
                        <i className="bi bi-pencil" onClick={() => setIsEditing(v => !v)}></i>
                    </button>
                    : null
                }
            </div>
            { isEditing
                ? <EditItemPopup
                    itemName={newCategoryName}
                    onCancel={() => setIsEditing(false)}
                    onChange={onChange}
                    onDelete={onDelete}
                    onOk={onOk} />
                : null }
        </div>
    );
}

interface SelectedCellsSummaryProps {
    className?: string,
}