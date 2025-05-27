import {User, WebStorageStateStore} from "oidc-client-ts";

export const config = {
    redirectUri: {
        development: 'http://localhost:3000/login',
        test: '',
        production: '',
    },
    cognitoClientId: {
        development: '3khvq0dbau0s97q79hremq5h17',
        test: '',
        production: '',
    },
    logoutUri: {
        development: 'http://localhost:3000/logout',
        test: '',
        production: '',
    },
    cognitoDomain: {
        development: 'https://us-east-1lbtwy6fkt.auth.us-east-1.amazoncognito.com',
        test: '',
        production: '',
    },
    cognitoAuthConfig: {
        development: {
            authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_LBTWY6FKt",
            client_id: "3khvq0dbau0s97q79hremq5h17",
            redirect_uri: "http://localhost:3000/login",
            response_type: "code",
            scope: "email openid phone",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSigninCallback: (_user: User | void): void => {
                window.history.replaceState(
                    {},
                    document.title,
                    "/",
                );
            },
            userStore: new WebStorageStateStore({ store: localStorage })
        },
        test: {
            authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_LBTWY6FKt",
            client_id: "3khvq0dbau0s97q79hremq5h17",
            redirect_uri: "http://localhost:3000/login",
            response_type: "code",
            scope: "email openid phone",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSigninCallback: (_user: User | void): void => {
                window.history.replaceState(
                    {},
                    document.title,
                    "/",
                );
            },
            userStore: new WebStorageStateStore({ store: localStorage })
        },
        production: {
            authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_LBTWY6FKt",
            client_id: "3khvq0dbau0s97q79hremq5h17",
            redirect_uri: "http://localhost:3000/login",
            response_type: "code",
            scope: "email openid phone",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSigninCallback: (_user: User | void): void => {
                window.history.replaceState(
                    {},
                    document.title,
                    "/",
                );
            },
            userStore: new WebStorageStateStore({ store: localStorage })
        }
    },
};