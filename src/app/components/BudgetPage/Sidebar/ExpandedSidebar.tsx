import ProfileTab from "@/app/components/BudgetPage/Sidebar/ProfileTab/ProfileTab";
import ModeButton from "@/app/components/BudgetPage/Sidebar/ModeButton/ModeButton";
import AccountTypeDropdown from "@/app/components/BudgetPage/Sidebar/AccountTypeDropdown/AccountTypeDropdown";
import Button1 from "@/app/components/Button/Button1";
import {budgetIcon } from "@/app/IconConstants";
import {useState} from "react";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function ExpandedSidebar({ setIsMinimized, className }: ExpandedSidebarProps) {
    const [expandAccounts, setExpandAccounts] = useState(false);
    const {displayBudgetPage} = UseBudget();
    return(
        <div className={`${className} relative flex-col h-full w-80`}>
            <div>
                <ProfileTab/>
                <ModeButton iconClass={budgetIcon} message='Budget' onClick={displayBudgetPage}/>
                <ExpandableAccount accountType='CASH' expand={expandAccounts} setExpand={setExpandAccounts} />
                <AccountTypeDropdown accountType='CREDIT' amount={-1419.46}/>
                <Button1 className='mt-4 w-1/2' text='Add Account' iconClass='bi bi-plus-circle-fill'/>
            </div>
            <button className='absolute bottom-0 right-0 mr-4 mb-4 text-neutral-300 hover:text-white text-2xl' onClick={() => setIsMinimized(true)}>
                <i className="bi bi-caret-left-square"></i>
            </button>
        </div>
    );
}

const ExpandableAccount = ({expand, setExpand, accountType}: ExpandableAccountProps) => {
    const {accounts, setCurrentAccountIdx, displayAccountsPage} = UseBudget();
    return (
        <div className='hover:cursor-pointer'>
            <AccountTypeDropdown onClick={() => setExpand(!expand)} accountType={accountType} amount={1000}/>
            {
                expand
                    ? accounts.map((account, i) =>
                        (
                            <div className='hover:cursor-pointer text-sm px-9' key={i} onClick={() => {
                                setCurrentAccountIdx(i);
                                displayAccountsPage();
                            }}>
                                {account.name}
                            </div>))
                    : null
            }
        </div>
    );
};

interface ExpandedSidebarProps {
    setIsMinimized: (isMinimized: boolean) => void,
    className?: string
}

interface ExpandableAccountProps {
    accountType: string,
    expand: boolean,
    setExpand: (v: boolean) => void
}