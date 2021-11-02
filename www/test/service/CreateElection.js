import {expect} from 'chai'
import InMemoryContractFactory from "../InMemoryContractFactory";
import CreateElection from "../../src/service/CreateElection";
import sinon from 'sinon'

describe('CreateElection', () => {
    let contractCreator
    let createElection

    let formData = {
        name: "electionName",
        candidates: ['candidate1', 'candidate2']
    }

    beforeEach(() => {
        let contractFactory = new InMemoryContractFactory();
        contractCreator = contractFactory.contractCreator
        createElection = new CreateElection(contractFactory);
    })

    it('should be able to create an election', async () => {
        // Given
        expect(contractCreator.elections).to.have.length(0)
        // When
        await createElection.create(formData, () => {
        })
        // Then
        expect(contractCreator.elections).to.have.length(1)
        expect(contractCreator.elections[0].name).to.equal("electionName")
        expect(contractCreator.elections[0].candidates).to.have.length(2)
        expect(contractCreator.elections[0].candidates[0].name).to.equal("candidate1")
        expect(contractCreator.elections[0].candidates[1].name).to.equal("candidate2")
    })

    it('should notify when the election is created', async () => {
        // Given
        let callback = sinon.spy();
        contractCreator.onCreation(callback)
        // When
        await createElection.create(formData)
        // Then
        let electionAddress = contractCreator.adresses[0]
        expect(callback.called).to.be.true
        expect(callback.calledWith(electionAddress)).to.be.true
    })
})
