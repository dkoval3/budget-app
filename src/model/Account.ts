import {Transaction} from "@/model/Transaction";

export type Account = {
    id: string,
    name: string,
    type: string,
    linked: boolean,
    transactions: Transaction[],
};