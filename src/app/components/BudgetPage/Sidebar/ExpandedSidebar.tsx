import ProfileTab from "@/app/components/BudgetPage/Sidebar/ProfileTab/ProfileTab";
import ModeButton from "@/app/components/BudgetPage/Sidebar/ModeButton/ModeButton";
import AccountTypeDropdown from "@/app/components/BudgetPage/Sidebar/AccountTypeDropdown/AccountTypeDropdown";
import Button1 from "@/app/components/Button/Button1";
import {budgetIcon } from "@/app/IconConstants";
import {useState} from "react";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {CASH, CREDIT} from "@/Constants";
import {formatAsDollarAmount} from "@/common/Formatter";

export default function ExpandedSidebar({ setIsMinimized, className }: ExpandedSidebarProps) {
    const [expandCashAccounts, setExpandCashAccounts] = useState(false);
    const [expandCreditAccounts, setExpandCreditAccounts] = useState(false);
    const {displayBudgetPage} = UseBudget();
    return(
        <div className={`${className} relative flex-col h-full w-80`}>
            <div>
                <ProfileTab/>
                <ModeButton iconClass={budgetIcon} message='Budget' onClick={displayBudgetPage}/>
                <ExpandableAccount title='CASH' accountType={CASH} expand={expandCashAccounts} setExpand={setExpandCashAccounts} />
                <ExpandableAccount title={'CREDIT'} accountType={CREDIT} expand={expandCreditAccounts} setExpand={setExpandCreditAccounts} />
                {/*<AccountTypeDropdown expanded={false} accountType='CREDIT' amount={-1419.46}/>*/}
                <Button1 className='mt-4 w-1/2' text='Add Account' iconClass='bi bi-plus-circle-fill'/>
            </div>
            <button className='absolute bottom-0 right-0 mr-4 mb-4 text-neutral-300 hover:text-white text-2xl' onClick={() => setIsMinimized(true)}>
                <i className="bi bi-caret-left-square"></i>
            </button>
        </div>
    );
}

const ExpandableAccount = ({expand, setExpand, title, accountType}: ExpandableAccountProps) => {
    const {accounts, setCurrentAccountIdx, displayAccountsPage, calculateAccountTypeTotal, calculateAccountBalance} = UseBudget();
    const accountTypeTotal = calculateAccountTypeTotal(accountType);
    const accountsToList = accounts.filter(account => account.type === accountType);
    return (
        <div className='hover:cursor-pointer'>
            <AccountTypeDropdown expanded={expand} onClick={() => setExpand(!expand)} accountType={title} amount={accountTypeTotal}/>
            {
                expand
                    ? accountsToList.map((account, i) =>
                        (
                            <div className='flex justify-between hover:cursor-pointer text-sm pl-9 pr-2' key={i} onClick={() => {
                                setCurrentAccountIdx(i);
                                displayAccountsPage();
                            }}>
                                {account.name}
                                <div className='text-xs'>
                                    {formatAsDollarAmount(calculateAccountBalance(account))}
                                </div>
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
    title: string,
    accountType: 'Cash' | 'Credit',
    expand: boolean,
    setExpand: (v: boolean) => void
}