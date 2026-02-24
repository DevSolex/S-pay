import { 
  stringAsciiCV, 
  uintCV, 
  intCV, 
  boolCV, 
  principalCV,
  bufferCV,
  listCV,
  tupleCV,
  someCV,
  noneCV,
  ClarityValue
} from '@stacks/transactions';

export function createStringCV(value: string): ClarityValue {
  return stringAsciiCV(value);
}

export function createUintCV(value: number | bigint): ClarityValue {
  return uintCV(value);
}

export function createIntCV(value: number | bigint): ClarityValue {
  return intCV(value);
}

export function createBoolCV(value: boolean): ClarityValue {
  return boolCV(value);
}

export function createPrincipalCV(address: string): ClarityValue {
  return principalCV(address);
}

export function createOptionalCV(value: ClarityValue | null): ClarityValue {
  return value ? someCV(value) : noneCV();
}

export function createListCV(values: ClarityValue[]): ClarityValue {
  return listCV(values);
}

export function createTupleCV(data: Record<string, ClarityValue>): ClarityValue {
  return tupleCV(data);
}
