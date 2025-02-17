'use client'

import {useState} from "react";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import {Target, timeframeMessageMap} from "@/model/Target";
import NoTarget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/NoTarget";
import {formatAsDollarAmount, numToDay} from "@/common/Formatter";

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
                { expandAvailableBalance ? <TargetDropdown categoryName={subBudget[0].lineItem} target={subBudget[0].target} assigned={subBudget[0].assigned} /> : null }
                <div>
                </div>
            </div>
        </div>
    );
}

const TargetDropdown = ({ categoryName, target, assigned }: TargetDropdownProps) => {
    if (target === undefined) {
        return <NoTarget categoryName={categoryName}/>
    }
    return (<ExpandedTarget {...{ target, assigned }} />);
};

const ExpandedTarget = ({ target, assigned }: ExpandedTargetProps) => {
    let targetMessage = `${target.type} another ${formatAsDollarAmount(target.amount)} `;
    let dueDateMessage = 'Eventually'

    if ('timeframe' in target) {
        targetMessage += `each ${timeframeMessageMap[target.timeframe][0]}`;
        dueDateMessage = `${timeframeMessageMap[target.timeframe][1]} ${ typeof(target.due) === 'number'
            ? numToDay(target.due)
            : target.due
        }`;
    }

    return(
        <div className='flex flex-col text-xs border-t-[0.5px] border-gray-700'>
            <div className='p-1'>{targetMessage}</div>
            <div className='p-1'>{dueDateMessage}</div>
            <div className='p-1'>Needed: {formatAsDollarAmount(target.amount)}</div>
            <div className='p-1'>Current assigned: {formatAsDollarAmount(assigned)}</div>
            <div className='p-1'>
                { assigned >= target.amount
                    ? 'You have met your target!'
                    : `You need to assign ${formatAsDollarAmount(target.amount - assigned)} more to meet your target`
                }
            </div>
        </div>
    );
}

interface TargetPanelProps {
    className?: string,
}

interface TargetDropdownProps {
    categoryName: string,
    target?: Target,
    assigned: number,
}

interface ExpandedTargetProps {
    target: Target,
    assigned: number
}