import page from 'page'

import EtherProvider from './config/EtherProvider'

import ContractFactory from './config/ContractFactory'
import FindElection from './service/FindElection'

import ListElections from './service/ListElections'
import CreateElection from './service/CreateElection'
import VoteCandidate from './service/VoteCandidate'
import HasVotedElection from './service/HasVotedElection'

import {render} from 'lit-html'
import {
    footer,
    header,
    layout,
    viewCreateElection,
    viewElectionCandidates,
    viewElectionList,
    viewLoading,
    viewNotFound,
} from './view'
import Noty from "noty";

// bind app
const wrapper = document.querySelector('#app')

const displayLoading = () => {
        render(layout(header(), viewLoading(), footer()), wrapper)
    }

// listen to contract event
const createdElectionCallback = (address) => {
        console.log('callback', address)
        new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Une élection a été ajoutée <a href="/">Voir les élections</a>',
        }).show();
    }

//bootstrap
;(async function () {
    displayLoading()

    //provider
    const provider = new EtherProvider()
    const etherSigner = provider.getSigner()
    const account = await provider.getAccount()
    //factory
    const contractFactory = new ContractFactory(etherSigner)
    const electionCreatorContract = contractFactory.getElectionCreatorContract();
    electionCreatorContract.onCreation(createdElectionCallback)
    // services
    const electionFinder = new FindElection(contractFactory)
    const listElections = new ListElections(contractFactory, electionFinder)
    const createElection = new CreateElection(contractFactory)
    const voteCandidate = new VoteCandidate(contractFactory)
    const hasVotedElection = new HasVotedElection(contractFactory)

    // homepage
    page('/', async function () {
        displayLoading()
        const elections = await listElections.getElections()
        const view = viewElectionList(elections)
        render(layout(header(), view, footer()), wrapper)
    })
    // new election
    page('/elections/new', async function () {
        displayLoading()
        const view = viewCreateElection(createElection)
        render(layout(header(), view, footer()), wrapper)
    })
    // detail election
    page('/elections/:id', async function (ctx) {
        displayLoading()
        const electionId = ctx.params.id
        const election = await electionFinder.getElection(
            electionId
        )
        const hasVoted = await hasVotedElection.hasVoted(electionId, account)
        const view = viewElectionCandidates(
            election.name,
            electionId,
            election.candidates,
            hasVoted,
            voteCandidate
        )
        render(layout(header(), view, footer()), wrapper)
    })
    // not found
    page('*', function () {
        render(layout(header(), viewNotFound(), footer()), wrapper)
    })
    // int router
    page({hashbang: true})
})()
