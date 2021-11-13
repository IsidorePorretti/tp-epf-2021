class HasVotedElection {
    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async hasVoted(electionId, account) {
        const electionContrat = await this.contractFactory.createElectionContractFromId(electionId);
        const hasVoted = await electionContrat.haveVoted(account);
        return hasVoted;
    }
}

export default HasVotedElection
