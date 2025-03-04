import {useState} from "react";
import ManualTab from "@/app/components/Popups/Assign/ManualTab";
import AutomaticTab from "@/app/components/Popups/Assign/AutomaticTab";

export default function AssignPopup({ className, setShow }: AssignPopupProps) {
    const [usingManualTab, setUsingManualTab] = useState(true);
    return (
        <div className={`${className}`}>
            { usingManualTab ? <ManualTab setShow={setShow} /> : <AutomaticTab />}
        </div>
    );
}

interface AssignPopupProps {
    className?: string,
    setShow: (show: boolean) => void,
}