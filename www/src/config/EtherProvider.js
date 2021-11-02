import { ethers } from 'ethers'

class EtherProvider {
    constructor() {
        let provider
        // use web3 instance is already provided by MetaMask,
        if (typeof web3 !== 'undefined') {
            provider = new ethers.providers.Web3Provider(web3.currentProvider)
        } else {
            provider = new ethers.providers.JsonRpcProvider(
                'http://localhost:7545'
            )
        }
        this.etherSigner = provider.getSigner()
    }

    getSigner() {
        return this.etherSigner
    }

    getAccount() {
        return this.etherSigner.getAddress()
    }
}

export default EtherProvider
