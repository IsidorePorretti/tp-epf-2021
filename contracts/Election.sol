// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

contract Election {

    // This struct represents a candidate
    struct Candidate {
    }

    event VoteEvent(uint id, address voterAddress);

    // This struct describes a vote
    struct Vote {
        bool hasVoted;
    }

    // This mapping indexes all candidates
    mapping(uint => Candidate) public candidates;

    // Adds a new candidate to this election
    function addCandidate(string calldata _name) external {
    }

    // Check if a string isn't empty
    function checkNotEmptyName(string memory _name) private pure returns (bool) {
    }

    // Handles a vote
    function vote(uint _id) public {
    }

    // Gets a candidate's result
    function voteResultForACandidate(uint _id) view public returns (string memory _name, uint _votesCount) {
    }

    // Counts all votes that occurred in this election
    function countVotes() view public returns (uint totalVotesCount) {
    }

}
