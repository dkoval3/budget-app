import {formatAsDollarAmount} from "@/common/Formatter";
import {BudgetCellProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import {useState} from "react";
import AddItemPopup from "@/app/components/Popups/AddItemPopup";

export default function BudgetCell(
    {
        className,
        index,
        message,
        includeCheckbox = false,
        isSelected = false,
        onClick = () => {},
        includeAddIcon = false,
    }: BudgetCellProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [popupIsClosed, setPopupIsClosed] = useState(true);
    const onMouseEnter = includeAddIcon ? () => setIsHovering(true) : () => {};
    const onMouseLeave = includeAddIcon ? () => setIsHovering(false) : () => {};

    return (
        <td {...{ onMouseEnter, onMouseLeave }} className={`${className}`}>
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
            { includeAddIcon && isHovering
                ? popupIsClosed
                    ? <button onClick={() => setPopupIsClosed(false)}>
                        <i className="bi bi-plus-circle-fill text-sm ml-2"></i>
                    </button> : null
                : null
            }
            {
                !popupIsClosed
                    ? <AddItemPopup
                        className='translate-y-1'
                        setClose={setPopupIsClosed}
                        categoryGroupIdx={index.i} />
                    : null
            }
        </td>
    );
}