// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {

    struct Candidate {
        string name;
        uint numberOfVotes;
    }

    mapping(uint => Candidate) candidates;
    mapping(address => uint) votesPerVoter;
    mapping(address => bool) voterVoted;

    constructor(){
        candidates[0] = Candidate("Emmanuella", 0);
        candidates[1] = Candidate("KamKam", 0);
        candidates[2] = Candidate("Gabriella", 0);
        voterVoted[msg.sender] = false;
    }

    modifier notVoted {
        require(!voterVoted[msg.sender] || votesPerVoter[msg.sender] == 0, "You have already voted");
        _;
    }

    function vote(string memory _nameOfCandidate) public notVoted returns (string memory) {
        bytes32 nameHash = keccak256(abi.encodePacked(_nameOfCandidate));
        bytes32 ellaHash = keccak256(abi.encodePacked("Emmanuella"));
        bytes32 kamkamHash = keccak256(abi.encodePacked("KamKam"));
        bytes32 gabbyHash = keccak256(abi.encodePacked("Gabriella"));

        if (nameHash == ellaHash) {
            candidates[0].numberOfVotes++;
        } else if (nameHash == kamkamHash){
            candidates[1].numberOfVotes++;
        } else if (nameHash == gabbyHash) {
            candidates[2].numberOfVotes++;
        } else {
            revert("Invalid candidate name");
        }

        voterVoted[msg.sender] = true;
        string memory Text = "You have already casted your vote";
        votesPerVoter[msg.sender]++;
        return Text;
    }

    function getVotes() public view returns (Candidate[] memory){
        Candidate[] memory candidateList = new Candidate[](3);
        candidateList[0] = candidates[0];
        candidateList[1] = candidates[1];
        candidateList[2] = candidates[2];
        return candidateList;
    }
}