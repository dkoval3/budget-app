'use client'

import {BudgetTypeahead} from "@/app/components/Common/BudgetTypeahead";
import {CASH, CREDIT} from "@/Constants";
import BudgetButton from "@/app/components/Button/BudgetButton";
import {useState} from "react";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function CreateAccountForm ({ className }: CreateAccountFormProps) {
    const { setShowCreateAccountForm, addAccount } = UseBudget();
    const [accountType, setAccountType] = useState('Cash');
    const [accountName, setAccountName] = useState('');
    const [initialBalance, setInitialBalance] = useState(0);

    const onSubmit = () => {
        if (runValidations(accountType)) {
            alert("Please enter a valid account type");
        } else {
            addAccount(accountName, accountType, initialBalance);
            setShowCreateAccountForm(false);
        }
    };

    return (
        <div className={`w-full h-full backdrop-blur-sm z-50 ${className}`}>
            <div className={`flex flex-col justify-between p-2 items-center bg-sidebarBackground w-1/4 h-1/3 rounded-[5px] ${className}`}>
                <div className='flex'>
                    <h1 className='px-5 font-bold'>Add New Account</h1>
                    <i
                        onClick={() => setShowCreateAccountForm(false)}
                        className="bi bi-x-lg hover:cursor-pointer"></i>
                </div>
                <div>
                <input
                    className='bg-sidebarBackground border-[0.5px] rounded p-1'
                    onChange={(e) => setAccountName(e.target.value)}
                    type='text'
                    placeholder='Account Name' />
                </div>
                <div>
                    <BudgetTypeahead
                        className='bg-sidebarBackground border-[0.5px]'
                        options={[CASH, CREDIT]}
                        onChange={(v) => setAccountType(v)}
                        onSelect={(v) => setAccountType(v)}
                        value={accountType} />
                </div>
                <div>
                    <input
                        className='bg-sidebarBackground border-[0.5px] rounded p-1'
                        onChange={(e) => setInitialBalance(parseFloat(e.target.value))}
                        type='number'
                        placeholder='Initial Balance' />
                </div>
                <div>
                    <BudgetButton
                        className='w-32 bg-green-700 hover:bg-green-600 py-1'
                        onClick={onSubmit}>
                        Submit
                    </BudgetButton>
                </div>
            </div>
        </div>
    );
};

const runValidations = (
    accountType: string
) => {
    return accountType !== CASH && accountType !== CREDIT;
};

interface CreateAccountFormProps {
    className?: string
}