import {Account} from "@/model/Account";

export const getAccountBalance = (account: Account) => account.transactions.reduce((accumulator, current) => accumulator + current.amount, 0);