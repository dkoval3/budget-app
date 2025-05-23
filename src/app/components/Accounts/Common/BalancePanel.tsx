import {formatAsDollarAmount} from "@/common/Formatter";

export default function BalancePanel({ className, balance }: BalancePanelProps) {
    return (
        <div className={`${className} border-b-[0.5px] border-gray-700`}>
            <div>
                <div className='pt-1 flex flex-col'>{formatAsDollarAmount(balance)}</div>
                <div className='text-sm py-1'>Total Balance</div>
            </div>
        </div>
    );
}

interface BalancePanelProps {
    balance: number,
    className?: string;
}