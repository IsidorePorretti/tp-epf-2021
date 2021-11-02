import {expect} from 'chai'
import ListElections from '../../src/service/ListElections'
import FindElection from '../../src/service/FindElection'
import InMemoryContractFactory from "../InMemoryContractFactory";

describe('ListElections', () => {
    let contractFactory
    let listElections

    beforeEach(() => {
        contractFactory = new InMemoryContractFactory()
        const findElection = new FindElection(contractFactory);
        listElections = new ListElections(contractFactory, findElection)
    })


    it('with no elections', async () => {
        // Given
        // When
        const elections = await listElections.getElections()
        // Then
        expect(elections).to.deep.eql([])
    })

    it('with one election', async () => {
        // Given
        contractFactory.contractCreator.withElection("foo")
        // When
        const elections = await listElections.getElections()
        // Then
        expect(elections).to.have.length(1)
        expect(elections[0].name).to.equal("foo");
    })
})
