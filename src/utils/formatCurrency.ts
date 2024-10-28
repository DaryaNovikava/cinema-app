export function formatCurrency(sum: string): string {
 const amount = Number(sum);
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default formatCurrency;
