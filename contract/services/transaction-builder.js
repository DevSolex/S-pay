const { validateAddress, validateAmount, validateUsername, validateBusinessName } = require('../utils/validators');
const { calculateFee, calculateTotal } = require('../utils/calculations');
const logger = require('../utils/logger');

class TransactionBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.transaction = {
      contractAddress: null,
      contractName: null,
      functionName: null,
      functionArgs: [],
      postConditions: [],
      network: 'mainnet',
      fee: null,
    };
    return this;
  }

  setContract(address, name) {
    const validation = validateAddress(address);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    this.transaction.contractAddress = address;
    this.transaction.contractName = name;
    return this;
  }

  setFunction(name) {
    this.transaction.functionName = name;
    return this;
  }

  addArg(arg) {
    this.transaction.functionArgs.push(arg);
    return this;
  }

  addPostCondition(condition) {
    this.transaction.postConditions.push(condition);
    return this;
  }

  setNetwork(network) {
    this.transaction.network = network;
    return this;
  }

  setFee(fee) {
    const validation = validateAmount(fee);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    this.transaction.fee = validation.value;
    return this;
  }

  build() {
    if (!this.transaction.contractAddress) {
      throw new Error('Contract address is required');
    }
    if (!this.transaction.functionName) {
      throw new Error('Function name is required');
    }

    logger.debug('Transaction built:', this.transaction);
    return { ...this.transaction };
  }

  // Convenience methods for common transactions
  buildRegisterUser(contractAddress, username) {
    const validation = validateUsername(username);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return this.reset()
      .setContract(contractAddress, 's-pay')
      .setFunction('register-user')
      .addArg(username)
      .build();
  }

  buildRegisterMerchant(contractAddress, businessName, stakeAmount) {
    const nameValidation = validateBusinessName(businessName);
    if (!nameValidation.valid) {
      throw new Error(nameValidation.error);
    }

    const amountValidation = validateAmount(stakeAmount);
    if (!amountValidation.valid) {
      throw new Error(amountValidation.error);
    }

    return this.reset()
      .setContract(contractAddress, 's-pay')
      .setFunction('register-merchant')
      .addArg(businessName)
      .addArg(amountValidation.value)
      .build();
  }

  buildProcessPayment(contractAddress, merchantAddress, amount) {
    const addressValidation = validateAddress(merchantAddress);
    if (!addressValidation.valid) {
      throw new Error(addressValidation.error);
    }

    const amountValidation = validateAmount(amount);
    if (!amountValidation.valid) {
      throw new Error(amountValidation.error);
    }

    return this.reset()
      .setContract(contractAddress, 's-pay')
      .setFunction('process-payment')
      .addArg(merchantAddress)
      .addArg(amountValidation.value)
      .build();
  }
}

module.exports = TransactionBuilder;
