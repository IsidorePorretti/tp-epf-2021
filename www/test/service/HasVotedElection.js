import {expect} from 'chai'
import HasVotedElection from "../../src/service/HasVotedElection";
import InMemoryContractFactory from "../InMemoryContractFactory";

describe('HasVotedElection', () => {
    let electionContract
    let hasVotedElection
    let userAddress

    beforeEach( () => {
        let contractFactory = new InMemoryContractFactory();
        userAddress = contractFactory.userAddress
        let electionAddress = contractFactory.contractCreator.withElection("electionName")
        electionContract = contractFactory.createElectionContractFromAddress(electionAddress)
        electionContract.addCandidate("candidateName")
        hasVotedElection = new HasVotedElection(contractFactory)
    })

    it('with vote', async () => {
        // Given
        await electionContract.castVote(0)
        // When
        const hasVoted = await hasVotedElection.hasVoted(0, userAddress)
        // Then
        expect(hasVoted).to.be.true
    })

    it('with no vote', async () => {
        // Given
        // When
        const hasVoted = await hasVotedElection.hasVoted(0, userAddress)
        // Then
        expect(hasVoted).to.be.false
    })
})
