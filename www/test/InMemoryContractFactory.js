import InMemoryElectionCreatorContract from "./InMemoryElectionCreatorContract";
import {hexlify} from "ethers/utils";

class InMemoryContractFactory {

    constructor() {
        this.userAddress = hexlify(10)
        this.contractCreator = new InMemoryElectionCreatorContract(this.userAddress)
    }

    getElectionCreatorContract() {
        return this.contractCreator
    }

    createElectionContractFromAddress(address) {
        const electionId = this.contractCreator.adresses.indexOf(address)
        return this.contractCreator.elections[electionId]
    }

    async createElectionContractFromId(electionId) {
        return Promise.resolve(this.contractCreator.elections[electionId])
    }

}

export default InMemoryContractFactory
