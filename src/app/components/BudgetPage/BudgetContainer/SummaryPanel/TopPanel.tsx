import MonthNavigator from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/MonthNavigator/MonthNavigator";
import AmountToAssign from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/AmountToAssign/AmountToAssign";
import AgeOfMoney from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/AgeOfMoney/AgeOfMoney";
import BudgetFilters from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/BudgetFilters/BudgetFilters";

export default function TopPanel() {
    const ageOfMoney = 191;

    return (
        <div className='flex justify-between flex-col mt-2 w-full h-28 border-b-[0.5px] border-gray-500'>
            <div className='flex justify-between mb-3'>
                <MonthNavigator />
                <AmountToAssign />
                <AgeOfMoney days={ageOfMoney}/>
            </div>
            <BudgetFilters/>
        </div>
    );
}