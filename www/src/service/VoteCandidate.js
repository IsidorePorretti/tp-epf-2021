class VoteCandidate {
    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async castVote(electionId, candidateId, eventVoteListener) {
    }
}

export default VoteCandidate
