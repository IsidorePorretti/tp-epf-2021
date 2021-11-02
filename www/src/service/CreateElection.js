class CreateElection {
    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async create(formdata) {

        // Create a new election
        const electionCreator = this.contractFactory.getElectionCreatorContract()

        const transaction = null

        const receipt = await transaction.wait(1)
        const event = receipt.events.pop()
        const address = event.args.electionAddress

        // Add candidates
        const contractElection = this.contractFactory.createElectionContractFromAddress(address)
    }
}

export default CreateElection
