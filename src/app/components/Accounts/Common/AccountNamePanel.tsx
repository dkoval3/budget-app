import {Account} from "@/model/Account";

export default function AccountNamePanel({ account, className }: AccountNamePanelProps) {
    return(
        <div className={`${className} border-b-[0.5px] border-gray-700 pb-2`}>
            <div className='flex justify-between'>
                <div className='text-xl'>{account.name}</div>
                <button className='mr-1'>
                    <i className="bi bi-pencil"></i>
                </button>
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