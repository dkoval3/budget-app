'use client'

import AccountNamePanel from "@/app/components/Accounts/Common/AccountNamePanel";
import BalancePanel from "@/app/components/Accounts/Common/BalancePanel";
import AccountTable from "@/app/components/Accounts/Common/AccountTable";
import {sampleAccounts} from "@/model/Test/SampleAccounts";
import {FunctionBar} from "@/app/components/Accounts/Common/FunctionBar";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function AccountPage({ className }: AccountPageProps) {
    const {calculateAccountBalance, currentAccountIdx} = UseBudget();
    return (
        <div className={`${className} p-3`}>
            <AccountNamePanel account={sampleAccounts[currentAccountIdx]} />
            <BalancePanel balance={calculateAccountBalance(sampleAccounts[currentAccountIdx])} />
            <FunctionBar />
            <AccountTable />
        </div>
    );
}

interface AccountPageProps {
    className?: string
}