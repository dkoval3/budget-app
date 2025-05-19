import UseBudget from "@/app/components/Hooks/UseBudget";
import Button1 from "@/app/components/Button/Button1";

export function FunctionBar({ className }: FunctionBar) {
    const { addTransaction, currentAccountIdx } = UseBudget();
    return(
        <div className={`${className} flex border-b-[0.5px] border-gray-700 justify-start`}>
            <div>
                <Button1
                    className='px-3 my-1'
                    text='Add Transaction'
                    onClick={() => addTransaction(currentAccountIdx)} />
            </div>
        </div>
    );
}

interface FunctionBar {
    className?: string
}