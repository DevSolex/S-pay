
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

describe("S-pay Protocol: Merchant Registration", () => {
  it("allows registered user to become a merchant with stake", () => {
    const wallet = accounts.get("wallet_5")!;
    simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("merchant1")], wallet);
    const { result } = simnet.callPublicFn("s-pay", "register-merchant",
      [Cl.stringAscii("My Business"), Cl.stringAscii("https://mybiz.com")], wallet);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(true);
  });

  it("prevents non-users from registering as merchants", () => {
    const wallet = accounts.get("wallet_6")!;
    const { result } = simnet.callPublicFn("s-pay", "register-merchant",
      [Cl.stringAscii("Business"), Cl.stringAscii("https://test.com")], wallet);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(false);
  });
});

describe("S-pay Protocol: Merchant Admin Functions", () => {
  it("allows admin to verify merchants", () => {
    const wallet = accounts.get("wallet_7")!;
    simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("merchant2")], wallet);
    simnet.callPublicFn("s-pay", "register-merchant",
      [Cl.stringAscii("Business 2"), Cl.stringAscii("https://biz2.com")], wallet);
    const { result } = simnet.callPublicFn("s-pay", "verify-merchant", [Cl.principal(wallet)], DEPLOYER);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(true);
  });

  it("allows admin to suspend merchants", () => {
    const wallet = accounts.get("wallet_8")!;
    simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("merchant3")], wallet);
    simnet.callPublicFn("s-pay", "register-merchant",
      [Cl.stringAscii("Business 3"), Cl.stringAscii("https://biz3.com")], wallet);
    const { result } = simnet.callPublicFn("s-pay", "suspend-merchant", [Cl.principal(wallet)], DEPLOYER);
    const json = cvToJSON(result) as any;
    expect(json.success).toBe(true);
  });
});
