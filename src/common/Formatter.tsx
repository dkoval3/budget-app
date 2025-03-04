import {FILL_UP, HAVE_BALANCE, SET_ASIDE, TargetType} from "@/model/Target";

export function formatAsDollarAmount(amount: string | number) {
    if (typeof amount !== 'number' || isNaN(amount)) throw new Error("The input must be a valid number.");
    return `${amount < 0 ? '-': ''}$${Math.abs(Number(amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

export function numToDay(num: number | string) {
    if (typeof num === 'string') num = parseInt(num);
    switch (num) {
        case 1:
            return '1st';
        case 2:
            return '2nd'
        case 3:
            return '3rd'
        default:
            return `${num}th`;
    }
}

export function toRegularCase(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const nextMonthMessage = (type: TargetType) => {
    if (type === FILL_UP) return 'Refill up to ';
    if (type === SET_ASIDE) return 'Set aside another ';
    if (type === HAVE_BALANCE) return 'Have a balance of ';
}

export const notEmptyOrNull = (str: string) => str !== null && str !== undefined && str !== '';