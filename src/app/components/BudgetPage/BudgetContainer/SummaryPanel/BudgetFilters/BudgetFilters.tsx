export default function BudgetFilters() {
    return (
        <div>
            <FilterButton message='All' />
            <FilterButton message='Underfunded' />
            <FilterButton message='Overfunded' />
            <FilterButton message='Money Available' />
            <FilterButton message='Snoozed' />
        </div>
    );
}

const FilterButton = ({ message }: FilterButtonProps) => (
    <button className='bg-gray-700 text-xs'>{message}</button>
);

interface FilterButtonProps {
    message: string,
};