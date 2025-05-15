import TopPanel from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/TopPanel";
import BudgetPanel from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetPanel";
import AccountPage from "@/app/components/Accounts/AccountPage";

export default function RightPanel({ className }: { className?: string }) {
    const renderAccount = false;

    if (renderAccount) {
        return (
            <div className={`${className} flex flex-col h-full w-full`}>
                <TopPanel />
                <BudgetPanel />
            </div>
        );
    } else {
        return (
            <div className={`${className} flex flex-col h-full w-full`}>
                <AccountPage />
            </div>
        );
    }
}