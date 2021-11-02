import ElectionContract from "./ElectionContract"
import ElectionCreatorContract from "./ElectionCreatorContract"

class ContractFactory {

    constructor(etherSigner) {
        this.etherSigner = etherSigner
        this.electionCreator = new ElectionCreatorContract(this.etherSigner)
    }

    getElectionCreatorContract() {
        return this.electionCreator
    }

    createElectionContractFromAddress(address) {
        return new ElectionContract(address, this.etherSigner)
    }

    async createElectionContractFromId(electionId) {
        const electionCreator = this.getElectionCreatorContract()
        // get election address
        let electionAddress = await electionCreator.getElectionAddress(
            electionId
        )
        return this.createElectionContractFromAddress(electionAddress)
    }

}

export default ContractFactory
