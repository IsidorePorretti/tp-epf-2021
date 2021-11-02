import {bigNumberify} from "ethers/utils";
import {One, Zero} from "ethers/constants";

class InMemoryElectionContract {
    constructor(name, userAddress) {
        this.userAddress = userAddress;
        this.name = name;
        this.candidatesCount = 0;
        this.candidates = [];
        this.voters = [];

        this.callback = () => {
        }
    }

    getName() {
        return Promise.resolve(this.name)
    }

    getCandidatesCount() {
        return Promise.resolve(bigNumberify(this.candidates.length))
    }

    getCandidate(index) {
        return Promise.resolve(this.candidates[index])
    }

    haveVoted(account) {
        return Promise.resolve(this.voters.includes(account))
    }

    addCandidate(name) {
        const candidate = {
            id: bigNumberify(this.candidates.length),
            name,
            votesCount: Zero
        }
        this.candidates.push(candidate)
        return Promise.resolve()
    }

    castVote(candidateId) {
        this.candidates[candidateId].votesCount = this.candidates[candidateId].votesCount.add(One)
        this.voters.push(this.userAddress);
        this.callback(this.userAddress)
        return Promise.resolve()
    }

    onVote(electionId, candidateId, callback) {
        this.callback = (address) => callback(address, electionId, candidateId)
    }
}

export default InMemoryElectionContract

