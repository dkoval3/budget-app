'use client'

import {useState} from "react";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {isRecurringTarget, MONTHLY, Target, timeframeMessageMap, WEEKLY, YEARLY} from "@/model/Target";
import NoTarget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/NoTarget";
import {formatAsDollarAmount, nextMonthMessage, numToDay} from "@/common/Formatter";
import Button1 from "@/app/components/Button/Button1";
import CreateEditTarget
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/CreateEditTarget";
import {dayIdxToWeekday} from "@/common/DateUtil";

export default function TargetPanel({ className }: TargetPanelProps) {
    const [expandAvailableBalance, setExpandAvailableBalance] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={`${className} flex flex-col w-full h-full p-2 items-center`}>
            <div className='flex flex-col m-1 w-full bg-sidebarBackground rounded-lg'>
                <button className='flex text-sm justify-between p-2' onClick={() => setExpandAvailableBalance(!expandAvailableBalance)} >
                    <div className='flex items-center'>
                        <div className='pr-1'>Target</div>
                        {expandAvailableBalance ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-right"></i>}
                    </div>
                </button>
                { expandAvailableBalance
                    ? <TargetDropdown
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                    : null
                }
                <div>
                </div>
            </div>
        </div>
    );
}

const TargetDropdown = ({ isEditing, setIsEditing }: TargetDropdownProps) => {
    const { target} = UseBudget();
    if (target === undefined && !isEditing) {
        return <NoTarget setIsEditing={setIsEditing} />;
    } else if (isEditing) {
        return <CreateEditTarget setIsEditing={setIsEditing} />;
    } else {
        return <ExpandedTarget setIsEditing={setIsEditing} />;
    }
};

const ExpandedTarget = ({ setIsEditing }: ExpandedTargetProps) => {
    const { subBudget, target } = UseBudget();
    if (target === undefined) return;
    const assigned = subBudget[0].assigned;

    let targetMessage = `${nextMonthMessage(target.type)} ${formatAsDollarAmount(target.amount)} `;
    const dueDateMessage = getDueDateMessage(target);

    const onClick = () => setIsEditing(true);

    if (isRecurringTarget(target)) {
        targetMessage += `each ${timeframeMessageMap[target.timeframe][0]}`;
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
            <Button1 onClick={onClick} className='m-2' text='Edit Target'></Button1>
        </div>
    );
}

const getDueDateMessage = (target: Target) => {
    let dueDateMessage = '';
    if (isRecurringTarget(target)) {
        if (target.timeframe === WEEKLY || target.timeframe === YEARLY) {
            dueDateMessage = `Each ${dayIdxToWeekday(target.due.getDay())}`;
        } else if (target.timeframe === MONTHLY) {
            dueDateMessage = `By the ${numToDay(target.due.getDate())}`;
        } else if (target.timeframe === YEARLY) {
            dueDateMessage = `By ${target.due}`;
        }
    } else {
        if (!!target.due) {
            dueDateMessage = `By ${target.due}`;
        } else {
            dueDateMessage = 'Eventually';
        }
    }
    return dueDateMessage;
}

interface TargetPanelProps {
    className?: string,
}

interface TargetDropdownProps {
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
}

interface ExpandedTargetProps {
    setIsEditing: (isEditing: boolean) => void,
}