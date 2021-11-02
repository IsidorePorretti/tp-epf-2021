import { html } from 'lit-html'
import page from 'page'

// notifications
import Noty from 'noty'
import * as css from 'noty/lib/noty.css'
import * as theme from 'noty/lib/themes/light.css'

// bind app
const layout = (header, content, footer) => html`<div class="">
    <div class="header">${header}</div>
    <div class="container">${content}</div>
    <div class="footer">${footer}</div>
</div>`

const header = () => html` <header class="navbar">
    <section class="navbar-center">
        <a href="/" class="btn btn-link sitename">Lab's vote</a>
    </section>
    <section class="navbar-section">
        <a
            href="https://gitlab.talanlabs.com/blockchain/tp-epf-2020"
            class="btn btn-link"
            target="_blank"
            ><i class="icon icon-arrow-right"></i> Gitlab</a
        >
    </section>
</header>`
const footer = () => html` <footer class="text-center">
    <div>
        Lab's vote - built and designed with
        <span class="text-error">♥</span> by Talan Labs
    </div>
</footer>`

// views
const viewLoading = () => html`<div class="loading loading-lg"></div>`

const viewNotFound = () => html`<div>Not found !</div>`

const viewElectionList = (elections) => {
    if (elections.length == 0) {
        return html`<h1>Liste des élections</h1>
            <div class="nocontent">
                <p>Il n'y pas encore d'élections</p>
                <p>
                    <a href="elections/new" class="btn btn-primary">
                        Créez votre élection
                    </a>
                </p>
            </div>`
    }
    const rows = elections.map(
        (election, index) =>
            html`<tr>
                <td><a href="elections/${index}">${election.name}</a></td>
                <td>${election.candidates.length}</td>
            </tr>`
    )
    const table = html` <h1>Choississez votre élection</h1>
        <a href="elections/new" class="btn btn-primary">
            Créez votre élection
        </a>
        <table class="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Candidats</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`

    return table
}

const viewElectionCandidates = (
    electionName,
    electionId,
    candidates,
    hasVoted,
    voteCandidate
) => {
    if (candidates.length == 0) {
        return html` <h1>Candidats de l'élection ${electionName}</h1>
            <div class="nocontent">
                <p>Il n'y pas encore de candidats</p>
            </div>`
    }

    const castVoteEventCallback = (address, electionId, candidateId) => {
        console.log('callback', address, electionId, candidateId)
        new Noty({
            type: 'success',
            layout: 'topRight',
            text:
                'Un vote a été ajouté à l\'élection <a href="/#!/elections/' +
                electionId +
                '">Voir les votes</a>',
        }).show()
    }

    const voteHandler = {
        async handleEvent(e) {
            e.preventDefault()
            const voteBtn = e.target
            const candidateId = voteBtn.dataset.candidate
            const electionId = voteBtn.dataset.election
            // redirect to homepage
            await voteCandidate.castVote(
                electionId,
                candidateId,
                castVoteEventCallback
            )
            // @todo block form and buttons
            // Nb: refresh can be too fast (slow transactions)
            page('/elections/' + electionId)
            return
        },
    }

    const rows = candidates.map((candidate, index) => {
        const voteBtn = !hasVoted
            ? html`<button
                  type="submit"
                  class="btn vote"
                  data-election="${electionId}"
                  data-candidate="${candidate.id}"
                  @click=${voteHandler}
              >
                  Voter
              </button> `
            : ''

        return html`<tr>
            <td>${candidate.id}</td>
            <td>${candidate.name}</td>
            <td>${candidate.votes}</td>
            <td>${voteBtn}</td>
        </tr>`
    })

    const alreadyVoted = hasVoted
        ? html`<div class="info">Vous avez déjà voté</div>`
        : ''

    const table = html`<h1>Candidats de l'élection ${electionName}</h1>
        ${alreadyVoted}
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Candidat</th>
                    <th>Votes</th>
                    <th>Voter</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`

    return table
}

const viewCreateElection = (createElection) => {

    // clone candidate field
    const addHandler = {
        handleEvent(e) {
            e.preventDefault()
            const creationForm = document.getElementById(
                'creation-election-form'
            )
            const candidates = creationForm.querySelector('.candidates')
            const input = creationForm.querySelector('.candidate')
            let c = input.cloneNode(true)
            // empty value
            c.querySelector('input').value = ''
            // add to candidates
            candidates.append(c)
            return
        },
    }

    // form submission handler
    const submitHandler = {
        async handleEvent(e) {
            e.preventDefault()
            // get submitted data
            const creationForm = document.getElementById(
                'creation-election-form'
            )
            const name = creationForm.querySelector('#election-name').value
            const candidates = creationForm.querySelectorAll(
                '[name="candidates"]'
            )
            // data
            let formData = { name: '', candidates: [] }
            formData['name'] = name
            candidates.forEach((input) => {
                formData['candidates'].push(input.value)
            })
            // create
            await createElection.create(formData)
            // @todo block form and buttons ?

            // redirect to homepage
            page('/')
            return
        },
    }

    return html` <h1>Création d'une élection</h1>
        <form id="creation-election-form">
            <div class="form-group">
                <label class="form-label" for="election-name"
                    >Nom de l'élection</label
                >
                <input
                    name="name"
                    class="form-input"
                    type="text"
                    id="election-name"
                    placeholder="Nom"
                />
            </div>

            <div class="candidates">
                <button
                    class="btn btn-sm"
                    id="add-candidate"
                    @click=${addHandler}
                >
                    <i class="icon icon-plus"></i> Ajouter un champ candidat
                </button>
                <div class="form-group candidate">
                    <label class="form-label" for="candidat"
                        >Nom du candidat</label
                    >
                    <input
                        name="candidates"
                        class="form-input"
                        type="text"
                        id="candidat"
                        placeholder="Nom"
                    />
                </div>
            </div>
            <button
                class="btn btn-primary"
                id="create-submit"
                @click=${submitHandler}
            >
                Créer l'élection
            </button>
        </form>`
}

export {
    layout,
    header,
    footer,
    viewLoading,
    viewNotFound,
    viewElectionList,
    viewElectionCandidates,
    viewCreateElection,
}
