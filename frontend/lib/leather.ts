/**
 * Direct Leather wallet RPC integration.
 * Bypasses deprecated Stacks Connect legacy flow for Leather users.
 */
import { cvToHex } from "@stacks/transactions";
import type { ClarityValue } from "@stacks/transactions";

declare global {
  interface Window {
    LeatherProvider?: {
      request: (method: string, params?: Record<string, unknown>) => Promise<unknown>;
    };
  }
}

export function isLeatherAvailable(): boolean {
  return typeof window !== "undefined" && !!window.LeatherProvider;
}

export async function leatherGetAddresses(): Promise<string | null> {
  if (!isLeatherAvailable()) return null;
  try {
    const res = await window.LeatherProvider!.request("getAddresses");
    const data = res as Record<string, unknown>;
    const addrs = (data?.result as Record<string, unknown>)?.addresses ??
      data?.addresses ?? [];
    const list = Array.isArray(addrs) ? addrs : [];
    const stx = list.find((a: Record<string, unknown>) => a?.symbol === "STX");
    return (stx?.address as string) ?? null;
  } catch {
    return null;
  }
}

export async function leatherCallContract(
  contract: string,
  functionName: string,
  functionArgs: ClarityValue[]
): Promise<void> {
  if (!isLeatherAvailable()) throw new Error("Leather not available");
  const args = functionArgs.map((cv) => cvToHex(cv));
  await window.LeatherProvider!.request("stx_callContract", {
    contract,
    functionName,
    functionArgs: args,
    network: "mainnet",
  });
}

export async function leatherTransferStx(
  recipient: string,
  amount: string,
  memo?: string
): Promise<void> {
  if (!isLeatherAvailable()) throw new Error("Leather not available");
  await window.LeatherProvider!.request("stx_transferStx", {
    recipient,
    amount,
    network: "mainnet",
    ...(memo && { memo }),
  });
}
