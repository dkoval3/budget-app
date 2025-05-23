import {Transaction} from "@/model/Transaction";
import {formatAsDollarAmount, parseAsDollarAmount} from "@/common/Formatter";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {MouseEvent, useRef, useState} from "react";
import {BudgetTypeahead} from "@/app/components/Common/BudgetTypeahead";
import {useImmer} from "use-immer";
import BudgetButton from "@/app/components/Button/BudgetButton";

export default function AccountTable({className}: AccountTableProps) {
    const {currentAccount} = UseBudget();
    return (
        <div className={`${className}`}>
            <table className='w-full'>
                <thead>
                {renderTableHead()}
                </thead>
                <tbody>
                {
                    currentAccount.transactions.map((tx, i) => <TransactionRow transaction={tx} key={tx.id} idx={i}/>)
                }
                </tbody>
            </table>
        </div>
    );
}

const renderTableHead = () => (
    <tr className='border-b-[0.5px] border-gray-700'>
        <th className='text-left text-lg'></th>
        <th className='text-left text-lg'>Date</th>
        <th className='text-left text-lg'>Payee</th>
        <th className='text-left text-lg'>Category</th>
        <th className='text-left text-lg'>Notes</th>
        <th className='text-left text-lg'>Amount</th>
    </tr>
);

const TransactionRow = ({transaction, idx}: TransactionRowProps) => {
    const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
    const [tx, setTx] = useImmer(transaction);
    const [originalTx] = useState(transaction);
    const [amount, setAmount] = useState(formatAsDollarAmount(transaction.amount));
    const [isEditing, setIsEditing] = useState(false);

    const {switchTransactionBox, getAllCategories, saveTransaction} = UseBudget();
    const rowBgColor = transaction.checked ? 'bg-sidebarBackground2' : 'bg-background';
    const rowClass = `${rowBgColor} hover:cursor-pointer`;

    const resetTransaction = () => {
        setTx(originalTx);
        setAmount(`${formatAsDollarAmount(originalTx.amount)}`);
    };

    const onMouseDown = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
        if (!inputRef.current.checked) {
            e.preventDefault();
        }
    };

    const onChangeSelect = (v: string) => setTx(draft => {
        draft.category = v;
    });

    const save = () => {
        try {
            const dollarAmount = parseAsDollarAmount(amount);
            if (isNaN(dollarAmount)) throw new Error();
            const newTx = {...tx, amount: dollarAmount};
            saveTransaction(idx, newTx);
            setIsEditing(false);
            inputRef.current.checked = false;
            setAmount(formatAsDollarAmount(newTx.amount));
        } catch {
            alert("Please enter a proper dollar amount");
            return;
        }
    }

    return (
        <>
            <tr onClick={(e) => {
                const targetType = (e.target as HTMLInputElement).type;
                if (!inputRef.current.checked && (targetType === 'text' || targetType === 'date')) {
                    inputRef.current.checked = true;
                    setIsEditing(true);
                    switchTransactionBox(idx);
                }
            }}
                className={`${rowClass} border-b-[0.5px] border-gray-700`}
                key={idx}>
                <td>
                    <input
                        type='checkbox' className='hover:cursor-pointer'
                        ref={inputRef}
                        onClick={(e) => {
                            switchTransactionBox(idx);
                            setIsEditing(v => !v);
                            resetTransaction();
                            e.stopPropagation();
                        }}
                    />
                </td>
                <td>
                    <input className={rowClass}
                           onMouseDown={onMouseDown}
                           onChange={e => setTx(draft => {
                               draft.date = new Date(e.target.value);
                           })}
                           value={tx.date.toISOString().split('T')[0]}
                           type='date'/>
                </td>
                <td>
                    <input className={rowClass}
                           onMouseDown={onMouseDown}
                           onChange={(e) => setTx(draft => {
                               draft.payee = e.target.value;
                           })}
                           value={tx.payee}/>
                </td>
                <td>
                    <BudgetTypeahead
                        bgColor={rowBgColor}
                        className={rowClass}
                        onSelect={onChangeSelect}
                        onChange={onChangeSelect}
                        onMouseDown={onMouseDown}
                        value={tx.category}
                        options={getAllCategories()} />
                </td>
                <td>
                    <input className={rowClass}
                           onChange={(e) => setTx(draft => {
                               draft.notes = e.target.value;
                           })}
                           onMouseDown={onMouseDown}
                           value={tx.notes}/>
                </td>
                <td>
                    <input className={rowClass}
                           onMouseDown={onMouseDown}
                           onChange={(e) => setAmount(e.target.value)}
                           value={amount}/>
                </td>
            </tr>
            {
                isEditing ?
                    <tr className={`${rowBgColor} border-b-[0.5px] border-gray-700`}>
                        <td colSpan={2} className='p-1'>
                            <BudgetButton className='bg-red-700 hover:bg-red-600 mr-2'
                                          onClick={(e) => {
                                              console.log('implement delete logic');
                                          }}>
                                Delete
                            </BudgetButton>
                        </td>
                        <td colSpan={4} className="p-1">
                            <div className="flex justify-end">
                                <BudgetButton className='mr-2'
                                    onClick={(e) => {
                                        switchTransactionBox(idx);
                                        inputRef.current.checked = false;
                                        setIsEditing(v => !v);
                                        resetTransaction();
                                        e.stopPropagation();
                                    }}>
                                    Cancel
                                </BudgetButton>
                                <BudgetButton
                                    className='bg-green-700 hover:bg-green-600'
                                    onClick={save}>
                                    Save
                                </BudgetButton>
                            </div>
                        </td>
                    </tr>
                    : null
            }
        </>
    );
};

interface AccountTableProps {
    className?: string,
}

interface TransactionRowProps {
    transaction: Transaction,
    idx: number,
}