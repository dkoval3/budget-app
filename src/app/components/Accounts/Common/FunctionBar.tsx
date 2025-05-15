import UseBudget from "@/app/components/Hooks/UseBudget";

export function FunctionBar({ className }: FunctionBar) {
    // Below is causing an error
    const { addTransaction, currentAccountIdx } = UseBudget();
    return(
        <div className={`${className} flex border-b-[0.5px] border-gray-700 justify-start`}>
            <div>
                <button
                    onClick={() => addTransaction(currentAccountIdx)}
                    className='p-2'>
                    Add Transaction
                </button>
            </div>
        </div>
    );
}

interface FunctionBar {
    className?: string
}