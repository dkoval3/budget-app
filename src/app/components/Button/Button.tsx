export default function Button(props: ButtonProps) {
    return (
        <button className={`${props.className} flex justify-center items-center p-1 transition-colors rounded`}>
            {props.iconName ? <i className={`${props.iconName} mr-2`}></i> : null}
            <div className='text-xs'>{props.message}</div>
        </button>
    );
}

interface ButtonProps {
    message: string,
    iconName?: string,
    className?: string,
}