const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

class ContractManager {
  constructor(contractsDir = './contracts') {
    this.contractsDir = contractsDir;
    this.contracts = new Map();
  }

  async loadContract(name) {
    try {
      const filePath = path.join(this.contractsDir, `${name}.clar`);
      const source = await fs.readFile(filePath, 'utf-8');
      this.contracts.set(name, source);
      logger.info(`Loaded contract: ${name}`);
      return source;
    } catch (error) {
      logger.error(`Failed to load contract ${name}:`, error);
      throw error;
    }
  }

  async loadAllContracts() {
    try {
      const files = await fs.readdir(this.contractsDir);
      const clarFiles = files.filter(f => f.endsWith('.clar'));
      
      for (const file of clarFiles) {
        const name = file.replace('.clar', '');
        await this.loadContract(name);
      }
      
      logger.info(`Loaded ${clarFiles.length} contracts`);
      return Array.from(this.contracts.keys());
    } catch (error) {
      logger.error('Failed to load contracts:', error);
      throw error;
    }
  }

  getContract(name) {
    return this.contracts.get(name);
  }

  hasContract(name) {
    return this.contracts.has(name);
  }

  listContracts() {
    return Array.from(this.contracts.keys());
  }

  async saveContract(name, source) {
    try {
      const filePath = path.join(this.contractsDir, `${name}.clar`);
      await fs.writeFile(filePath, source, 'utf-8');
      this.contracts.set(name, source);
      logger.info(`Saved contract: ${name}`);
    } catch (error) {
      logger.error(`Failed to save contract ${name}:`, error);
      throw error;
    }
  }

  getContractInfo(name) {
    const source = this.contracts.get(name);
    if (!source) return null;

    return {
      name,
      size: source.length,
      lines: source.split('\n').length,
      functions: this.extractFunctions(source),
      readOnly: this.extractReadOnlyFunctions(source),
    };
  }

  extractFunctions(source) {
    const regex = /\(define-public\s+\(([a-z-]+)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }

  extractReadOnlyFunctions(source) {
    const regex = /\(define-read-only\s+\(([a-z-]+)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }
}

module.exports = ContractManager;
