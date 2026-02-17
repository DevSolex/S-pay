
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Withdrawal Proposals", () => {
    it("allows users to propose withdrawals", () => {
        const wallet = accounts.get("wallet_26")!;
        simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("withdrawuser")], wallet);
        simnet.callPublicFn("s-pay", "vault-deposit", [Cl.uint(5000000)], wallet);

        const { result } = simnet.callPublicFn("s-pay", "propose-withdrawal",
            [Cl.uint(1000000), Cl.principal(wallet)], wallet);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("allows users to cancel withdrawal proposals", () => {
        const wallet = accounts.get("wallet_27")!;
        simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("canceluser")], wallet);
        simnet.callPublicFn("s-pay", "vault-deposit", [Cl.uint(5000000)], wallet);
        simnet.callPublicFn("s-pay", "propose-withdrawal", [Cl.uint(1000000), Cl.principal(wallet)], wallet);

        const { result } = simnet.callPublicFn("s-pay", "cancel-withdrawal", [Cl.uint(1)], wallet);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });
});
