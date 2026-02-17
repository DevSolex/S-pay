
import { describe, expect, it } from "vitest";
import { cvToJSON, Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const DEPLOYER = accounts.get("deployer")!;

describe("S-pay Protocol: Integration Tests", () => {
    it("completes full user-to-merchant payment flow", () => {
        const merchant = accounts.get("wallet_31")!;
        const customer = accounts.get("wallet_32")!;

        // Register users
        simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("intmerchant")], merchant);
        simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii("intcustomer")], customer);

        // Register and verify merchant
        simnet.callPublicFn("s-pay", "register-merchant",
            [Cl.stringAscii("Integration Shop"), Cl.stringAscii("https://int.com")], merchant);
        simnet.callPublicFn("s-pay", "verify-merchant", [Cl.principal(merchant)], DEPLOYER);

        // Process payment
        const { result } = simnet.callPublicFn("s-pay", "process-payment",
            [Cl.principal(merchant), Cl.uint(2000000), Cl.stringAscii("Integration Test")], customer);
        const json = cvToJSON(result) as any;
        expect(json.success).toBe(true);

        // Verify metrics updated
        const metrics = simnet.callReadOnlyFn("s-pay", "get-protocol-status", [], DEPLOYER);
        const metricsJson = cvToJSON(metrics.result) as any;
        expect(parseInt(metricsJson.value.value['total-volume'].value)).toBeGreaterThan(0);
    });
});
