// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "truffle/Assert.sol";
import "../contracts/ElectionCreator.sol";

contract TestExercice7 is ElectionCreator {
    function testInit() public {
        ElectionCreator electionCreatorContract = new ElectionCreator();

        Assert.equal(electionCreatorContract.electionList(0), address(0), "Elections list should be empty");
        Assert.equal(electionCreatorContract.electionsCount(), 0, "Elections count should be 0");
    }

    function testNewElection() public {
        ElectionCreator electionCreatorContract = new ElectionCreator();
        electionCreatorContract.newElection("Election Name");

        Assert.notEqual(electionCreatorContract.electionList(electionCreatorContract.electionsCount() - 1), address(0), "Election contract address should not be empty");

        electionCreatorContract.newElection("Election Name");
        Assert.notEqual(electionCreatorContract.electionList(electionCreatorContract.electionsCount() - 1), electionCreatorContract.electionList(electionCreatorContract
    .electionsCount() - 2), "Election contract address should be unique");
    }
}
