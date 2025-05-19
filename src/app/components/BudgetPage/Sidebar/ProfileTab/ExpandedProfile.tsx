export default function ExpandedProfile({ className }: ExpandedProfile) {
    return (
        <div className={`${className} flex flex-col items-start bg-sidebarBackground2 rounded p-2 mt-1`}>
            <button >
                <i className="bi bi-tools pl-1 pr-3"></i>
                Budget Settings
            </button>
            <button>
                <i className="bi bi-person-fill pl-1 pr-3"></i>
                Account Settings
            </button>
            <button>
                <i className="bi bi-box-arrow-right pl-1 pr-3"></i>
                Log Out
            </button>
        </div>
    );
}

interface ExpandedProfile {
    className?: string,
}