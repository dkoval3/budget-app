import BudgetCell from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/Cells/BudgetCell";
import {BudgetRowProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import BudgetCellWithInput
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/Cells/BudgetCellWithInput";

export default function BudgetRow({ item, index, onClick, className }: BudgetRowProps) {
    const target = item.target ?? { amount: Number.MAX_VALUE };
    const targetMet = item.assigned >= target.amount;
    return <tr className={`${className} text-right border-[0.5px] border-gray-700`}>
        <BudgetCell includeCheckbox={true} index={index} onClick={onClick} isSelected={item.isSelected}
                    className='text-left' message={item.lineItem}/>
        <BudgetCellWithInput message={item.assigned} index={index} isSelected={item.isSelected}/>
        <BudgetCell message={item.activity} index={index}/>
        <BudgetCell message={item.assigned - item.activity} index={index} shouldHighlight={true} targetMet={targetMet} />
    </tr>
};