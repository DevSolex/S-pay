const logger = require('../utils/logger');

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  off(event, listener) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return;
    const listeners = this.events.get(event);
    listeners.forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        logger.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

const contractEvents = new EventEmitter();

// Event types
const EVENT_TYPES = {
  USER_REGISTERED: 'user:registered',
  MERCHANT_REGISTERED: 'merchant:registered',
  PAYMENT_PROCESSED: 'payment:processed',
  PAYMENT_FAILED: 'payment:failed',
  WITHDRAWAL_COMPLETED: 'withdrawal:completed',
  DEPOSIT_COMPLETED: 'deposit:completed',
  CONTRACT_PAUSED: 'contract:paused',
  CONTRACT_RESUMED: 'contract:resumed',
  FEE_UPDATED: 'fee:updated',
};

// Helper functions to emit events
function emitUserRegistered(address, username) {
  contractEvents.emit(EVENT_TYPES.USER_REGISTERED, { address, username, timestamp: Date.now() });
  logger.info(`User registered: ${username} (${address})`);
}

function emitMerchantRegistered(address, businessName) {
  contractEvents.emit(EVENT_TYPES.MERCHANT_REGISTERED, { address, businessName, timestamp: Date.now() });
  logger.info(`Merchant registered: ${businessName} (${address})`);
}

function emitPaymentProcessed(txId, from, to, amount) {
  contractEvents.emit(EVENT_TYPES.PAYMENT_PROCESSED, { txId, from, to, amount, timestamp: Date.now() });
  logger.info(`Payment processed: ${amount} from ${from} to ${to}`);
}

function emitPaymentFailed(txId, error) {
  contractEvents.emit(EVENT_TYPES.PAYMENT_FAILED, { txId, error, timestamp: Date.now() });
  logger.error(`Payment failed: ${txId} - ${error}`);
}

module.exports = {
  contractEvents,
  EVENT_TYPES,
  emitUserRegistered,
  emitMerchantRegistered,
  emitPaymentProcessed,
  emitPaymentFailed,
};
