export type Transaction = {
    id: string,
    date: Date,
    payee: string,
    category: string,
    categoryId: string,
    categoryIdx: number,
    notes: string,
    amount: number,
};