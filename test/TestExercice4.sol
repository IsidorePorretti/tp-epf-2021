// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "truffle/Assert.sol";
import "../contracts/Election.sol";

contract TestExercice4  {

    function testVoteResultForACandidate() public {
        Election electionContract = new Election("Election Name");

        electionContract.addCandidate("Candidate 1");
        electionContract.vote(0);

        (string memory _name, uint256 _votesCount) = electionContract.voteResultForACandidate(0);
        Assert.equal(_name, "Candidate 1", "Name should be Candidate 1");
        Assert.equal(_votesCount, 1, "vote count should be 1");
    }
}
