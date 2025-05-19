import {formatAsDollarAmount} from "@/common/Formatter";

export default function AccountTypeDropdown({ accountType, onClick = () => {}, amount }: AccountTypeDropdownProps) {
    return (
        <div onClick={onClick} className='flex justify-between items-center px-2 h-10'>
            <div className='flex items-center'>
                <i className="bi bi-caret-right-fill"></i>
                <div className='select-none pl-3'>{accountType}</div>
            </div>
            <div className={`${getAmountTextColor(amount)} text-xs`}>{formatAsDollarAmount(amount)}</div>
        </div>
    );
}

const getAmountTextColor = (amount: number) => amount < 0 ? 'text-red-500' : '';

interface AccountTypeDropdownProps {
    accountType: string,
    onClick?: () => void,
    amount: number
}