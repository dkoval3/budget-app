import {useAuth} from "react-oidc-context";
import {ReactNode} from "react";
import {BudgetProvider} from "@/app/components/Hooks/UseBudget";
import BudgetPage from "@/app/components/BudgetPage/BudgetPage";
import {useBudgetConfig} from "@/app/components/Hooks/UseBudgetConfig";

export default function Login({}: LoginWrapperProps) {
    const auth = useAuth();
    const {COGNITO_DOMAIN, COGNITO_CLIENT_ID, COGNITO_LOGOUT_URI} = useBudgetConfig();

    const signOutRedirect = () => {
        window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(COGNITO_LOGOUT_URI)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Error occurred: {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <BudgetProvider>
                <BudgetPage/>
            </BudgetProvider>
        );
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );
}

interface LoginWrapperProps {
    children?: ReactNode,
}