export default function ProfileTab() {
    const name = `Dane`;
    const email = 'danekoval3@gmail.com';
    return (
        <div className='flex w-full h-16 border-2 border-b-fuchsia-500 justify-between items-center px-2'>
            <i className="bi bi-brightness-alt-high-fill text-3xl"></i>
            <div>
                <div>{`${name}'s Budget`}</div>
                <div className='text-xs'>{email}</div>
            </div>
            <i className="bi bi-caret-down-fill"></i>
        </div>
    );
}