import { userAccountIcon } from "@/app/IconConstants";
import {useState} from "react";
import ExpandedProfile from "@/app/components/BudgetPage/Sidebar/ProfileTab/ExpandedProfile";

export default function ProfileTab() {
    const [expandProfile, setExpandProfile] = useState(false);
    const name = `Dane`;
    const email = 'danekoval3@gmail.com';
    return (
        <div>
            <button
                onClick={() => setExpandProfile(v => !v)}
                className='flex w-full h-16 hover:bg-blue-900 rounded-xl transition-colors justify-between items-center px-2'
            >
                <i className={`${userAccountIcon} bi bi-brightness-alt-high-fill text-4xl`}></i>
                <div>
                    <div>{`${name}'s Budget`}</div>
                    <div className='text-xs'>{email}</div>
                </div>
                <i className="bi bi-caret-down-fill"></i>
            </button>
            { expandProfile ? <ExpandedProfile /> : null }
        </div>
    );
}