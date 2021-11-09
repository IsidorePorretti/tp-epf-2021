// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

contract Election {
    string public name;
    uint public candidatesCount = 0;
    uint public votersCount; 


    // This struct represents a candidate
    struct Candidate {
        string name;
        uint id;
        uint votesCount;
    }

    constructor (string memory _name) public {
        name = _name;
    }

    event VoteEvent(uint id, address voterAddress);
    
    event AddCandidateEvent(string name, address candidatAddress);
    

    // This struct describes a vote
    struct Vote {
        bool hasVoted;
    }

    // This mapping indexes all candidates
    mapping(uint => Candidate) public candidates;


    // This mapping indexes all voters
    mapping(address => Vote) public voters;

    // Adds a new candidate to this election
    function addCandidate(string calldata _name) external {
        if (checkNotEmptyName(_name)) {
            candidates[candidatesCount] = Candidate(_name, candidatesCount, 0);
            candidatesCount++;
            
            emit AddCandidateEvent(_name, msg.sender);
        }
        else
        {

        }

    }

    // Check if a string isn't empty
    function checkNotEmptyName(string memory _name) private pure returns (bool) {
        require(bytes(_name).length>0, "The candidate name must not be empty");
        return true;
    }

    // Handles a vote
    function vote(uint _id) public {
        require(_id < candidatesCount, "Candidate ID is too high");
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        candidates[_id].votesCount=1;
        voters[msg.sender].hasVoted = true;
        votersCount++;
        emit VoteEvent(_id, msg.sender);

    }

    // Gets a candidate's result
    function voteResultForACandidate(uint _id) view public returns (string memory _name, uint _votesCount) {
        _name = candidates[_id].name;
        _votesCount = candidates[_id].votesCount;
    }

    // Counts all votes that occurred in this election
    function countVotes() view public returns (uint totalVotesCount) {
        totalVotesCount = votersCount;
    }

}
