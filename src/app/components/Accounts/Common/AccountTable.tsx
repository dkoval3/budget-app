import {Transaction} from "@/model/Transaction";
import {formatAsDate, formatAsDollarAmount} from "@/common/Formatter";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {useState} from "react";

export default function AccountTable({className}: AccountTableProps) {
    const { currentAccount } = UseBudget();
    return (
        <div className={`${className} border-collapse`}>
            <table className='w-full'>
                <thead>
                    {renderTableHead()}
                </thead>
                <tbody>
                {
                    currentAccount.transactions.map((tx, i) => <TransactionRow transaction={tx} key={i} idx={i} />)
                }
                </tbody>
            </table>
        </div>
    );
}

const renderTableHead = () => (
    <tr>
        <th className='text-left text-lg'><input type='checkbox'/></th>
        <th className='text-left text-lg'>Date</th>
        <th className='text-left text-lg'>Payee</th>
        <th className='text-left text-lg'>Category</th>
        <th className='text-left text-lg'>Notes</th>
        <th className='text-left text-lg'>Amount</th>
    </tr>
);

const TransactionRow = ({ transaction, idx }: TransactionRowProps) => {
    const [disabled, setDisabled] = useState([true, true, true, true, true, true]);
    return (
        <tr key={idx}>
            <td>
                <input type='checkbox'/>
            </td>
            <td className='hover:cursor-pointer'>
                <input className='bg-background hover:cursor-pointer'
                       onClick={() => setDisabled(toggleDisabled(disabled, 1))}
                       value={transaction.date.toISOString().split('T')[0]}
                       type='date'/>
            </td>
            <td className='hover:cursor-pointer'>
                <input className='bg-background hover:cursor-pointer'
                       onClick={() => setDisabled(toggleDisabled(disabled, 2))}
                       defaultValue={transaction.payee}/>
            </td>
            <td className='hover:cursor-pointer'
                defaultValue={transaction.category}>
                <input className='bg-background hover:cursor-pointer'
                       onClick={() => setDisabled(toggleDisabled(disabled, 3))}
                       defaultValue={transaction.category}/>
            </td>
            <td className='hover:cursor-pointer'
                defaultValue={formatAsDate(transaction.date)}>
                <input className='bg-background hover:cursor-pointer'
                       onClick={() => setDisabled(toggleDisabled(disabled, 4))}
                       defaultValue={transaction.notes}/>
            </td>
            <td className='hover:cursor-pointer'
                defaultValue={formatAsDate(transaction.date)}>
                <input className='bg-background hover:cursor-pointer'
                       onClick={() => setDisabled(toggleDisabled(disabled, 5))}
                       defaultValue={formatAsDollarAmount(transaction.amount)}/>
            </td>
        </tr>
    );
};

const toggleDisabled = (disabled: boolean[], i: number) => {
    disabled[i] = !disabled[i];
    return disabled;
};

interface AccountTableProps {
    className?: string,
}

interface TransactionRowProps {
    transaction: Transaction,
    idx: number,
}