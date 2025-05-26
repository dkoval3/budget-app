import { useAuth } from "react-oidc-context";
import {ReactNode} from "react";

// documentation: https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html
export default function LoginWrapper({ children }: LoginWrapperProps) {
    const auth = useAuth();
    const bypassLogin = true;

    const signOutRedirect = () => {
        const clientId = "3khvq0dbau0s97q79hremq5h17";
        const logoutUri = "http://localhost:3000";
        const cognitoDomain = "https://us-east-1lbtwy6fkt.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (bypassLogin || auth.isAuthenticated) {
        return <>{children}</>
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );
}

interface LoginWrapperProps {
    children: ReactNode,
}