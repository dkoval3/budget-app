import {formatAsDollarAmount} from "@/common/Formatter";

export default function AccountTypeDropdown({ accountType, amount }: { accountType: string, amount: number }) {
    return (
        <div className='flex justify-between items-center px-2 h-10'>
            <div className='flex items-center'>
                <i className="bi bi-caret-right-fill"></i>
                <div className='pl-3'>{accountType}</div>
            </div>
            <div className={`${getAmountTextColor(amount)} text-xs`}>{formatAsDollarAmount(amount)}</div>
        </div>
    );
}

const getAmountTextColor = (amount: number) => amount < 0 ? 'text-red-500' : '';