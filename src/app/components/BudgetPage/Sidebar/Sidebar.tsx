'use client'

import { useState } from "react";
import MinimizedSidebar from "@/app/components/BudgetPage/Sidebar/MinimizedSidebar";
import ExpandedSidebar from "@/app/components/BudgetPage/Sidebar/ExpandedSidebar";

export default function Sidebar({ className }: { className?: string }) {
    const [isMinimized, setIsMinimized] = useState(false);

    return isMinimized
        ? <MinimizedSidebar {...{setIsMinimized, className }} />
        : <ExpandedSidebar {...{ setIsMinimized, className }} />;
}