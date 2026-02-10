
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
