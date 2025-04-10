const { ethers } = require("ethers");
const { contractABI, contractBytecode } = require("../config/contractConfig"); // Import ABI and Bytecode
const { INFURA_PROJECT_ID, PRIVATE_KEY } = process.env;

// Set up the Ethereum provider (Infura or another RPC provider)
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);

// Set up the wallet signer (using your private key)
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Deploy contract function
const deployContract = async () => {
    try {
        console.log("Deploying contract...");

        // Create contract factory
        const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

        // Deploy contract
        const contract = await contractFactory.deploy();

        console.log(`Contract deployed to address: ${contract.address}`);
        console.log(`Transaction Hash: ${contract.deployTransaction.hash}`);

        // Wait for the transaction to be mined
        await contract.deployTransaction.wait();

        console.log("Contract deployed and transaction mined!");
    } catch (error) {
        console.error("Error during contract deployment:", error);
    }
};

// Run the deploy function
deployContract();
