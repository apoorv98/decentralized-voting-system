const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    it("should initialize with correct proposals", async () => {
        const instance = await Voting.deployed();
        const proposal = await instance.proposals(0);
        assert.equal(
            proposal.name,
            "Proposal1",
            "Proposal1 is not initialized correctly",
        );
    });

    it("should allow voting and correctly count votes", async () => {
        const instance = await Voting.deployed();
        await instance.giveRightToVote(accounts[1]);
        await instance.vote(0, { from: accounts[1] });
        const proposal = await instance.proposals(0);
        assert.equal(proposal.voteCount, 1, "Vote count is not correct");
    });
});
