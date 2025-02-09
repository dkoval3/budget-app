export default function AccountTypeDropdown({ accountType, amount }: { accountType: string, amount: number }) {
    return (
        <div className='flex justify-between items-center px-2 h-10 border-2 border-indigo-400'>
            <div className='flex items-center'>
                <i className="bi bi-caret-right-fill"></i>
                <div className='text-xs pl-3'>{accountType}</div>
            </div>
            <div className='text-xs'>{amount}</div>
        </div>
    );
}