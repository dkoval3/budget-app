import {useAuth} from "react-oidc-context";
import {useBudgetConfig} from "@/app/components/Hooks/UseBudgetConfig";

/**
 * Some code is commented out, as it in not part of the MVP
 * Take it as a follow-up to implement
 */
export default function ExpandedProfile({ className }: ExpandedProfile) {
    const auth = useAuth();
    const {COGNITO_DOMAIN, COGNITO_CLIENT_ID, COGNITO_LOGOUT_URI} = useBudgetConfig();
    const signOutRedirect = async () => {
        await auth.removeUser();
        window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(COGNITO_LOGOUT_URI)}`;
    };

    return (
        <div className={`${className} flex flex-col items-start bg-sidebarBackground2 rounded p-2 mt-1`}>
            {/*<button >*/}
            {/*    <i className="bi bi-tools pl-1 pr-3"></i>*/}
            {/*    Budget Settings*/}
            {/*</button>*/}
            {/*<button>*/}
            {/*    <i className="bi bi-person-fill pl-1 pr-3"></i>*/}
            {/*    Account Settings*/}
            {/*</button>*/}
            <button
                onClick={async () => await signOutRedirect()} >
                <i className="bi bi-box-arrow-right pl-1 pr-3"></i>
                Log Out
            </button>
        </div>
    );
}

interface ExpandedProfile {
    className?: string,
}