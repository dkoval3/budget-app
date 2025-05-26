import {ChangeEvent} from "react";

export default function EditItemPopup({ className, itemName, onOk, onDelete, onCancel, onChange }: EditItemPopupProps) {
    return(
        <div className={`flex flex-col bg-sidebarBackground absolute p-4 m-2 w-[22rem] translate-x-[-7.7rem] translate-y-[-0.5rem] rounded-xl ${className}`}>
            <input type='text'
                   className='bg-buttonHover mb-4 p-1 rounded'
                   autoFocus={true}
                   defaultValue={itemName}
                   onChange={onChange}
            />
            <div className='flex justify-between'>
                <div className='flex'>
                    <EditItemButton className='bg-buttonHover mr-2' message='Hide'/>
                    <EditItemButton onClick={onDelete} className='bg-red-900' message='Delete'/>
                </div>
                <div className='flex'>
                    <EditItemButton onClick={onCancel} className='bg-buttonHover mr-2' message='Cancel'/>
                    <EditItemButton onClick={onOk} className='bg-button' message='OK'/>
                </div>
            </div>
        </div>
    )
}

const EditItemButton = ({ className, message, onClick }: EditItemButton) => {
    return <button
        className={`${className} px-3 py-2 bg-blue-900 rounded-lg`}
        onClick={onClick}>
        {message}
    </button>
}

interface EditItemPopupProps {
    className?: string,
    itemName: string,
    onOk: () => void,
    onDelete: () => void,
    onCancel: () => void,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

interface EditItemButton {
    className?: string,
    message: string,
    onClick?: () => void,
}