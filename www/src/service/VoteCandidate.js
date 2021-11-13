class VoteCandidate {
    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async castVote(electionId, candidateId, eventVoteListener) {
        const electionContrat = await this.contractFactory.createElectionContractFromId(electionId);
        electionContrat.onVote(electionId,candidateId,eventVoteListener);
        electionContrat.castVote(candidateId);
    }
}

export default VoteCandidate
