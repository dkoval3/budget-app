'use client'

import Button from "@/app/components/Button/Button";
import {useState} from "react";
import AddItemPopup from "@/app/components/Popups/AddItemPopup";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function BudgetOperationsBar() {
    const [popupIsClosed, setPopupIsClosed] = useState(true);
    const { undo } = UseBudget();
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
                    ? <AddItemPopup
                        className='translate-y-9 translate-x-2'
                        setClose={setPopupIsClosed}
                    />
                    : null }
            </div>
            <Button
                className='hover:bg-buttonHover mx-1'
                iconName='bi bi-arrow-counterclockwise'
                message='Undo'
                onClick={() => undo()}
            />
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-arrow-clockwise' message='Redo'/>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-clock-history' message='Recent Moves'/>
        </div>
    );
}