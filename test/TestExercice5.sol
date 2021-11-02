// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "truffle/Assert.sol";
import "../contracts/Election.sol";

contract TestExercice5 {

    function testCountVotesIncrements() public {
        Election electionContract = new Election("Election Name");

        electionContract.addCandidate("Candidate 1");
        electionContract.vote(0);
        uint votesCount = electionContract.countVotes();
        Assert.equal(votesCount, 1, "Votes count should be 1");
    }
}
