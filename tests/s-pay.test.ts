
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

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

describe("S-pay Protocol: User Registration", () => {
  it("allows a new user to register with a unique username", () => {
    const username = "alice";
    const { result } = simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii(username)], accounts.get("wallet_1")!);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(true);
  });

  it("prevents duplicate username registration", () => {
    const username = "bob";
    simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii(username)], accounts.get("wallet_2")!);
    const { result } = simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii(username)], accounts.get("wallet_3")!);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(false);
  });

  it("validates username length constraints", () => {
    const longUsername = "a".repeat(25); // Max is 24
    const { result } = simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii(longUsername)], accounts.get("wallet_4")!);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(false);
  });
});
