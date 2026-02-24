import { 
  cvToJSON, 
  hexToCV,
  deserializeCV,
  serializeCV,
  ClarityValue 
} from '@stacks/transactions';

export function parseClarityValue(hex: string): any {
  try {
    const cv = hexToCV(hex);
    return cvToJSON(cv);
  } catch (error) {
    console.error('Failed to parse Clarity value:', error);
    return null;
  }
}

export function serializeClarityValue(cv: ClarityValue): Buffer {
  return serializeCV(cv);
}

export function deserializeClarityValue(buffer: Buffer): ClarityValue {
  return deserializeCV(buffer);
}

export function clarityValueToJSON(cv: ClarityValue): any {
  return cvToJSON(cv);
}
