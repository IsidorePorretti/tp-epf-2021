// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "truffle/Assert.sol";
import "../contracts/Election.sol";

contract TestExercice3 {
    event LogAddress(address message);

    function testVote() public {
        Election electionContract = new Election("Election Name");

        electionContract.addCandidate("Candidate 1");
        electionContract.addCandidate("Candidate 2");
        electionContract.vote(0);

        Assert.equal(electionContract.candidatesCount(), 2, "Candidates count should be 2");
        Assert.equal(electionContract.votersCount(), 1, "Voters count should be 1");

        (string memory name, uint id, uint votesCount) = electionContract.candidates(0);

        Assert.equal(name, "Candidate 1", "Candidate 1 name should be returned");
        Assert.equal(id, 0, "Candidate 1 ID should be 0");
        Assert.equal(votesCount, 1, "Candidate 1 votes count should be 1");

        bool hasVoted = electionContract.voters(address(this));

        Assert.equal(hasVoted, true, "Voter's vote should be taken into account");
    }

    function testVoteFailHighId() public {
        Election electionContract = new Election("Election Name");
        string memory errorMessage = "Candidate ID is too high";

        electionContract.addCandidate("Candidate 1");
        electionContract.addCandidate("Candidate 2");

        try electionContract.vote(2) {
            Assert.isTrue(false, "Contract should revert if candidate ID is too high");
        } catch Error(string memory reason){
            Assert.equal(keccak256(abi.encodePacked(reason)), keccak256(abi.encodePacked(errorMessage)), string(abi.encodePacked("Revert message should be '", errorMessage, "'")));
        } catch (bytes memory) {
            Assert.isTrue(false, "Revert message should not be empty");
        }
    }

    function testVoteFailAlreadyVoted() public {
        Election electionContract = new Election("Election Name");
        string memory errorMessage = "You have already voted";

        electionContract.addCandidate("Candidate 1");
        electionContract.addCandidate("Candidate 2");
        electionContract.vote(1);

        try electionContract.vote(0) {
            Assert.isTrue(false, "Contract should revert if voter has already voted");
        } catch Error(string memory reason){
            Assert.equal(keccak256(abi.encodePacked(reason)), keccak256(abi.encodePacked(errorMessage)), string(abi.encodePacked("Revert message should be '", errorMessage, "'")));
        } catch (bytes memory) {
            Assert.isTrue(false, "Revert message should not be empty");
        }
    }
}

