/**
 * S-pay contract configuration.
 * Uses mainnet s-pay-v3 deployment.
 */
export const SPAY_CONTRACT = {
  address: "SP2DBFGMT7SATSJPCCA38SDDPBNNQ86QWADJ3E6WT",
  name: "s-pay-v3",
} as const;

export const SPAY_FULL_CONTRACT = `${SPAY_CONTRACT.address}.${SPAY_CONTRACT.name}`;
