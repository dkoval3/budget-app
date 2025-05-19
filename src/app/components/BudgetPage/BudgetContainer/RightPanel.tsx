'use client'

import TopPanel from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/TopPanel";
import BudgetPanel from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetPanel";
import AccountPage from "@/app/components/Accounts/AccountPage";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {ACCOUNTS, BUDGET} from "@/Constants";

export default function RightPanel({ className }: { className?: string }) {
    const {pageToDisplay} = UseBudget();

    if (pageToDisplay === BUDGET) {
        return (
            <div className={`${className} flex flex-col h-full w-full`}>
                <TopPanel />
                <BudgetPanel />
            </div>
        );
    } else if (pageToDisplay === ACCOUNTS) {
        return (
            <div className={`${className} flex flex-col h-full w-full`}>
                <AccountPage />
            </div>
        );
    } else {
        return null;
    }
}