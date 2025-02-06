export default function Button(props: ButtonProps) {
    const height = props.height ? props.height : 'h-8';
    const width = props.width ? props.width : '';
    const color = props.color ? props.color : 'bg-gray-600';
    const style = `flex justify-evenly items-center rounded-xl ${height} ${width} ${color}`;

    return (
        <div className={style}>
            {props.icon ? <div>{props.icon}</div> : null}
            <div className='text-xs'>{props.text}</div>
        </div>
    );
}

interface ButtonProps {
    text: string,
    icon?: string,
    height?: number,
    width?: string,
    color?: string
}