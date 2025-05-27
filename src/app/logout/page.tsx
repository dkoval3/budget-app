'use client'

import {redirect, RedirectType} from "next/navigation";
import BudgetButton from "@/app/components/Button/BudgetButton";

export default function LogoutRedirect() {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            User is logged out

            <BudgetButton
                className='px-2 py-1 mt-3'
                onClick={() => redirect('/', RedirectType.replace)}>
                Back to Login
            </BudgetButton>
        </div>
    );
}