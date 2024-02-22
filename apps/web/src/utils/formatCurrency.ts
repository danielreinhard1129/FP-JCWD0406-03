const formatCurrency = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  return formattedAmount;
};
export default formatCurrency;
