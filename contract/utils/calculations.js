function calculateFee(amount, feePercentage) {
  return Math.floor((amount * feePercentage) / 10000);
}

function calculateTotal(amount, feePercentage) {
  const fee = calculateFee(amount, feePercentage);
  return amount + fee;
}

function calculateNetAmount(total, feePercentage) {
  return Math.floor((total * 10000) / (10000 + feePercentage));
}

function microStxToStx(microStx) {
  return microStx / 1000000;
}

function stxToMicroStx(stx) {
  return Math.floor(stx * 1000000);
}

function formatAmount(amount, decimals = 6) {
  const divisor = Math.pow(10, decimals);
  return (amount / divisor).toFixed(decimals);
}

function parseAmount(amountStr, decimals = 6) {
  const multiplier = Math.pow(10, decimals);
  return Math.floor(parseFloat(amountStr) * multiplier);
}

function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return (part / total) * 100;
}

function roundToDecimals(value, decimals) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

module.exports = {
  calculateFee,
  calculateTotal,
  calculateNetAmount,
  microStxToStx,
  stxToMicroStx,
  formatAmount,
  parseAmount,
  calculatePercentage,
  roundToDecimals,
};
