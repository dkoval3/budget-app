import Button1 from "@/app/components/Button/Button1";
import {useState} from "react";
import UseBudget from "@/app/components/Hooks/UseBudget";
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

export default function AddItemPopup({ className, setClose, categoryGroupIdx = -1 }: AddCategoryPopupProps) {
    const [item, setItem] = useState('');
    const { addLineItem, addCategoryGroup } = UseBudget();

    return (
        <div className={`${className} flex flex-col absolute p-3 w-64 rounded bg-sidebarBackground`}>
            <div>
                <input
                    className='p-1 bg-sidebarBackground text-sm w-full border-[0.5px]'
                    autoFocus={true}
                    type='text'
                    placeholder='New Category'
                    onChange={(e) => setItem(e.target.value)}
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
                        const validationResults = runValidation(item);
                        if (Object.keys(validationResults).length > 0) {
                            alert(validationResults.message);
                        } else if (categoryGroupIdx !== -1) {
                            addLineItem(categoryGroupIdx, item);
                            setClose(true);
                        } else {
                            addCategoryGroup(item);
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

