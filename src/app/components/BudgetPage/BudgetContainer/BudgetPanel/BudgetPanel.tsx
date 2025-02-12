import BudgetOperationsBar
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetOperationsBar/BudgetOperationsBar";
import BudgetTable from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTable";
import {sampleBudget} from "@/model/BudgetTypes";

export default function BudgetPanel() {
  return (
      <div className='w-full h-full border-2 border-pink-500'>
          <BudgetOperationsBar />
          <BudgetTable budget={sampleBudget} />
      </div>
  );
}