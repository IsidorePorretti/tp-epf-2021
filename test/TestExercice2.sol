// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "truffle/Assert.sol";
import "../contracts/Election.sol";

contract TestExercice2 {

    function testAddCandidate() public {
        Election electionContract = new Election("Election Name");

        // Add first candidate
        electionContract.addCandidate("Candidate 1");
        Assert.equal(electionContract.candidatesCount(), 1, "Candidates count should be 1");
        Assert.equal(electionContract.votersCount(), 0, "Voters count should be 0");
        (string memory name1, uint id1, uint votesCount1) = electionContract.candidates(0);
        Assert.equal(keccak256(abi.encodePacked(name1)), keccak256(abi.encodePacked("Candidate 1")), "Candidate name should be set");
        Assert.equal(id1, 0, "Candidate id should be 0");
        Assert.equal(votesCount1, 0, "Candidate vote count should be 0");


        // Add second candidate
        electionContract.addCandidate("Candidate 2");
        Assert.equal(electionContract.candidatesCount(), 2, "Candidates count should be 2");
        Assert.equal(electionContract.votersCount(), 0, "Voters count should be 0");
        (string memory name2, uint id2, uint votesCount2) = electionContract.candidates(1);
        Assert.equal(keccak256(abi.encodePacked(name2)), keccak256(abi.encodePacked("Candidate 2")), "Candidate name should be set");
        Assert.equal(id2, 1, "Candidate id should be 1");
        Assert.equal(votesCount2, 0, "Candidate vote count should be 0");
    }

    function testAddCandidateEmptyName() public {
        Election electionContract = new Election("Election Name");
        string memory errorMessage = "The candidate name must not be empty";

        try electionContract.addCandidate("") {
            Assert.isTrue(false, "Contract should revert if candidate name is empty");
        } catch Error(string memory reason){
            Assert.equal(keccak256(abi.encodePacked(reason)), keccak256(abi.encodePacked(errorMessage)), string(abi.encodePacked("Revert message should be '", errorMessage, "'")));
        } catch (bytes memory) {
            Assert.isTrue(false, "Revert message should not be empty");
        }
    }
}
