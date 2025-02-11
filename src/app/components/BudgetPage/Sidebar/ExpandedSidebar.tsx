import ProfileTab from "@/app/components/BudgetPage/Sidebar/ProfileTab/ProfileTab";
import ModeButton from "@/app/components/BudgetPage/Sidebar/ModeButton/ModeButton";
import AccountTypeDropdown from "@/app/components/BudgetPage/Sidebar/AccountTypeDropdown/AccountTypeDropdown";
import Button1 from "@/app/components/Button/Button1";
import { accountsIcon, budgetIcon, reflectIcon } from "@/app/IconConstants";

export default function ExpandedSidebar({ setIsMinimized, className }: ExpandedSidebarProps) {
    return(
        <div className={`${className} relative flex-col border-2 h-full w-80`}>
            <div>
                <ProfileTab/>
                <ModeButton iconClass={budgetIcon} message='Budget'/>
                <ModeButton iconClass={reflectIcon} message='Reflect'/>
                <ModeButton iconClass={accountsIcon} message='All Accounts'/>
                <AccountTypeDropdown accountType='Cash' amount={1000}/>
                <AccountTypeDropdown accountType='Credit' amount={-1419.46}/>
                <Button1 className='mt-4 w-1/2' text='Add Account' iconClass='bi bi-plus-circle-fill'/>
            </div>
            <button className='absolute bottom-0 right-0 mr-4 mb-4 text-neutral-300 hover:text-white text-2xl' onClick={() => setIsMinimized(true)}>
                <i className="bi bi-caret-left-square"></i>
            </button>
        </div>
    );
}

interface ExpandedSidebarProps {
    setIsMinimized: (isMinimized: boolean) => void,
    className?: string
}