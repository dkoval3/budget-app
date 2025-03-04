import UseBudget from "@/app/components/Hooks/UseBudget";
import {useState} from "react";
import Button1 from "@/app/components/Button/Button1";
import {BudgetTypeahead} from "@/app/components/Common/BudgetTypeahead";

export default function ManualTab({ className, setShow }: ManualTabProps) {
    const { amountToAssign, budgetObject } = UseBudget();
    const [assign, setAssign] = useState(amountToAssign.toString());
    const [toCategory, setToCategory] = useState('');

    const options: string[] = budgetObject.flatMap(categoryGroup => {
        return categoryGroup.lineItems.map(lineItem => {
            return `${categoryGroup.categoryName}: ${lineItem.lineItem}`;
        });
    });

    const submit = () => {
        setShow(false);
    }

    return (
        <div className={`${className}`}>
            <div>
                <label>Assign:</label>
                <input
                    className='bg-sidebarBackground p-1 w-64'
                    type='text'
                    autoFocus={true}
                    onChange={(e) => setAssign(parseFloat(e.target.value).toString())}
                    defaultValue={amountToAssign} />
            </div>
            <div className='my-4'>
                <label>To:</label>
                <BudgetTypeahead
                    options={options}
                    setValue={setAssign}
                    width='w-64'
                />

            </div>
            <div className='flex justify-end m-2'>
                <Button1
                    className='mr-4 p-2'
                    onClick={submit}
                    text='Assign'
                />
                <Button1
                    className='p-2'
                    onClick={() => setShow(false)}
                    text='Cancel'
                />
            </div>
        </div>
    );
}

interface ManualTabProps {
    className?: string,
    setShow: (show: boolean) => void,
}