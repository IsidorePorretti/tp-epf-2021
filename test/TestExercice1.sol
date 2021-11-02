// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "truffle/Assert.sol";
import "../contracts/Election.sol";

contract TestExercice1 {

    function testInit() public {
        Election electionContract = new Election("Election Name");

        Assert.equal(keccak256(abi.encodePacked(electionContract.name())), keccak256(abi.encodePacked("Election Name")), "Election name should be set");
        Assert.equal(electionContract.candidatesCount(), 0, "Candidates count should be 0");
        Assert.equal(electionContract.votersCount(), 0, "Voters count should be 0");
    }
}
