// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        string name;
        uint256 numberOfVotes;
    }

    mapping(bytes32 => uint256) private candidateIndex;
    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    constructor() {
        addCandidate("Emmanuella");
        addCandidate("KamKam");
        addCandidate("Gabriella");
    }

    function addCandidate(string memory _name) private {
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        require(candidateIndex[nameHash] == 0, "Candidate already exists");
        candidates.push(Candidate(_name, 0));
        candidateIndex[nameHash] = candidates.length;
    }

    function vote(string memory _nameOfCandidate) public returns (string memory) {
        require(!hasVoted[msg.sender], "You have already voted");
        
        bytes32 nameHash = keccak256(abi.encodePacked(_nameOfCandidate));
        uint256 index = candidateIndex[nameHash];
        
        require(index > 0, "Invalid candidate name");
        
        candidates[index - 1].numberOfVotes++;
        hasVoted[msg.sender] = true;
        
        return "You have successfully cast your vote";
    }

    function getVotes() public view returns (Candidate[] memory) {
        return candidates;
    }
}