import Button1 from "@/app/components/Button/Button1";
import {useState} from "react";
import UseBudget from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/UseBudget";
import {notEmptyOrNull} from "@/common/Formatter";

const runValidation = (category: string) => {
    if (notEmptyOrNull(category)) {
        return {};
    } else {
        return {
            message: 'Please enter a category name',
        }
    }
}

export default function AddCategoryPopup({ className, setClose, categoryGroupIdx = -1 }: AddCategoryPopupProps) {
    const [category, setCategory] = useState('');
    const { addLineItem, addCategoryGroup } = UseBudget();

    return (
        <div className={`${className} flex flex-col absolute p-3 w-64 rounded bg-sidebarBackground`}>
            <div>
                <input
                    className='p-1 bg-sidebarBackground text-sm w-full border-[0.5px]'
                    autoFocus={true}
                    type='text'
                    placeholder='New Category'
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div className='flex justify-end mt-2'>
                <Button1
                    className='p-2 bg-button hover:bg-buttonHover'
                    text='Cancel'
                    onClick={() => {
                        setClose(true);
                    }}
                />
                <Button1
                    className='ml-2 px-4 py-2'
                    text='OK'
                    color='bg-buttonActive'
                    hoverColor='bg-buttonActiveHover'
                    onClick={() => {
                        const validationResults = runValidation(category);
                        if (Object.keys(validationResults).length > 0) {
                            alert(validationResults.message);
                        } else if (categoryGroupIdx !== -1) {
                            addLineItem(categoryGroupIdx, category);
                            setClose(true);
                        } else {
                            addCategoryGroup(category);
                            setClose(true);
                        }
                    }}
                />
            </div>
        </div>
    );
}

interface AddCategoryPopupProps {
    className?: string,
    setClose: (hide: boolean) => void,
    categoryGroupIdx?: number,
}

