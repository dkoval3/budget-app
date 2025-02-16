import {targetMessage} from "@/common/MessageConstants";
import Button1 from "@/app/components/Button/Button1";

export default function NoTarget({ categoryName }: { categoryName: string }) {
    return (
        <div className='flex flex-col p-2 border-t-[0.5px] border-gray-700'>
            <div className='text-sm m-1'>How much do you need for {categoryName}?</div>
            <div className='text-xs m-1'>{targetMessage}</div>
            <Button1 className='m-1' text={'Create Target'}/>
        </div>
    );
}