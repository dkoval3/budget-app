import UseBudget from "@/app/components/Hooks/UseBudget";
import {ChangeEvent, useState} from "react";
import Button1 from "@/app/components/Button/Button1";
import {BudgetTypeahead} from "@/app/components/Common/BudgetTypeahead";

export default function ManualTab({ className, setShow }: ManualTabProps) {
    const { amountToAssign, budgetObject, updateAssignedValue } = UseBudget();
    const [assign, setAssign] = useState(amountToAssign.toString());
    const [idx, setIdx] = useState<{ i: number, j: number } | undefined>(undefined);

    const indexes: { i: number, j: number }[] = [];
    const options: string[] = budgetObject.flatMap((categoryGroup, i) => {
        return categoryGroup.lineItems.map((lineItem, j) => {
            indexes.push({ i, j });
            return `${categoryGroup.categoryName}: ${lineItem.lineItem}`;
        });
    });

    const submit = () => {
        if (idx === undefined) {
            alert('Please select a category to which you want to assign money');
            return;
        }
        const { i, j } = idx;
        updateAssignedValue(i, j, parseFloat(assign) + budgetObject[i].lineItems[j].assigned);
        setShow(false);
    }

    const onSelect = (_item: string, idx: number)=> {
        setIdx(indexes[idx]);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAssign(parseFloat(e.target.value).toString());
    };

    return (
        <div className={`${className}`}>
            <div>
                <label>Assign:</label>
                <input
                    className='bg-sidebarBackground p-1 w-64'
                    type='text'
                    autoFocus={true}
                    onChange={onChange}
                    defaultValue={amountToAssign} />
            </div>
            <div className='my-4'>
                <label>To:</label>
                <BudgetTypeahead
                    onChange={() => setIdx(undefined)}
                    onSelect={onSelect}
                    options={options}
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