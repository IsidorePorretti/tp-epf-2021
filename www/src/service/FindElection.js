import Candidate from '../model/Candidate'
import Election from '../model/Election'

class FindElection {

    constructor(contractFactory) {
        this.contractFactory = contractFactory
    }

    async getElection(electionId) {
        const electionContract = await this.contractFactory.createElectionContractFromId(electionId)
        const electionName = await electionContract.getName()
        const candidatesCount = await electionContract.getCandidatesCount()
        let election = new Election(electionName)
        for (let i = 0; i < candidatesCount.toNumber(); i++) {
            const candidat = await electionContract.getCandidate(i)
            election.addCandidate(new Candidate(candidat.id.toNumber(), candidat.name, candidat.votesCount.toNumber()))
        }
        return election
    }
}

export default FindElection
