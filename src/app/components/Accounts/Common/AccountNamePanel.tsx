import {Account} from "@/model/Account";
import {useState} from "react";
import EditItemPopup from "@/app/components/Accounts/Common/EditNamePopup";
import UseBudget from "@/app/components/Hooks/UseBudget";

export default function AccountNamePanel({ account, className }: AccountNamePanelProps) {
    const [showRename, setShowRename] = useState(false);
    const [newName, setNewName] = useState(account.name);
    const {updateAccountName, currentAccountIdx} = UseBudget();
    return(
        <div className={`${className} border-b-[0.5px] border-gray-700 pb-2`}>
            <div className='flex relative justify-between'>
                <div className='text-xl'>{account.name}</div>
                <button
                    className='mr-1'
                    onClick={() => setShowRename(true)}>
                    <i className="bi bi-pencil"></i>
                </button>
                {
                    showRename
                        ? <EditItemPopup
                            className='absolute right-0 translate-y-7'
                            showDelete={false}
                            itemName={account.name}
                            onOk={() => {
                                updateAccountName(currentAccountIdx, newName);
                                setShowRename(false);
                            }}
                            onCancel={() => setShowRename(false)}
                            onChange={e => setNewName(e.target.value)} />
                        : null
                }
            </div>

            <div className='flex'>
                <div className='mr-4 text-sm'>{account.type}</div>
                <div className='text-sm'>{account.linked ? 'Linked' : 'Not Linked'}</div>
            </div>
        </div>
    );
}

interface AccountNamePanelProps {
    account: Account,
    className?: string
}