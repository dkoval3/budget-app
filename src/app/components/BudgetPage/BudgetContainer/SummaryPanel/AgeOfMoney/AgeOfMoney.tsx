export default function AgeOfMoney({ days }: AgeOfMoneyProps) {
    return (
        <div className='flex flex-col justify-center items-center h-16 mr-2'>
            <div className='text-3xl text-green3'>{`${days} days`}</div>
            <div className='text-neutralText'>Age of Money</div>
        </div>
    );
}

interface AgeOfMoneyProps {
    days: number,
}