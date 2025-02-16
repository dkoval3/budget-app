import {BudgetCellProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import {formatAsDollarAmount} from "@/common/Formatter";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";

export default function BudgetCellWithInput (
    {
        className,
        index,
        message,
        isSelected = false,
    }: BudgetCellProps) {
    const { inputRef, updateAssignedValue, isOnlyOneBoxChecked } = UseBudget();

    return (
        <td className={`${className}`}>
            {isSelected && isOnlyOneBoxChecked ?
                <input className='bg-background max-w-28 text-right rounded border-2 border-blue-700'
                       type='text'
                       defaultValue={message}
                       onBlur={(e) => updateAssignedValue(index.i, index.j, parseFloat(e.target.value))}
                       autoFocus={isOnlyOneBoxChecked}
                       ref={inputRef}
                />
                : formatAsDollarAmount(message)
            }
        </td>
    )
}