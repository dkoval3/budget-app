import {Budget, BudgetCategory, BudgetLineItem} from "@/model/BudgetTypes";

export default function BudgetTable({ budget, className }: BudgetTableProps) {
    return (
        <table className={`${className}`} >
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Assigned</th>
                    <th>Activity</th>
                    <th>Available</th>
                </tr>
            </thead>
            <tbody>
            {generateTableBody(budget)}
            </tbody>
        </table>
    );
}

const generateTableBody = (budget: Budget) => {
    return budget.map((budgetCategory, i) => {
        const categoryLineItem = generateCategoryLineItem(budgetCategory);
        return <CategorySubTable key={i} categoryLineItem={categoryLineItem} lineItems={budgetCategory.lineItems} />
    })
}

const CategorySubTable = ({ categoryLineItem, lineItems }: CategorySubTableProps) => {
    return (
        <>
            <BudgetRow item={categoryLineItem} />
            {lineItems.map((item, i) => (<BudgetRow key={i} item={item} />))}
        </>
    );
}

const BudgetRow = ({ item, className }: BudgetRowProps) => (
    <tr {...{ className }}>
        <td>{item.lineItem}</td>
        <td>{item.assigned}</td>
        <td>{item.activity}</td>
        <td>{item.assigned - item.activity}</td>
    </tr>
);

function generateCategoryLineItem(budgetCategory: BudgetCategory): BudgetLineItem {
    const categoryLineItem = new BudgetLineItem();
    categoryLineItem.lineItem = budgetCategory.categoryName;
    return budgetCategory.lineItems.reduce((previousVal, currentValue) => {
        previousVal.activity += currentValue.activity;
        previousVal.assigned += currentValue.assigned;
        return previousVal;
    }, categoryLineItem);
}

interface BudgetTableProps {
    budget: Budget,
    className?: string,
}

interface CategorySubTableProps {
    categoryLineItem: BudgetLineItem,
    lineItems: BudgetLineItem[],
}

interface BudgetRowProps {
    item: BudgetLineItem,
    className?: string,
}