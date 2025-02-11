import MonthNavigator from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/MonthNavigator/MonthNavigator";
import AmountToAssign from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/AmountToAssign/AmountToAssign";
import AgeOfMoney from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/AgeOfMoney/AgeOfMoney";
import BudgetFilters from "@/app/components/BudgetPage/BudgetContainer/SummaryPanel/BudgetFilters/BudgetFilters";

export default function TopPanel() {
    const month = 'Feb';
    const year = '2025';
    const ageOfMoney = 191;

    return (
        <div className='flex justify-between flex-col w-full h-28 border-b-[0.5px] border-gray-500'>
            <div className='flex justify-between'>
                <MonthNavigator month={month} year={year}/>
                <AmountToAssign amount={1}/>
                <AgeOfMoney days={ageOfMoney}/>
            </div>
            <BudgetFilters/>
        </div>
    );
}