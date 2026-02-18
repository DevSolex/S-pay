import {
    makeContractDeploy,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;

export class ContractDeployer {
    constructor(privateKey) {
        this.privateKey = privateKey;
        this.network = STACKS_MAINNET;
    }

    async deploy(contractName, codeBody, fee, nonce) {
        const txOptions = {
            contractName,
            codeBody,
            senderKey: this.privateKey,
            network: this.network,
            anchorMode: AnchorMode.Any,
            fee,
            nonce,
            postConditionMode: PostConditionMode.Allow,
            clarityVersion: 2,
        };

        const transaction = await makeContractDeploy(txOptions);
        const response = await broadcastTransaction({ 
            transaction, 
            network: this.network 
        });

        if (response.error) {
            if (response.reason === 'ContractAlreadyExists') {
                return { success: true, exists: true };
            }
            throw new Error(`${response.error}: ${response.reason}`);
        }

        return { success: true, txid: response.txid };
    }
}
