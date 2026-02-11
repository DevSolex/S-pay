
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Fee Configuration", () => {
    it("allows admin to update fee percentage", () => {
        const { result } = simnet.callPublicFn("s-pay", "set-fee-percentage", [Cl.uint(300)], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("allows admin to set fee receiver", () => {
        const newReceiver = accounts.get("wallet_25")!;
        const { result } = simnet.callPublicFn("s-pay", "set-fee-receiver", [Cl.principal(newReceiver)], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });
});
