export default function ModeButton({ message, iconClass, className, onClick = () => {} }: ModeButtonProps) {
    return(
        <button
            className={`${className} flex items-center h-10 w-full px-2 my-1 hover:bg-blue-900 rounded-xl transition-colors`}
            onClick={onClick}>
            {iconClass ? <i className={`${iconClass} text-2xl`}></i> : null}
            <div className='pl-7'>{message}</div>
        </button>
    );
}

interface ModeButtonProps {
    message: string,
    onClick?: () => void,
    iconClass?: string,
    className?: string,
}