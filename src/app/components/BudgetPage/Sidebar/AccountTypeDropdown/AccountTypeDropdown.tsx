import {formatAsDollarAmount} from "@/common/Formatter";

export default function AccountTypeDropdown({ accountType, expanded, onClick = () => {}, amount }: AccountTypeDropdownProps) {
    return (
        <div onClick={onClick} className='flex justify-between items-center px-2 h-10'>
            <div className='flex items-center'>
                {
                    expanded ? <i className="bi bi-chevron-down" /> : <i className="bi bi-chevron-right" />
                }
                <div className='select-none pl-3'>{accountType}</div>
            </div>
            <div className={`${getAmountTextColor(amount)} text-xs`}>{formatAsDollarAmount(amount)}</div>
        </div>
    );
}

const getAmountTextColor = (amount: number) => amount < 0 ? 'text-red-500' : '';

interface AccountTypeDropdownProps {
    accountType: string,
    expanded: boolean,
    onClick?: () => void,
    amount: number
}