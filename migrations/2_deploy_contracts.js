const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
    const proposalNames = ["Proposal1", "Proposal2", "Proposal3"];
    deployer.deploy(Voting, proposalNames);
};
