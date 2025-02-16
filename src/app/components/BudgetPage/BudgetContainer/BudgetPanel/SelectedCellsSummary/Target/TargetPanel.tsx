'use client'

import {useState} from "react";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import {Target} from "@/model/Target";
import NoTarget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/NoTarget";

export default function TargetPanel({ className }: TargetPanelProps) {
    const [expandAvailableBalance, setExpandAvailableBalance] = useState(false);
    const { subBudget } = UseBudget();

    return (
        <div className={`${className} flex flex-col w-full h-full p-2 items-center`}>
            <div className='flex flex-col m-1 w-full bg-sidebarBackground rounded-lg'>
                <button className='flex text-sm justify-between p-2' onClick={() => setExpandAvailableBalance(!expandAvailableBalance)} >
                    <div className='flex items-center'>
                        <div className='pr-1'>Target</div>
                        {expandAvailableBalance ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-right"></i>}
                    </div>
                </button>
                { expandAvailableBalance ? <TargetDropdown categoryName={subBudget[0].lineItem} target={subBudget[0].target} /> : null }
                <div>
                </div>
            </div>
        </div>
    );
}

const TargetDropdown = ({ categoryName, target }: TargetDropdownProps) => {
    if (target === undefined) {
        return <NoTarget categoryName={categoryName}/>
    }
    return(<div></div>);
};

interface TargetPanelProps {
    className?: string,
}

interface TargetDropdownProps {
    categoryName: string,
    target?: Target
}