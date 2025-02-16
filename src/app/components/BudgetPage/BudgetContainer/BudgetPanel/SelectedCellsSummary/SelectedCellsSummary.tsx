'use client'

import AvailableBalance
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/AvailableBalance";
import TargetPanel from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/Target/TargetPanel";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";

export default function SelectedCellsSummary({className}: SelectedCellsSummaryProps) {
    const { isOnlyOneBoxChecked } = UseBudget();
    return (
        <div className={`${className} flex border-[0.5px] border-gray-700`}>
            <AvailableBalance/>
            { isOnlyOneBoxChecked ? <TargetPanel /> : null }
        </div>
    );
}

interface SelectedCellsSummaryProps {
    className?: string,
}