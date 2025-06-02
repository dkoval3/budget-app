import {useAuth} from "react-oidc-context";
import {ReactNode} from "react";
import {BudgetProvider} from "@/app/components/Hooks/UseBudget";
import BudgetPage from "@/app/components/BudgetPage/BudgetPage";
import BudgetButton from "@/app/components/Button/BudgetButton";
import {redirect, RedirectType} from "next/navigation";

export default function Login({}: LoginWrapperProps) {
    const auth = useAuth();

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Error occurred: {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        redirect("/", RedirectType.replace);
    }

    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <h1>Budget App - v1.0.0</h1>
            <BudgetButton
                className='mt-4 px-2 py-1'
                onClick={() => auth.signinRedirect()}>
                Sign In
            </BudgetButton>
        </div>
    );
}

interface LoginWrapperProps {
    children?: ReactNode,
}