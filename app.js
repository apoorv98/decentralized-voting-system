const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [...] // Paste the ABI here

async function init() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const proposals = await contract.methods.proposals().call();
        const proposalList = document.getElementById('proposal-list');
        proposals.forEach((proposal, index) => {
            const proposalElement = document.createElement('div');
            proposalElement.innerHTML = `${index + 1}. ${proposal.name} - Votes: ${proposal.voteCount}`;
            proposalList.appendChild(proposalElement);
        });
    } else {
        alert('Please install MetaMask!');
    }
}

window.addEventListener('load', init);
