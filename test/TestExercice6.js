const Election = artifacts.require('Election');
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('Election - Exercice 6', (accounts) => {
    let election;
    const firstAccount = accounts[0];

    beforeEach(async () => {
        election = await Election.new("Election name", {from: firstAccount});
        election.addCandidate("Candidate name")

        assert.equal(await election.name(), "Election name")
        const firstCandidate = await election.candidates(0)
        assert.equal(firstCandidate.name, "Candidate name")
    });

    it("should emit an event containing the candidate ID and the voter address when a vote is casted", async () => {
        const candidateId = 0;
        const tx = await election.vote(candidateId, {from: firstAccount});

        truffleAssert.eventEmitted(tx, 'VoteEvent', (ev) => {
            return ev.id.toNumber() === candidateId && ev.voterAddress === firstAccount;
        });
    });

});
