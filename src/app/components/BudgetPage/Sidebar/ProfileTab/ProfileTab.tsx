import { userAccountIcon } from "@/app/IconConstants";

export default function ProfileTab() {
    const name = `Dane`;
    const email = 'danekoval3@gmail.com';
    return (
        <button className='flex w-full h-16 hover:bg-blue-900 rounded-xl transition-colors justify-between items-center px-2'>
            <i className={`${userAccountIcon} bi bi-brightness-alt-high-fill text-4xl`}></i>
            <div>
                <div>{`${name}'s Budget`}</div>
                <div className='text-xs'>{email}</div>
            </div>
            <i className="bi bi-caret-down-fill"></i>
        </button>
    );
}