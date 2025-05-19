import { userAccountIcon, budgetIcon } from "@/app/IconConstants";

const buttonClass = 'flex hover:bg-blue-900 w-15 h-15 text-3xl p-2 rounded-xl justify-center items-center';

export default function MinimizedSidebar({ className, setIsMinimized }: MinimizedSidebarProps){

    // Uncomment once implemented in future release
    return(
        <div className={`${className} relative flex flex-col h-full items-center pb-3`}>
            <IconButton buttonIcon={userAccountIcon} />
            <IconButton buttonIcon={budgetIcon} />
            {/*<IconButton buttonIcon={reflectIcon} />*/}
            {/*<IconButton buttonIcon={accountsIcon} />*/}
            <button className='absolute bottom-0 right-0 mr-4 mb-4 text-neutral-300 hover:text-white text-2xl' onClick={() => setIsMinimized(false)}>
                <i className="bi bi-caret-right-square"></i>
            </button>
        </div>
    );
};

const IconButton = ({ buttonIcon }: { buttonIcon: string }) => (
    <button className={buttonClass}>
        <i className={buttonIcon}></i>
    </button>
);

interface MinimizedSidebarProps {
    className?: string,
    setIsMinimized: (isMinimized: boolean) => void
}