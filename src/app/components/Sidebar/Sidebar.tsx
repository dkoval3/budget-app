import ProfileTab from "@/app/components/Sidebar/ProfileTab/ProfileTab";
import ModeButton from "@/app/components/Sidebar/ModeButton/ModeButton";
import AccountTypeDropdown from "@/app/components/Sidebar/AccountTypeDropdown/AccountTypeDropdown";
import Button from "@/app/components/Button/Button";

export default function Sidebar() {
    return(
        <div className='flex-col border-2 h-full w-72'>
            <ProfileTab />
            <ModeButton message='Budget' />
            <ModeButton message='Reflect' />
            <ModeButton message='All Accounts' />
            <AccountTypeDropdown accountType='Cash' amount={1000}/>
            <AccountTypeDropdown accountType='Credit' amount={-1419.46}/>
            <Button text='Add Account' icon='+' width='w-1/2' />
        </div>
    );
}