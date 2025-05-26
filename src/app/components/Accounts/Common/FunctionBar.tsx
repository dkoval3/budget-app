import UseBudget from "@/app/components/Hooks/UseBudget";
import BudgetButton from "@/app/components/Button/BudgetButton";

export function FunctionBar({ className }: FunctionBar) {
    const { addTransaction, currentAccountIdx } = UseBudget();
    return(
        <div className={`${className} flex border-b-[0.5px] border-gray-700 justify-start`}>
            <div>
                <BudgetButton
                    className='py-1 px-3 my-1'
                    onClick={() => addTransaction(currentAccountIdx)}>
                    Add Transaction
                </BudgetButton>
            </div>
        </div>
    );
}

interface FunctionBar {
    className?: string
}