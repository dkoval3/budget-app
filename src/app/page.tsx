'use client'

import {redirect, RedirectType} from "next/navigation";
import {AuthProvider, useAuth} from "react-oidc-context";
import {BudgetProvider} from "@/app/components/Hooks/UseBudget";
import BudgetPage from "@/app/components/BudgetPage/BudgetPage";
import ConfigProvider, {useBudgetConfig} from "@/app/components/Hooks/UseBudgetConfig";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
    return (
        <ConfigProvider>
            <AuthWrapper/>
        </ConfigProvider>
    );
}

const AuthWrapper = () => {
    const {COGNITO_AUTH_CONFIG} = useBudgetConfig();
    return(
        <AuthProvider {...COGNITO_AUTH_CONFIG}>
            <LoginWrapper/>
        </AuthProvider>
    );
};

const LoginWrapper = () => {
    const auth = useAuth();
    if (auth.isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    if (!auth.isAuthenticated && !auth.isLoading) {
        redirect('/login', RedirectType.replace);
    }
    return (
        <BudgetProvider>
            <BudgetPage/>
        </BudgetProvider>
    );
};