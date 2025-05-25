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

export const newTransaction = (amount: number = 0) => ({
    id: crypto.randomUUID(),
    checked: false,
    date: new Date(),
    payee: '',
    category: '',
    categoryId: '',
    categoryIdx: 0,
    notes: '',
    amount,
});