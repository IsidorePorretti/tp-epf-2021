class CreateElection {
    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async create(formdata) {

        // Create a new election
        const electionCreator = this.contractFactory.getElectionCreatorContract()
        const transaction = await electionCreator.createNewElection(formdata.name)

        const receipt = await transaction.wait(1)
        const event = receipt.events.pop()
        const address = event.args.electionAddress

        // Add candidates
        const contractElection = this.contractFactory.createElectionContractFromAddress(address)
        formdata.candidates.forEach(
            async (candidate) => {
                await contractElection.addCandidate(candidate);
            })
    }
}

export default CreateElection
