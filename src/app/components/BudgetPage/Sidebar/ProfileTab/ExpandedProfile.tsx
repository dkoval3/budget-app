export default function ExpandedProfile({ className }: ExpandedProfile) {
    return (
        <div className={`${className} flex flex-col items-start bg-sidebarBackground2 rounded p-2 mt-1`}>
            <button>
                <i className="bi bi-tools"></i>
                Budget Settings
            </button>
            <button>
                <i className="bi bi-person-fill"></i>
                Account Settings
            </button>
            <button>
                <i className="bi bi-box-arrow-right"></i>
                Log Out
            </button>
        </div>
    );
}

interface ExpandedProfile {
    className?: string,
}