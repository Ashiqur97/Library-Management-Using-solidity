require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL;
const ALCHEMY_SEPOLIA_PRIVATE_KEY = process.env.ALCHEMY_SEPOLIA_PRIVATE_KEY;


require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: ALCHEMY_SEPOLIA_URL,
      accounts: [ALCHEMY_SEPOLIA_PRIVATE_KEY]
    }
  }
};
