import {ethers} from 'ethers'

let electionCreatorJson = require('../../../build/contracts/ElectionCreator.json')

class ElectionCreatorContract {
    constructor(etherSigner) {
        const resolvedAddress = electionCreatorJson.networks['5777'].address
        this.contract = new ethers.Contract(
            resolvedAddress,
            electionCreatorJson.abi,
            etherSigner
        )
    }

    async getElectionsCount() {
        return this.contract.electionsCount();
    }

    async getElectionAddress(electionId) {
        return this.contract.electionList(electionId);
    }

    createNewElection(name) {
        return this.contract.newElection(name);
    }

    addCandidate(name) {
        this.contract.addCandidate(name);
    }

    onCreation(callback) {
        let filter = this.contract.filters.ElectionCreated()
        this.contract.on(filter, (address) => {
            callback(address)
            //@todo remove event listener ?
        })
        
    }
}

export default ElectionCreatorContract
