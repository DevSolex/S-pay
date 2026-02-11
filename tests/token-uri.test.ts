
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Token: URI", () => {
    it("returns token URI", () => {
        const { result } = simnet.callReadOnlyFn("s-pay-token", "get-token-uri", [], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });
});
