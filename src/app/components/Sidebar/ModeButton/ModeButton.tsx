export default function ModeButton({ message }: { message: string }) {
    return(
        <div className='flex items-center h-10 px-2 border-2 border-emerald-600'>
            <div>Icon</div>
            <div className='pl-7'>{message}</div>
        </div>
    );
}