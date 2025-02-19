'use client'

import AvailableBalance
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/AvailableBalance";
import TargetPanel from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/TargetPanel";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import {useState} from "react";

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
    const { isOnlyOneBoxChecked, subBudget } = UseBudget();
    const [isEditing, setIsEditing] = useState(false);

    return(
        <div className='relative'>
            <div className='flex justify-between items-center m-2'>
                <div className='text-xl'>{subBudget.length === 1 ? subBudget[0].lineItem : `${subBudget.length} Categories Selected`}</div>
                { isOnlyOneBoxChecked
                    ?
                    <button>
                        <i className="bi bi-pencil" onClick={() => setIsEditing(v => !v)}></i>
                    </button>
                    : null
                }
            </div>
            { isEditing ? <EditCategoryName categoryName={subBudget[0].lineItem} setIsEditing={setIsEditing} /> : null }
        </div>
    );
}

const EditCategoryName = ({ categoryName, setIsEditing }: EditCategoryNameProps) => {
    const { subBudget, updateLineItemName, deleteLineItem } = UseBudget();
    const [newCategoryName, setNewCategoryName] = useState(categoryName);

    const onOk = () => {
        updateLineItemName(subBudget[0].index.i, subBudget[0].index.j, newCategoryName);
        setIsEditing(false);
    }

    const onCancel = () => setIsEditing(false);

    const onDelete = () => {
        deleteLineItem(subBudget[0].index.i, subBudget[0].index.j);
        setIsEditing(false);
    };

    return(
        <div className='flex flex-col bg-sidebarBackground absolute p-4 m-2 w-[22rem] translate-x-[-7.7rem] translate-y-[-0.5rem] rounded-xl'>
            <input type='text'
                   className='bg-buttonHover mb-4 p-1 rounded'
                   autoFocus={true}
                   defaultValue={categoryName}
                   onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className='flex justify-between'>
                <div className='flex'>
                    <EditCategoryButton className='bg-buttonHover mr-2' message='Hide'/>
                    <EditCategoryButton onClick={onDelete} className='bg-red-900' message='Delete'/>
                </div>
                <div className='flex'>
                    <EditCategoryButton onClick={onCancel} className='bg-buttonHover mr-2' message='Cancel'/>
                    <EditCategoryButton onClick={onOk} className='bg-button' message='OK'/>
                </div>
            </div>
        </div>
    )
}

const EditCategoryButton = ({ className, message, onClick }: EditCategoryButtonProps) => {
    return <button
        className={`${className} px-3 py-2 bg-blue-900 rounded-lg`}
        onClick={onClick}>
        {message}
    </button>
}

interface SelectedCellsSummaryProps {
    className?: string,
}

interface EditCategoryButtonProps {
    className?: string,
    message: string,
    onClick?: () => void,
}

interface EditCategoryNameProps {
    categoryName: string,
    setIsEditing: (isEditing: boolean) => void,
}