
import { describe, expect, it } from "vitest";
import { cvToJSON } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Initialization", () => {
  it("ensures simnet is well initialised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("checks initial protocol status", () => {
    const { result } = simnet.callReadOnlyFn("s-pay", "get-protocol-status", [], DEPLOYER);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(true);
    expect(json.value.value.version.value).toBe("1.0.0");
    expect(json.value.value.paused.value).toBe(false);
  });
});
