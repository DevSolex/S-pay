
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Blacklist/Whitelist", () => {
    it("allows admin to blacklist addresses", () => {
        const address = accounts.get("wallet_21")!;
        const { result } = simnet.callPublicFn("s-pay", "blacklist-address", [Cl.principal(address)], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("allows admin to whitelist addresses", () => {
        const address = accounts.get("wallet_22")!;
        const { result } = simnet.callPublicFn("s-pay", "whitelist-address", [Cl.principal(address)], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("allows admin to unblacklist addresses", () => {
        const address = accounts.get("wallet_23")!;
        simnet.callPublicFn("s-pay", "blacklist-address", [Cl.principal(address)], DEPLOYER);
        const { result } = simnet.callPublicFn("s-pay", "unblacklist-address", [Cl.principal(address)], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });
});
