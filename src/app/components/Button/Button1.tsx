export default function Button1(props: ButtonProps) {
    const height = props.height ? props.height : 'h-8';
    const color = props.color ? props.color : 'bg-gray-600';
    const style = `flex justify-evenly items-center rounded-xl ${height} ${color} hover:bg-gray-500 transition-colors`;

    return (
        <button className={`${props.className} ${style}`}>
            {props.iconClass ? <i className={props.iconClass}></i> : null}
            <div className='text-xs'>{props.text}</div>
        </button>
    );
}

interface ButtonProps {
    text: string,
    iconClass?: string,
    height?: number,
    color?: string,
    className?: string,
}