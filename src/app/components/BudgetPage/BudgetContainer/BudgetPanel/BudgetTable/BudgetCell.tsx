import {formatAsDollarAmount} from "@/common/Formatter";
import {BudgetCellProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";

export default function BudgetCell(
    {
        className,
        index,
        message,
        includeCheckbox = false,
        isSelected = false,
        onClick = () => {}
    }: BudgetCellProps) {

    return (
        <td className={`${className}`}>
            { includeCheckbox
                ? <input
                    checked={isSelected}
                    onClick={onClick}
                    onChange={() => {}}
                    type='checkbox'
                    className='mx-2' />
                : null
            }
            {typeof message === 'number' ? formatAsDollarAmount(message) : message}
        </td>
    );
}