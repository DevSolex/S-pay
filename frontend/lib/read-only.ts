/**
 * Read-only contract calls using @stacks/transactions for encoding/decoding.
 */
import { cvToHex, deserializeCV, cvToValue } from "@stacks/transactions";
import type { ClarityValue } from "@stacks/transactions";
import { SPAY_CONTRACT } from "./constants";

const API_BASE = "https://api.mainnet.hiro.so/v2";

export async function callReadOnly<T = ClarityValue>(
  functionName: string,
  functionArgs: ClarityValue[],
  senderAddress: string
): Promise<T> {
  const args = functionArgs.map((cv) => cvToHex(cv));
  const url = `${API_BASE}/contracts/call-read/${SPAY_CONTRACT.address}/${SPAY_CONTRACT.name}/${functionName}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: senderAddress, arguments: args }),
  });
  if (!res.ok) throw new Error(`Read call failed: ${res.statusText}`);
  const data = await res.json();
  return deserializeCV(data.result) as T;
}

export async function getProtocolStatus(senderAddress: string) {
  const cv = await callReadOnly("get-protocol-status", [], senderAddress);
  return cvToValue(cv);
}
