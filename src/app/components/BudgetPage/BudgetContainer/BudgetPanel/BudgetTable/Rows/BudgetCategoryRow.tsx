import {BudgetCategoryRowProps} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTableProps";
import BudgetCell from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/Cells/BudgetCell";

export default function BudgetCategoryRow({ item, index, onClick, className }: BudgetCategoryRowProps) {
    return <tr
        className={`${className} text-right border-[0.5px] border-gray-700 font-bold text-lg bg-sidebarBackground`} >
        <BudgetCell includeCheckbox={true} includeAddIcon={true} index={{i: index, j: -1}} onClick={onClick} isSelected={item.isSelected}
                    className='text-left' message={item.lineItem}/>
        <BudgetCell message={item.assigned} index={{i: index, j: -1}} isSelected={item.isSelected}/>
        <BudgetCell message={item.activity} index={{i: index, j: -1}}/>
        <BudgetCell message={item.assigned - item.activity} index={{i: index, j: -1}}/>
    </tr>
};