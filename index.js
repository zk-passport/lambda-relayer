const { ethers } = require("ethers");
require('dotenv').config()

exports.handler = async function(event) {
  const {chain, tx_data} = JSON.parse(event.body);
  try {
    const provider =
      chain === "mumbai"
      ? new ethers.JsonRpcProvider("https://polygon-mumbai-bor.publicnode.com")
      : chain === "sepolia"
      ? new ethers.JsonRpcProvider("https://gateway.tenderly.co/public/sepolia")
      : chain === "gnosis"
      ? new ethers.JsonRpcProvider("https://gnosis.drpc.org")
      : new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/nt_Vk273qpsz3qIEWkHi_ACuCXOXNdro"); // assume it's polygon mainnet
    
    const signer = new ethers.Wallet(process.env.PKEY, provider);
    const tx = await signer.sendTransaction(tx_data);
    return {
      statusCode: 200,
      body: JSON.stringify({ hash: tx.hash }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}