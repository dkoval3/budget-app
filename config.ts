export const config = {
    cognitoClientId: {
        development: '3khvq0dbau0s97q79hremq5h17',
        test: '',
        production: '',
    },
    logoutUri: {
        development: 'http://localhost:3000',
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
            redirect_uri: "http://localhost:3000/login/redirect",
            response_type: "code",
            scope: "email openid phone",
        },
        test: {},
        production: {}
    }
};