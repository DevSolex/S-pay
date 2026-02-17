
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Pause/Unpause", () => {
    it("allows admin to pause contract", () => {
        const { result } = simnet.callPublicFn("s-pay", "pause-contract", [], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("prevents operations when contract is paused", () => {
        const wallet = accounts.get("wallet_24")!;
        const { result } = simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("pauseduser")], wallet);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(false);
    });

    it("allows admin to unpause contract", () => {
        const { result } = simnet.callPublicFn("s-pay", "unpause-contract", [], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });
});
