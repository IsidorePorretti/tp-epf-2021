class ListElections {
    constructor(contractFactory, electionFinder) {
        this.electionFinder = electionFinder
        this.contractFactory = contractFactory
    }

    async getElections() {
        return []
    }

}

export default ListElections
