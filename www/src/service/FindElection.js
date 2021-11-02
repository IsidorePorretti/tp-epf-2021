import Candidate from '../model/Candidate'
import Election from '../model/Election'

class FindElection {

    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async getElection(electionId) {
        const electionContract = await this.contractFactory.createElectionContractFromId(electionId)
        return {}
    }
}

export default FindElection
