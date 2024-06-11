// SPDX-License-Identifier: MIT

pragma solidity ^ 0.8.0;

contract Voting {
  struct Proposal {
    string name;
    uint voteCount;
  }

  address public owner;
  mapping(address => bool) public voters;
  Proposal[] public proposals;

  modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized");
    _;
  }

  constructor(string[] memory proposalNames) {
    owner = msg.sender;
    for (uint i = 0; i < proposalNames.length; i++) {
      proposals.push(Proposal({name : proposalNames[i], voteCount : 0}));
    }
  }

  function giveRightToVote(address voter) public onlyOwner {
    require(!voters[voter], "Voter already given right");
    voters[voter] = true;
  }

  function vote(uint proposal) public {
    require(voters[msg.sender], "Has no right to vote");
    voters[msg.sender] = false;
    proposals[proposal].voteCount += 1;
  }

  function winningProposal() public view returns(uint winningProposal_) {
    uint winningVoteCount = 0;
    for (uint p = 0; p < proposals.length; p++) {
      if (proposals[p].voteCount > winningVoteCount) {
        winningVoteCount = proposals[p].voteCount;
        winningProposal_ = p;
      }
    }
  }

  function winnerName() public view returns(string memory winnerName_) {
    winnerName_ = proposals[winningProposal()].name;
  }
}
