import {
    makeContractDeploy,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    getAddressFromPrivateKey
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '../.env') });
config();

const privateKey = process.env.PRIVATE_KEY;
const network = STACKS_MAINNET;
const address = getAddressFromPrivateKey(privateKey, 'mainnet');

const tokens = [
    { name: 'alpha-token', symbol: 'ALPHA' },
    { name: 'beta-token', symbol: 'BETA' },
    { name: 'gamma-token', symbol: 'GAMMA' },
    { name: 'delta-token', symbol: 'DELTA' },
    { name: 'epsilon-token', symbol: 'EPSILON' },
    { name: 'zeta-token', symbol: 'ZETA' },
    { name: 'eta-token', symbol: 'ETA' },
    { name: 'theta-token', symbol: 'THETA' },
    { name: 'iota-token', symbol: 'IOTA' },
    { name: 'kappa-token', symbol: 'KAPPA' }
];

function generateContract(name, symbol) {
    return `;; ${name}.clar
(impl-trait .sip-010-trait.sip-010-trait)
(define-fungible-token ${name})
(define-constant contract-owner tx-sender)
(define-constant ERR-NOT-OWNER (err u100))
(define-constant ERR-NOT-AUTHORIZED (err u101))

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (or (is-eq tx-sender sender) (is-eq contract-caller sender)) ERR-NOT-AUTHORIZED)
        (try! (ft-transfer? ${name} amount sender recipient))
        (match memo to-print (print to-print) 0x)
        (ok true)
    )
)

(define-read-only (get-name) (ok "${symbol} Token"))
(define-read-only (get-symbol) (ok "${symbol}"))
(define-read-only (get-decimals) (ok u6))
(define-read-only (get-balance (who principal)) (ok (ft-get-balance ${name} who)))
(define-read-only (get-total-supply) (ok (ft-get-supply ${name})))
(define-read-only (get-token-uri) (ok none))

(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) ERR-NOT-OWNER)
        (ft-mint? ${name} amount recipient)
    )
)`;
}

async function getNextNonce(addr) {
    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${addr}/nonces`);
    const data = await response.json();
    return BigInt(data.possible_next_nonce);
}

async function deployContract(contractName, codeBody, fee, nonce) {
    const txOptions = {
        contractName,
        codeBody,
        senderKey: privateKey,
        network,
        anchorMode: AnchorMode.Any,
        fee,
        nonce,
        postConditionMode: PostConditionMode.Allow,
        clarityVersion: 2,
    };

    const transaction = await makeContractDeploy(txOptions);
    const response = await broadcastTransaction({ transaction, network });

    if (response.error) {
        console.error(`${contractName} failed:`, response.error);
        return null;
    }
    
    console.log(`✓ ${contractName}: ${response.txid}`);
    return response.txid;
}

async function run() {
    console.log(`Deploying from: ${address}\n`);
    let nonce = await getNextNonce(address);

    for (const token of tokens) {
        const code = generateContract(token.name, token.symbol);
        writeFileSync(`contracts/${token.name}.clar`, code);
        await deployContract(token.name, code, 10000n, nonce);
        nonce++;
        await new Promise(r => setTimeout(r, 500));
    }
    
    console.log('\nAll deployments complete!');
}

run().catch(console.error);
