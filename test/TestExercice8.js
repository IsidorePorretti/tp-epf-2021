const ElectionCreator = artifacts.require('ElectionCreator');
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('ElectionCreator - Exercice 8', (accounts) => {
    let electionCreator;
    const firstAccount = accounts[0];

    beforeEach(async () => {
        electionCreator = await ElectionCreator.new({from: firstAccount});
    });

    it("should emit an event containing the election address when an election is created", async () => {
        const tx = await electionCreator.newElection("Election name", {from: firstAccount});

        truffleAssert.eventEmitted(tx, 'ElectionCreated', (ev) => {
            return ev.electionAddress !== '0x0000000000000000000000000000000000000000';
        });
    });

});
