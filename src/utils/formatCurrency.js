export function formatCurrency(sum) {
    const amount = Number(sum);
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
}
export default formatCurrency;
