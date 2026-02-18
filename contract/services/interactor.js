import {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode
} from '@stacks/transactions';
import stacksNetwork from '@stacks/network';
const { STACKS_MAINNET } = stacksNetwork;

export class ContractInteractor {
    constructor(privateKey, contractAddress) {
        this.privateKey = privateKey;
        this.contractAddress = contractAddress;
        this.network = STACKS_MAINNET;
    }

    async call(contractName, functionName, functionArgs, fee, nonce) {
        const txOptions = {
            contractAddress: this.contractAddress,
            contractName,
            functionName,
            functionArgs,
            senderKey: this.privateKey,
            network: this.network,
            anchorMode: AnchorMode.Any,
            fee,
            nonce,
            postConditionMode: PostConditionMode.Allow,
        };

        const transaction = await makeContractCall(txOptions);
        const response = await broadcastTransaction({ 
            transaction, 
            network: this.network 
        });

        if (response.error) {
            throw new Error(`${response.error}: ${response.reason}`);
        }

        return { success: true, txid: response.txid };
    }
}
