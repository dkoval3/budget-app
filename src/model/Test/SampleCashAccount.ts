import {Transaction} from "@/model/Transaction";
import {Account} from "@/model/Account";

export const sampleCashAccountTransactions: Transaction[] = [{
    id: '0',
    date: new Date(2025, 2, 1),
    payee: 'Marquis at Desert Ridge',
    category: 'Rent',
    categoryId: '3c2acc60-db5b-49ef-8d28-de44e25bf50f',
    categoryIdx: 0,
    notes: 'Automatic rent payment',
    amount: 1612.48,
}, {
    id: '1',
    date: new Date(2025, 2, 2),
    payee: 'Chipotle',
    category: 'Restaurants',
    categoryId: 'ecf6791d-97f2-428e-ad07-6a96389c5212',
    categoryIdx: 0,
    notes: '',
    amount: 10.93,
}, {
    id: '2',
    date: new Date(2025, 2, 3),
    payee: 'Top Golf',
    category: 'Fun',
    categoryId: '72895b6c-c85c-49e5-b541-55726159eedc',
    categoryIdx: 0,
    notes: '',
    amount: 54.34,
}, {
    id: '3',
    date: new Date(2025, 2, 4),
    payee: 'Albertsons',
    category: 'Groceries',
    categoryId: 'c6f83050-8dfd-44d1-9954-58e5bef52e84',
    categoryIdx: 0,
    notes: 'Game night supplies',
    amount: 34.87,
}];

export const sampleAccounts: Account[] = [{
    id: '',
    type: 'Cash',
    name: 'Wealthfront',
    linked: false,
    transactions: sampleCashAccountTransactions,
}];