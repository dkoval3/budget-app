import BudgetOperationsBar
    from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetOperationsBar/BudgetOperationsBar";
import BudgetTable from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/BudgetTable";
import {BudgetProvider} from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import SelectedCellsSummary from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/SelectedCellsSummary/SelectedCellsSummary";

export default function BudgetPanel() {
  return (
      <BudgetProvider>
          <div className='flex w-full h-full'>
              <div className='flex flex-col w-full h-full'>
                  <BudgetOperationsBar />
                  <BudgetTable />
              </div>
              <SelectedCellsSummary className='flex flex-col w-80 h-full' />
          </div>
      </BudgetProvider>

  );
}