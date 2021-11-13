import {ethers} from 'ethers'
import Candidate from '..model/Candidate'

let electionContractJson = require('../../../build/contracts/Election.json')

class ElectionContract {
    constructor(electionAddress, etherSigner) {
        this.contract = new ethers.Contract(
            electionAddress,
            electionContractJson.abi,
            etherSigner
        )
    }

    async getName() {
        return  this.contract.name();
     }

    async getCandidatesCount() {
        return this.contract.candidatesCount();
    }

    async getCandidate(index) {
        return await this.contract.candidates(index)
    }

    async haveVoted(account) {
        const vote =  await this.contract.getVoters(account);
        return vote.hasVoted;
    }

    async addCandidate(name) {
        return this.contract.addCandidate(name);
    }

    async castVote(candidateId) {
        return this.contract.vote(candidateId);
    }

    onVote(electionId, candidateId, callback) {
        let filter = this.contract.filters.VoteEvent()
        this.contract.on(filter, (address) => {
            callback(address, electionId, candidateId)
        })
    }
}

export default ElectionContract
