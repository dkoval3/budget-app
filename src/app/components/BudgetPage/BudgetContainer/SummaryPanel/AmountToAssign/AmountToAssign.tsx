import { formatAsDollarAmount } from "@/common/Formatter";

export default function AmountToAssign({ amount }: AmountToAssignProps) {
    const {
        message,
        buttonMessage,
        buttonIcon,
        backgroundColor,
        buttonBackgroundColor,
        buttonBackgroundColorHover,
        textColor } = getStyles(amount);

    return (
        <div className={`${backgroundColor} ${textColor} flex items-center justify-between w-64 h-16 px-3 rounded-xl`}>
            <div className='flex flex-col font-bold'>
                <div className='text-lg'>{formatAsDollarAmount(amount)}</div>
                <div className={`text-xs`}>{message}</div>
            </div>
            {
                amount !== 0 ?
                    <button className={`${buttonBackgroundColor} hover:${buttonBackgroundColorHover} flex px-2 py-1 rounded`}>
                        <div>{buttonMessage}</div>
                        { amount > 0 ? <i className="bi bi-caret-down-fill pl-1"></i> : null}
                    </button> :
                    <i className={`${buttonIcon} text-3xl`}></i>
            }
        </div>
    );
}

const getStyles = (amount: number) => {
    if (amount > 0) {
        return {
            message: 'Ready to Assign',
            buttonMessage: 'Assign',
            backgroundColor: 'bg-green1',
            buttonBackgroundColor: 'bg-green2',
            buttonBackgroundColorHover: 'bg-green2Hover'
        };
    }
    if (amount < 0) {
        return {
            message: 'Assigned more than you have',
            buttonMessage: 'Fix',
            backgroundColor: 'bg-red1',
            buttonBackgroundColor: 'bg-red2',
            buttonBackgroundColorHover: 'bg-red2Hover'
        };
    }
    return {
        message: 'All Money Assigned',
        buttonIcon: 'bi bi-check-circle-fill',
        backgroundColor: 'bg-neutralTransparent',
        textColor: 'text-neutralText',
    };
}

interface AmountToAssignProps {
    amount: number
}