export function formatAsDollarAmount(amount: string | number) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error("The input must be a valid number.");
    }
    return `${amount < 0 ? '-': ''}$${Math.abs(Number(amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

export function numToDay(num: number) {
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