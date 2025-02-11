import TopPanel from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/TopPanel";
import BudgetPanel from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetPanel";

export default function RightPanel({ className }: { className?: string }) {
    return(
        <div className={`${className} flex flex-col h-full w-full`}>
            <TopPanel />
            <BudgetPanel />
        </div>
    );
}