import SummaryPanel from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/SummaryPanel";

export default function BudgetContainer({ className }: { className?: string }) {
    return(
        <div className={className}>
            <SummaryPanel />
        </div>
    );
}