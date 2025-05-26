'use client'

import "bootstrap-icons/font/bootstrap-icons.css";
import BudgetPage from "@/app/components/BudgetPage/BudgetPage";
import {BudgetProvider} from "@/app/components/Hooks/UseBudget";
import {AuthProvider} from "react-oidc-context";
import LoginWrapper from "@/app/components/Login";
import {config} from "../../config";

const NODE_ENV = process.env.NODE_ENV ?? 'production'

export default function Home() {
    const cognitoAuthConfig = config.cognitoAuthConfig[NODE_ENV];
    return (
        <AuthProvider {...cognitoAuthConfig}>
            <BudgetProvider>
                <LoginWrapper>
                    <BudgetPage/>
                </LoginWrapper>
            </BudgetProvider>
        </AuthProvider>
    );
}
