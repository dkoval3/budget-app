export function formatAsDollarAmount(amount: number) {
    if (isNaN(amount)) {
        throw new Error("The input must be a valid number.");
    }
    return `${amount < 0 ? '-': ''}$${Math.abs(Number(amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}