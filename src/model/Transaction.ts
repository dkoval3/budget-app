export type Transaction = {
    id: string,
    checked: boolean,
    date: Date,
    payee: string,
    category: string,
    categoryId: string,
    categoryIdx: number,
    notes: string,
    amount: number,
};