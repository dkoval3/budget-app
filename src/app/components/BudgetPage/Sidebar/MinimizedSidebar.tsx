import {accountsIcon, appIcon, budgetIcon, reflectIcon} from "@/app/IconConstants";

export default function MinimizedSidebar({ className, setIsMinimized }: MinimizedSidebarProps){
    return(
        <div className={`${className} relative flex flex-col border-2 h-full`}>
            <i className={`${appIcon} text-3xl px-3 pb-3`}></i>
            <i className={`${budgetIcon} text-3xl px-3 pb-3`}></i>
            <i className={`${reflectIcon} text-3xl px-3 pb-3`}></i>
            <i className={`${accountsIcon} text-3xl px-3 pb-3`}></i>
            <div className='absolute bottom-0 right-0 mr-4 mb-4' onClick={() => setIsMinimized(false)}>
                <i className="bi bi-caret-right-square text-2xl"></i>
            </div>
        </div>
    );
};

interface MinimizedSidebarProps {
    className?: string,
    setIsMinimized: (isMinimized: boolean) => void
}