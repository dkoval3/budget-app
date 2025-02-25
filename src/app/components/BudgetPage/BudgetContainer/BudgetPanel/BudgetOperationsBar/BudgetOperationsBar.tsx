'use client'

import Button from "@/app/components/Button/Button";
import {useState} from "react";
import AddCategoryPopup from "@/app/components/BudgetPage/BudgetContainer/BudgetPanel/BudgetTable/AddCategoryPopup";

export default function BudgetOperationsBar() {
    const [popupIsClosed, setPopupIsClosed] = useState(true);
    return (
        <div className='flex border-y-[0.5px] border-gray-700'>
            <div className='flex relative'>
                <Button
                    className='hover:bg-buttonHover mx-1'
                    iconName='bi bi-plus-circle-fill'
                    message='Category Group'
                    onClick={() => setPopupIsClosed(false)}
                />
                { !popupIsClosed
                    ? <AddCategoryPopup
                        className='translate-y-9 translate-x-2'
                        setClose={setPopupIsClosed}
                    />
                    : null }
            </div>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-arrow-counterclockwise' message='Undo'/>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-arrow-clockwise' message='Redo'/>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-clock-history' message='Recent Moves'/>
        </div>
    );
}