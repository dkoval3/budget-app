import Sidebar from "@/app/components/BudgetPage/Sidebar/Sidebar";
import RightPanel from "@/app/components/BudgetPage/BudgetContainer/RightPanel";
import CreateAccountForm from "@/app/components/Accounts/Common/CreateAccountForm";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function BudgetPage() {
    const { showCreateAccountForm } = UseBudget();
    return (
        <div className='absolute flex h-full w-full'>
            {
                showCreateAccountForm
                    ? <CreateAccountForm className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
                    : null
            }
            <Sidebar className='p-1 bg-sidebarBackground' />
            <RightPanel className='flex w-full h-full' />
        </div>
    );
}