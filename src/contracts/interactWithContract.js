const { ethers } = require("ethers");
const { contractAddress, contractABI } = require("../config/contractConfig");
require('dotenv').config();

// Connect to Ethereum provider
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

// Set up wallet signer
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function definitions here (addAdmin, removeAdmin, storeAddress, etc.)

// Example usage
async function run() {
    await addAdmin("0xAdminAddress");
    await storeAddress({
        address: "0xUserAddress",
    }); // Use appropriate address data
    await getAddress("ABC123");
}

run().catch(console.error);
