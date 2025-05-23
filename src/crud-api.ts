import {Transaction} from "@/model/Transaction";
import {Target} from "@/model/Target";

export async function getBudget(url: string) {
    return Promise.resolve({ url });
}

export async function getAccounts(url: string) {
    return Promise.resolve({ url });
}

export async function postTransaction(url: string, tx: Transaction) {
    return Promise.resolve({ url, tx });
}

export async function putTransaction(url: string, tx: Transaction) {
    return Promise.resolve({ url, tx });
}

export async function postTarget(url: string, target: Target) {
    return Promise.resolve({ url, target });
}

export async function putTarget(url: string, target: Target) {
    return Promise.resolve({ url, target });
}