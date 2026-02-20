function formatDate(timestamp) {
  return new Date(timestamp).toISOString();
}

function formatAddress(address, length = 8) {
  if (!address || address.length < length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

function formatCurrency(amount, symbol = 'STX', decimals = 6) {
  const value = amount / Math.pow(10, decimals);
  return `${value.toFixed(decimals)} ${symbol}`;
}

function formatPercentage(value, decimals = 2) {
  return `${value.toFixed(decimals)}%`;
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

function formatNumber(num, decimals = 2) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

module.exports = {
  formatDate,
  formatAddress,
  formatCurrency,
  formatPercentage,
  formatDuration,
  formatNumber,
  formatBytes,
};
