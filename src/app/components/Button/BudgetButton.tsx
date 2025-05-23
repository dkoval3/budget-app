import React, {ReactNode} from "react";

export default function BudgetButton({ className, children, onClick }: BudgetButtonProps) {
    return (
        <button
            className={`bg-gray-600 hover:bg-gray-500 transition-colors w-24 rounded-[5px] ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

interface BudgetButtonProps {
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    icon?: string,
    children?: ReactNode
}