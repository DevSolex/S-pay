import { 
  PostCondition,
  makeStandardSTXPostCondition,
  makeContractSTXPostCondition,
  FungibleConditionCode
} from '@stacks/transactions';

export function createSTXPostCondition(
  address: string,
  amount: bigint
): PostCondition {
  return makeStandardSTXPostCondition(
    address,
    FungibleConditionCode.LessEqual,
    amount
  );
}

export function createContractSTXPostCondition(
  contractAddress: string,
  contractName: string,
  amount: bigint
): PostCondition {
  return makeContractSTXPostCondition(
    contractAddress,
    contractName,
    FungibleConditionCode.GreaterEqual,
    amount
  );
}
