export default function ModeButton({ message, iconClass }: { message: string, iconClass?: string }) {
    return(
        <div className='flex items-center h-10 px-2 border-2 border-emerald-600'>

            {iconClass ? <i className={iconClass}></i> : null}
            <div className='pl-7'>{message}</div>
        </div>
    );
}