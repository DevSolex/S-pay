
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Token: SIP-010 Compliance", () => {
    it("returns correct token name", () => {
        const { result } = simnet.callReadOnlyFn("s-pay-token", "get-name", [], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
        expect(json.value.value).toBe("S-pay Token");
    });

    it("returns correct token symbol", () => {
        const { result } = simnet.callReadOnlyFn("s-pay-token", "get-symbol", [], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
        expect(json.value.value).toBe("SPAY");
    });

    it("returns correct decimals", () => {
        const { result } = simnet.callReadOnlyFn("s-pay-token", "get-decimals", [], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
        expect(json.value.value).toBe("6");
    });
});

describe("S-pay Token: Transfer Operations", () => {
    it("allows owner to mint tokens", () => {
        const recipient = accounts.get("wallet_1")!;
        const { result } = simnet.callPublicFn("s-pay-token", "mint",
            [Cl.uint(1000000), Cl.principal(recipient)], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("allows token holders to transfer tokens", () => {
        const sender = accounts.get("wallet_1")!;
        const recipient = accounts.get("wallet_2")!;
        const { result } = simnet.callPublicFn("s-pay-token", "transfer",
            [Cl.uint(100000), Cl.principal(sender), Cl.principal(recipient), Cl.none()], sender);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("tracks token balances correctly", () => {
        const wallet = accounts.get("wallet_2")!;
        const { result } = simnet.callReadOnlyFn("s-pay-token", "get-balance", [Cl.principal(wallet)], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
        expect(parseInt(json.value.value)).toBeGreaterThan(0);
    });
});

describe("S-pay Token: Minting Restrictions", () => {
    it("prevents non-owners from minting tokens", () => {
        const nonOwner = accounts.get("wallet_3")!;
        const recipient = accounts.get("wallet_4")!;
        const { result } = simnet.callPublicFn("s-pay-token", "mint",
            [Cl.uint(1000000), Cl.principal(recipient)], nonOwner);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(false);
    });

    it("tracks total supply correctly", () => {
        const { result } = simnet.callReadOnlyFn("s-pay-token", "get-total-supply", [], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
        expect(parseInt(json.value.value)).toBeGreaterThan(0);
    });
});
