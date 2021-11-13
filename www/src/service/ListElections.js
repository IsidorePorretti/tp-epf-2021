class ListElections {
    constructor(contractFactory, electionFinder) {
        this.electionFinder = electionFinder
        this.contractFactory = contractFactory
    }

    async getElections() {
        const electionCreatorContrat = await this.contractFactory.getElectionCreatorContract();
        const electionsCount = await electionCreatorContrat.getElectionsCount();
        let electionsList = [];
        for (let i = 0; i < electionsCount.toNumber(); i++) {
            const election = await this.electionFinder.getElection(i);
            electionsList.push(election);
        }
        return electionsList;
    }

}

export default ListElections
