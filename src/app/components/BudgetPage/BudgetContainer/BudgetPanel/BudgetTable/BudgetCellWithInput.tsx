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
    const {
        inputRef,
        getLineItem,
        updateAssignedValue,
        setAmountToAssign,
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
                           const previouslyAssigned = getLineItem(index.i, index.j).assigned;
                           const difference = amountInput - previouslyAssigned;
                           updateAssignedValue(index.i, index.j, amountInput);
                           setAmountToAssign(amountToAssign - difference);
                       }}
                       autoFocus={isOnlyOneBoxChecked}
                       ref={inputRef}
                />
                : formatAsDollarAmount(message)
            }
        </td>
    )
}