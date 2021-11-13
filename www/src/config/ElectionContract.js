import {ethers} from 'ethers'

let electionContractJson = require('../../../build/contracts/Election.json')

class ElectionContract {
    constructor(electionAddress, etherSigner) {
        this.contract = new ethers.Contract(
            electionAddress,
            electionContractJson.abi,
            etherSigner
        )
    }

    getName() {
    }

    getCandidatesCount() {
    }

    getCandidate(index) {
    }

    haveVoted(account) {
    }

    addCandidate(name) {
        this.contract.addCandidate(name);
    }

    castVote(candidateId) {
    }

    onVote(electionId, candidateId, callback) {
        let filter = this.contract.filters.VoteEvent()
        this.contract.on(filter, (address) => {
            callback(address, electionId, candidateId)
        })
    }
}

export default ElectionContract
