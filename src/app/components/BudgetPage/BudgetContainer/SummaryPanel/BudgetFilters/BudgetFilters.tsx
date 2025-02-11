'use client'

import { useState } from "react";

export default function BudgetFilters() {
    const buttons = ['All', 'Underfunded', 'Overfunded', 'Money Available', 'Snoozed'];
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div>
            {buttons.map((message, idx) => <FilterButton key={idx} {...{
                message,
                idx,
                isActive: activeIdx === idx,
                setActiveIdx
            }} />)}
            <button>
                <i className="bi bi-filter-circle text-blue1 hover:text-blue1Hover ml-1"></i>
            </button>
        </div>
    );
}

const FilterButton = ({message, isActive, idx, setActiveIdx}: FilterButtonProps) => {
    const buttonStyle = isActive ? 'bg-buttonActive hover:bg-buttonActiveHover' : 'bg-button hover:bg-buttonHover';
    return (
        <button className={`${buttonStyle} p-1 m-1 min-w-10 text-xs rounded`} onClick={() => setActiveIdx(idx)}>
            {message}
        </button>
    );
};

interface FilterButtonProps {
    message: string,
    isActive: boolean,
    idx: number,
    setActiveIdx: (idx: number) => void,
}