'use client'

import {AuthProvider} from "react-oidc-context";
import Login from "@/app/login/Login";
import "bootstrap-icons/font/bootstrap-icons.css";
import ConfigProvider, {useBudgetConfig} from "@/app/components/Hooks/UseBudgetConfig";

export default function Page() {
    return (
        <ConfigProvider>
            <LoginWrapper />
        </ConfigProvider>
    );
}

function LoginWrapper() {
    const {COGNITO_AUTH_CONFIG} = useBudgetConfig();
    return (
        <AuthProvider {...COGNITO_AUTH_CONFIG}>
            <Login />
        </AuthProvider>
    );
}