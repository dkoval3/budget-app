import {BudgetCellProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import {formatAsDollarAmount} from "@/common/Formatter";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function BudgetCellWithInput (
    {
        className,
        index,
        message,
        isSelected = false,
    }: BudgetCellProps) {
    const {
        inputRef,
        getLineItem,
        updateAssignedValue,
        amountToAssign,
        isOnlyOneBoxChecked
    } = UseBudget();

    return (
        <td className={`${className} w-28`}>
            {isSelected && isOnlyOneBoxChecked ?
                <input className='bg-background w-full text-right rounded border-2 border-blue-700'
                       type='text'
                       defaultValue={message}
                       onBlur={(e) => {
                           const amountInput = parseFloat(e.target.value);
                           updateAssignedValue(index.i, index.j, amountInput);
                       }}
                       autoFocus={isOnlyOneBoxChecked}
                       ref={inputRef}
                />
                : formatAsDollarAmount(message)
            }
        </td>
    )
}