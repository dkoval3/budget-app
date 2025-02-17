'use client'

import {targetMessage} from "@/common/MessageConstants";
import Button1 from "@/app/components/Button/Button1";
import {useState} from "react";
import CreateEditTarget
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/CreateEditTarget";

export default function NoTarget({ categoryName }: { categoryName: string }) {
    const [createTarget, setCreateTarget] = useState(false);
    if (createTarget) {
        return <CreateEditTarget context='create' />
    }
    return (
        <div className='flex flex-col p-2 border-t-[0.5px] border-gray-700'>
            <div className='text-sm m-1'>How much do you need for {categoryName}?</div>
            <div className='text-xs m-1'>{targetMessage}</div>
            <Button1 onClick={() => setCreateTarget(true)} className='m-1' text={'Create Target'}/>
        </div>
    );
}