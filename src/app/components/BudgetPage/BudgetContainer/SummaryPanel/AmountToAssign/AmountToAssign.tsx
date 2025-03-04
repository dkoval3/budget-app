'use client'

import { formatAsDollarAmount } from "@/common/Formatter";
import UseBudget from "@/app/components/Hooks/UseBudget";
import {useState} from "react";
import AssignPopup from "@/app/components/Popups/Assign/AssignPopup";

export default function AmountToAssign({ className }: AmountToAssignProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { amountToAssign } = UseBudget();
    const {
        message,
        buttonMessage,
        buttonIcon,
        backgroundColor,
        buttonBackgroundColor,
        buttonBackgroundColorHover,
        textColor } = getStyles(amountToAssign);

    return (
        <div className={`${className} ${backgroundColor} ${textColor} flex items-center justify-between w-64 h-16 px-3 mr-32 rounded-xl`}>
            <div className='flex flex-col font-bold'>
                <div className='text-lg'>{formatAsDollarAmount(amountToAssign)}</div>
                <div className={`text-xs`}>{message}</div>
            </div>
            {
                amountToAssign !== 0 ?
                    (
                        <div className='flex relative'>
                            <button
                                className={`${buttonBackgroundColor} ${buttonBackgroundColorHover} flex px-2 py-1 rounded`}
                                onClick={() => setShowDropdown(v => !v)}
                            >
                                <div>{buttonMessage}</div>
                                { amountToAssign > 0 ? <i className="bi bi-caret-down-fill pl-1"></i> : null}
                            </button>
                            { showDropdown
                                ? <AssignPopup
                                    className='absolute pt-3 px-3 rounded-xl translate-y-8 bg-sidebarBackground2'
                                    setShow={setShowDropdown}
                                />
                                : null
                            }
                        </div>
                    ) :
                    <i className={`${buttonIcon} text-3xl`}></i>

            }
        </div>
    );
}

const getStyles = (amount: number) => {
    if (amount > 0) {
        return {
            message: 'Ready to Assign',
            buttonMessage: 'Assign',
            backgroundColor: 'bg-green1',
            buttonBackgroundColor: 'bg-green2',
            buttonBackgroundColorHover: 'hover:bg-green2Hover'
        };
    }
    if (amount < 0) {
        return {
            message: 'Assigned more than you have',
            buttonMessage: 'Fix',
            backgroundColor: 'bg-red1',
            buttonBackgroundColor: 'bg-red2',
            buttonBackgroundColorHover: 'hover:bg-red2Hover'
        };
    }
    return {
        message: 'All Money Assigned',
        buttonIcon: 'bi bi-check-circle-fill',
        backgroundColor: 'bg-neutralTransparent',
        textColor: 'text-neutralText',
    };
}

interface AmountToAssignProps {
    className?: string,
}