import Button from "@/app/components/Button/Button";

export default function BudgetOperationsBar() {
    return (
        <div className='flex border-y-[0.5px] border-gray-700'>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-plus-circle-fill' message='Category Group'/>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-arrow-counterclockwise' message='Undo'/>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-arrow-clockwise' message='Redo'/>
            <Button className='hover:bg-buttonHover mx-1' iconName='bi bi-clock-history' message='Recent Moves'/>
        </div>
    );
}