
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Event Emissions", () => {
    it("emits events on user registration", () => {
        const wallet = accounts.get("wallet_28")!;
        const receipt = simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("eventuser")], wallet);
        expect(receipt.events).toBeDefined();
        expect(receipt.events.length).toBeGreaterThan(0);
    });

    it("emits events on payment processing", () => {
        const merchant = accounts.get("wallet_29")!;
        const customer = accounts.get("wallet_30")!;
        simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("eventmerchant")], merchant);
        simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("eventcustomer")], customer);
        simnet.callPublicFn("s-pay", "register-merchant",
            [Cl.stringAscii("Event Shop"), Cl.stringAscii("https://event.com")], merchant);
        simnet.callPublicFn("s-pay", "verify-merchant", [Cl.principal(merchant)], DEPLOYER);

        const receipt = simnet.callPublicFn("s-pay", "process-payment",
            [Cl.principal(merchant), Cl.uint(1000000), Cl.stringAscii("Event Order")], customer);
        expect(receipt.events).toBeDefined();
        expect(receipt.events.length).toBeGreaterThan(0);
    });
});
