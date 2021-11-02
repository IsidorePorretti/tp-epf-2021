class HasVotedElection {
    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async hasVoted(electionId, account) {
        return false
    }
}

export default HasVotedElection
