'use client'

import {useState} from "react";
import {formatAsDollarAmount} from "@/common/Formatter";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import {newBudgetLineItem} from "@/model/BudgetTypes";

const availableBalanceCells = ['Cash Left Over From Last Month', 'Assigned This Month', 'Spending'];

export default function AvailableBalance({ className }: AvailableBalanceProps) {
    const [expandAvailableBalance, setExpandAvailableBalance] = useState(false);
    const { subBudget } = UseBudget();

    const summarizeItems = () => {
        const leftOver = 0;
        const aggregatedLineItem = subBudget.reduce((accumulator, current) => {
            accumulator.activity += current.activity;
            accumulator.assigned += current.assigned;
            return accumulator;
        }, newBudgetLineItem())

        return {
            leftOver: 0,
            assigned: aggregatedLineItem.assigned,
            spending: aggregatedLineItem.activity,
            availableBalance: leftOver + aggregatedLineItem.assigned - aggregatedLineItem.activity,
        }
    }

    const summary = summarizeItems();

    return (
        <div className={`${className} flex flex-col w-full px-2 pt-2 items-center`}>
            <div className='flex justify-between items-center w-full px-2 my-2 mx-5'>
                <div className='text-xl'>{subBudget.length === 1 ? subBudget[0].lineItem : `${subBudget.length} Categories Selected`}</div>
                <i className="bi bi-pencil"></i>
            </div>
            <div className='flex flex-col m-1 w-full bg-sidebarBackground rounded-lg'>
                <button className='flex text-sm justify-between p-2' onClick={() => setExpandAvailableBalance(!expandAvailableBalance)} >
                    <div className='flex items-center'>
                        <div className='pr-1'>Available Balance</div>
                        {expandAvailableBalance ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-right"></i>}
                    </div>
                    <div>{formatAsDollarAmount(summary.availableBalance)}</div>
                </button>
                { expandAvailableBalance
                    ? <AvailableBalancePanel amounts={[summary.leftOver, summary.assigned, summary.spending]} />
                    : null
                }
                <div>
                </div>
            </div>
        </div>
    );
}

const AvailableBalancePanel = ({ className, amounts }: AvailableBalancePanelProps) => (
    <div className={`${className} flex flex-col w-full h-full p-1 border-t-[0.5px] border-gray-700`}>
        { amounts.map((amount, i) => <Cell key={i} message={availableBalanceCells[i]} amount={amount} />) }
    </div>
);

const Cell = ({ message, amount, className }: CellProps) => (
    <div className={`${className} flex justify-between text-sm my-1`}>
        <div className='w-3/5'>{message}</div>
        <div className='flex items-center text-s'>{formatAsDollarAmount(amount)}</div>
    </div>
);

interface AvailableBalanceProps {
    className?: string,
}

interface CellProps {
    message: string,
    amount: number,
    className?: string,
}

interface AvailableBalancePanelProps {
    className?: string,
    amounts: number[],
}