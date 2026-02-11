
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Merchant Tiers", () => {
    it("allows admin to set merchant tier", () => {
        const merchant = accounts.get("wallet_18")!;
        simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("tiermerchant")], merchant);
        simnet.callPublicFn("s-pay", "register-merchant",
            [Cl.stringAscii("Tier Business"), Cl.stringAscii("https://tier.com")], merchant);

        const { result } = simnet.callPublicFn("s-pay", "set-merchant-tier",
            [Cl.principal(merchant), Cl.stringAscii("premium")], DEPLOYER);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);
    });

    it("prevents non-admin from setting merchant tier", () => {
        const merchant = accounts.get("wallet_19")!;
        const nonAdmin = accounts.get("wallet_20")!;

        const { result } = simnet.callPublicFn("s-pay", "set-merchant-tier",
            [Cl.principal(merchant), Cl.stringAscii("premium")], nonAdmin);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(false);
    });
});
