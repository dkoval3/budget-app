import {formatAsDollarAmount} from "@/common/Formatter";
import {BudgetCellProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import {useState} from "react";
import AddItemPopup from "@/app/components/Popups/AddItemPopup";
import EditItemPopup from "@/app/components/Accounts/Common/EditNamePopup";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function BudgetCell(
    {
        className,
        index,
        message,
        includeCheckbox = false,
        isSelected = false,
        onClick = () => {},
        targetMet = false,
        shouldHighlight = false,
        includeAddIcon = false,
    }: BudgetCellProps) {
    const {updateCategoryName, deleteCategory} = UseBudget();
    const [isHovering, setIsHovering] = useState(false);
    const [popupIsClosed, setPopupIsClosed] = useState(true);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [itemName, setItemName] = useState(message);

    const onMouseEnter = includeAddIcon ? () => setIsHovering(true) : () => {};
    const onMouseLeave = includeAddIcon ? () => setIsHovering(false) : () => {};
    const highlightStyle = shouldHighlight ? (targetMet ? 'text-black bg-green-600' : 'text-black bg-yellow-600') : '';

    return (
        <td {...{ onMouseEnter, onMouseLeave }} className={`w-24 ${className}`}>
            { includeCheckbox
                ? <input
                    checked={isSelected}
                    onClick={onClick}
                    onChange={() => {}}
                    type='checkbox'
                    className='mx-2' />
                : null
            }
            {typeof message === 'number' ? <div className={shouldHighlight && message < 0 ? 'text-black bg-red-600' : highlightStyle}>{formatAsDollarAmount(message)}</div> : message}
            { includeAddIcon && isHovering
                ? popupIsClosed
                    ? (
                        <>
                            <button onClick={() => {
                                setPopupIsClosed(false);
                            }}>
                                <i className="bi bi-plus-circle-fill text-sm ml-2" />
                            </button>
                            <button onClick={() => {
                                setShowEditPopup(true);
                            }}>
                                <i className="bi bi-pencil ml-2" />
                            </button>
                        </>)
                    : null
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
            {
                showEditPopup
                    ? (
                        <EditItemPopup
                            className='text-base font-light'
                            itemName={`${itemName}`}
                            onOk={() => {
                                updateCategoryName(index.i, `${itemName}`);
                                setShowEditPopup(false);
                            }}
                            onDelete={() => {
                                deleteCategory(index.i);
                                setShowEditPopup(false);
                            }}
                            onCancel={() => {
                                setShowEditPopup(false);
                                setIsHovering(false);
                            }}
                            onChange={(e) => setItemName(e.target.value)} />)
                    : null
            }
        </td>
    );
}