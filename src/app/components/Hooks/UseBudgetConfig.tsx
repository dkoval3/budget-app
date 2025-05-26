import React, {useContext} from "react";
import {config} from "../../../../config";
import {User} from "oidc-client-ts";

const ConfigContext = React.createContext({} as useBudgetConfigReturnType);

export default function ConfigProvider({ children }: ConfigProviderProps) {
    const config = UseBudgetConfig();
    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
}

function UseBudgetConfig() {
    const ENV = process.env.NODE_ENV ?? 'production';
    const COGNITO_REDIRECT_URI = config.redirectUri[ENV];
    const COGNITO_CLIENT_ID = config.cognitoClientId[ENV];
    const COGNITO_LOGOUT_URI = config.logoutUri[ENV];
    const COGNITO_DOMAIN = config.cognitoDomain[ENV];
    const COGNITO_AUTH_CONFIG = config.cognitoAuthConfig[ENV];
    return {
        ENV,
        COGNITO_REDIRECT_URI,
        COGNITO_CLIENT_ID,
        COGNITO_LOGOUT_URI,
        COGNITO_DOMAIN,
        COGNITO_AUTH_CONFIG,
    }
}

export function useBudgetConfig() {
    return useContext(ConfigContext);
}

interface ConfigProviderProps {
    children?: React.ReactNode,
}

interface useBudgetConfigReturnType {
    ENV: 'development' | 'production' | 'test',
    COGNITO_REDIRECT_URI: string,
    COGNITO_CLIENT_ID: string,
    COGNITO_LOGOUT_URI: string,
    COGNITO_DOMAIN: string,
    COGNITO_AUTH_CONFIG: CognitoConfigType,
}

type CognitoConfigType = {
    authority: string
    client_id: string
    redirect_uri: string
    response_type: string
    scope: string
    onSigninCallback: (_user: (User | void)) => void
};