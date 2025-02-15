import {BudgetCellProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import {formatAsDollarAmount} from "@/common/Formatter";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import {isOnlyOneBoxChecked} from "@/common/BudgetUtil";

export default function BudgetCellWithInput (
    {
        className,
        index,
        message,
        isSelected = false,
    }: BudgetCellProps) {
    const { inputRef, budgetObject, updateAssignedValue } = UseBudget();
    const onlyOneIsSelected = isOnlyOneBoxChecked(budgetObject);

    return (
        <td className={`${className}`}>
            {isSelected && onlyOneIsSelected ?
                <input className='bg-background max-w-28 text-right rounded border-2 border-blue-700'
                       type='text'
                       defaultValue={message}
                       onBlur={(e) => updateAssignedValue(index.i, index.j, parseFloat(e.target.value))}
                       autoFocus={onlyOneIsSelected}
                       ref={inputRef}
                />
                : formatAsDollarAmount(message)
            }
        </td>
    )
}