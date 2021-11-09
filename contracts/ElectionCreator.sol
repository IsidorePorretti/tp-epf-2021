// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "../contracts/Election.sol";

contract ElectionCreator {


    uint public electionCount;

    event ElectionCreated(address electionAddress);
    mapping(uint => address) public electionList;

    // Creates an election contract and emits the according event
    function newElection(string calldata _name) external {

        electionList[electionCount] = address(new Election(_name));
        electionCount++;
        emit ElectionCreated(msg.sender);
    }
}
