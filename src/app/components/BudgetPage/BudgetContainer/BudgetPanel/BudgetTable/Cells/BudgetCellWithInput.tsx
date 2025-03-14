import {BudgetCellProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import {formatAsDollarAmount} from "@/common/Formatter";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {useRef, useState} from "react";

export default function BudgetCellWithInput (
    {
        className,
        index,
        message,
        isSelected = false,
    }: BudgetCellProps) {
    const [shouldUseInput, setShouldUseInput] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        updateAssignedValue,
        isOnlyOneBoxChecked,
        unselectAllExcept,
    } = UseBudget();

    return (
        <td className={`${className} w-28`}>
            {isSelected && isOnlyOneBoxChecked && shouldUseInput
                ?
                    <input className='bg-background w-full text-right rounded'
                           type='text'
                           defaultValue={message}
                           onBlur={(e) => {
                               const amountInput = parseFloat(e.target.value);
                               updateAssignedValue(index.i, index.j, amountInput);
                               setShouldUseInput(false);
                           }}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') inputRef.current?.blur();
                           }}
                           autoFocus={isOnlyOneBoxChecked}
                           onFocus={(e) => e.target.select()}
                           ref={inputRef}
                    />
                :
                    <div className='cursor-pointer' onClick={() => {
                        unselectAllExcept(index.i, index.j);
                        setShouldUseInput(true);
                    }} >
                        {formatAsDollarAmount(message)}
                    </div>
            }
        </td>
    )
}