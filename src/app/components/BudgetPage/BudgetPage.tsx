import Sidebar from "@/app/components/BudgetPage/Sidebar/Sidebar";
import RightPanel from "@/app/components/BudgetPage/BudgetContainer/RightPanel";

export default function BudgetPage() {
    return (
        <div className='flex border-2 border-amber-600 h-full w-full'>
            <Sidebar className='p-1 bg-sidebarBackground' />
            <RightPanel className='flex w-full h-full border-2 border-amber-950' />
        </div>
    );
}