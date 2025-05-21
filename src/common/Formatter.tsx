import {FILL_UP, HAVE_BALANCE, SET_ASIDE, TargetType} from "@/model/Target";

export function formatAsDollarAmount(amount: string | number) {
    if (typeof amount === 'string') {
        amount = parseFloat(amount);
    }
    if (typeof amount !== 'number' || isNaN(amount)) throw new Error(`Formatter error: typeof amount is ${typeof amount}`);
    return `${amount < 0 ? '-': ''}$${Math.abs(Number(amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

export function parseAsDollarAmount(amount: string): number {
    return parseFloat(parseFloat(amount.replace(/[^0-9.]/g, '')).toFixed(2));
}

export function formatAsDate(date: Date, separator: string = '/') {
    return `${date.getMonth()}${separator}${date.getDay() + 1}${separator}${date.getFullYear()}`
}

export function numToDay(num: number | string) {
    if (typeof num === 'string') num = parseInt(num);
    switch (num % 10) {
        case 1:
            return `${num}st`;
        case 2:
            return `${num}nd`;
        case 3:
            return `${num}rd`;
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