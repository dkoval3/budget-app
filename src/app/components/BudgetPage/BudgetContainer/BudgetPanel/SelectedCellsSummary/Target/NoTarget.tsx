'use client'

import {targetMessage} from "@/common/MessageConstants";
import Button1 from "@/app/components/Button/Button1";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";

export default function NoTarget({ setIsEditing }: { setIsEditing: (isEditing: boolean) => void}) {
    const { subBudget } = UseBudget();
    return (
        <div className='flex flex-col p-2 border-t-[0.5px] border-gray-700'>
            <div className='text-sm m-1'>How much do you need for {subBudget[0].lineItem}?</div>
            <div className='text-xs m-1'>{targetMessage}</div>
            <Button1 onClick={() => setIsEditing(true)} className='m-1' text={'Create Target'}/>
        </div>
    );
}