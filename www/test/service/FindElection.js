import {expect} from 'chai'
import InMemoryContractFactory from "../InMemoryContractFactory";
import FindElection from "../../src/service/FindElection";
import Candidate from "../../src/model/Candidate";

describe('FindElection', () => {
    let electionContract
    let electionId = 0
    let findElection

    beforeEach(() => {
        let contractFactory = new InMemoryContractFactory();
        let electionAddress = contractFactory.contractCreator.withElection("electionName")
        electionContract = contractFactory.createElectionContractFromAddress(electionAddress)
        electionContract.addCandidate("candidateName")
        findElection = new FindElection(contractFactory);
    })

    it('should find an election with its candidates', async () => {
        // Given
        // When
        const election = await findElection.getElection(electionId)
        // Then
        expect(election.name).to.equal("electionName")
        expect(election.candidates).to.have.length(1)
        expect(election.candidates[0]).to.deep.equal(new Candidate(0, "candidateName", 0))
    })
})
