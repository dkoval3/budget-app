import BudgetCell from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetCell";
import {BudgetRowProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import BudgetCellWithInput
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetCellWithInput";

export default function BudgetRow({ item, index, onClick, className }: BudgetRowProps) {
    return <tr className={`${className} text-right border-[0.5px] border-gray-700`}>
        <BudgetCell includeCheckbox={true} index={index} onClick={onClick} isSelected={item.isSelected}
                    className='text-left' message={item.lineItem}/>
        <BudgetCellWithInput message={item.assigned} index={index} isSelected={item.isSelected}/>
        <BudgetCell message={item.activity} index={index}/>
        <BudgetCell message={item.assigned - item.activity} index={index}/>
    </tr>
};