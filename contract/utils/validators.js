function validateAddress(address) {
  if (!address || typeof address !== 'string') {
    return { valid: false, error: 'Address is required' };
  }

  const addressRegex = /^(SP|ST)[0-9A-Z]{38,41}$/;
  if (!addressRegex.test(address)) {
    return { valid: false, error: 'Invalid Stacks address format' };
  }

  return { valid: true };
}

function validateAmount(amount) {
  if (amount === undefined || amount === null) {
    return { valid: false, error: 'Amount is required' };
  }

  const numAmount = typeof amount === 'string' ? parseInt(amount) : amount;

  if (isNaN(numAmount) || numAmount <= 0) {
    return { valid: false, error: 'Amount must be positive' };
  }

  if (!Number.isFinite(numAmount)) {
    return { valid: false, error: 'Amount must be finite' };
  }

  return { valid: true, value: numAmount };
}

function validateUsername(username) {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Username is required' };
  }

  if (username.length < 3 || username.length > 24) {
    return { valid: false, error: 'Username must be 3-24 characters' };
  }

  const usernameRegex = /^[a-z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return { valid: false, error: 'Username can only contain lowercase letters, numbers, and hyphens' };
  }

  return { valid: true };
}

function validateBusinessName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Business name is required' };
  }

  if (name.length < 2 || name.length > 50) {
    return { valid: false, error: 'Business name must be 2-50 characters' };
  }

  return { valid: true };
}

function validateFeePercentage(fee) {
  const numFee = typeof fee === 'string' ? parseInt(fee) : fee;

  if (isNaN(numFee) || numFee < 0 || numFee > 10000) {
    return { valid: false, error: 'Fee must be between 0 and 10000 (0-100%)' };
  }

  return { valid: true, value: numFee };
}

module.exports = {
  validateAddress,
  validateAmount,
  validateUsername,
  validateBusinessName,
  validateFeePercentage,
};
