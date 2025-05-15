'use client'

import AccountNamePanel from "@/app/components/Accounts/Common/AccountNamePanel";
import BalancePanel from "@/app/components/Accounts/Common/BalancePanel";
import AccountTable from "@/app/components/Accounts/Common/AccountTable";
import {sampleAccounts} from "@/model/Test/SampleCashAccount";
import {getAccountBalance} from "@/common/AccountUtil";
import {FunctionBar} from "@/app/components/Accounts/Common/FunctionBar";

export default function AccountPage({ className }: AccountPageProps) {
    return (
        <div className={`${className} p-3`}>
            <AccountNamePanel account={sampleAccounts[0]} />
            <BalancePanel balance={getAccountBalance(sampleAccounts[0])} />
            <FunctionBar />
            <AccountTable account={sampleAccounts[0]} />
        </div>
    );
}

interface AccountPageProps {
    className?: string
}