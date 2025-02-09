import Sidebar from "@/app/components/BudgetPage/Sidebar/Sidebar";
import BudgetContainer from "@/app/components/BudgetPage/BudgetContainer/BudgetContainer";

export default function BudgetPage() {
    return (
        <div className='flex border-2 border-amber-600 h-full w-full'>
            <Sidebar className='flex-shrink-0' />
            <BudgetContainer className='flex w-full h-full border-2 border-amber-950' />
        </div>
    );
}