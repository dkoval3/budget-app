import {formatAsDollarAmount} from "@/common/Formatter";

export default function BalancePanel({ className, balance }: BalancePanelProps) {
    return (
        <div className={`${className} border-b-[0.5px] border-gray-700`}>
            <div>
                <div className='flex flex-col'>{formatAsDollarAmount(balance)}</div>
                <div>Total Balance</div>
            </div>
        </div>
    );
}

interface BalancePanelProps {
    balance: number,
    className?: string;
}