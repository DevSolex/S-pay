import { Cl } from "@stacks/transactions";

export function createMockAccounts(count = 10) {
    const accounts = new Map();
    for (let i = 0; i < count; i++) {
        accounts.set(`wallet_${i}`, `SP${i.toString().padStart(39, '0')}`);
    }
    accounts.set("deployer", "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9");
    return accounts;
}

export function createTestUser(simnet, username, wallet) {
    return simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii(username)], wallet);
}

export function createTestMerchant(simnet, username, businessName, website, wallet, deployer) {
    simnet.callPublicFn("s-pay", "register-user", [Cl.stringAscii(username)], wallet);
    simnet.callPublicFn("s-pay", "register-merchant",
        [Cl.stringAscii(businessName), Cl.stringAscii(website)], wallet);
    return simnet.callPublicFn("s-pay", "verify-merchant", [Cl.principal(wallet)], deployer);
}

export function processTestPayment(simnet, merchant, customer, amount, memo) {
    return simnet.callPublicFn("s-pay", "process-payment",
        [Cl.principal(merchant), Cl.uint(amount), Cl.stringAscii(memo)], customer);
}

export function mintTestTokens(simnet, recipient, amount, deployer) {
    return simnet.callPublicFn("ltc", "mint",
        [Cl.uint(amount), Cl.principal(recipient)], deployer);
}

export function transferTestTokens(simnet, sender, recipient, amount) {
    return simnet.callPublicFn("ltc", "transfer",
        [Cl.uint(amount), Cl.principal(sender), Cl.principal(recipient), Cl.none()], sender);
}

export function depositToVault(simnet, wallet, amount) {
    return simnet.callPublicFn("s-pay", "vault-deposit", [Cl.uint(amount)], wallet);
}

export function withdrawFromVault(simnet, wallet, amount) {
    return simnet.callPublicFn("s-pay", "vault-withdraw", [Cl.uint(amount)], wallet);
}

export const TEST_AMOUNTS = {
    SMALL: 100000,    // 0.1 STX
    MEDIUM: 1000000,  // 1 STX
    LARGE: 10000000,  // 10 STX
};

export const TEST_USERS = {
    ALICE: "alice",
    BOB: "bob",
    CHARLIE: "charlie",
    MERCHANT1: "merchant1",
    MERCHANT2: "merchant2",
};
