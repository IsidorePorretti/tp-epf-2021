import {expect} from 'chai'
import InMemoryContractFactory from "../InMemoryContractFactory";
import VoteCandidate from "../../src/service/VoteCandidate";
import {One, Zero} from "ethers/constants";
import sinon from 'sinon'

describe('VoteCandidate', () => {
    let electionContract
    let electionAddress
    let voteCandidate
    let electionId = 0
    let candidateId = 0
    let userAddress

    beforeEach(() => {
        let contractFactory = new InMemoryContractFactory();
        userAddress = contractFactory.userAddress
        electionAddress = contractFactory.contractCreator.withElection("electionName")
        electionContract = contractFactory.createElectionContractFromAddress(electionAddress)
        electionContract.addCandidate("candidateName")
        voteCandidate = new VoteCandidate(contractFactory);
    })

    it('should be able to vote', async () => {
        // Given
        expect(electionContract.voters).to.empty
        expect(electionContract.candidates[0].votesCount.eq(Zero)).to.be.true
        // When
        await voteCandidate.castVote(electionId, candidateId, () => {
        })
        // Then
        expect(electionContract.voters).to.contains(userAddress)
        expect(electionContract.candidates[0].votesCount.eq(One)).to.be.true
    })

    it('should notify when vote is done', async () => {
        // Given
        let callback = sinon.spy();
        // When
        await voteCandidate.castVote(electionId, candidateId, callback)
        // Then
        expect(callback.called).to.be.true
        expect(callback.calledWith(userAddress, electionId, candidateId)).to.be.true
    })
})
