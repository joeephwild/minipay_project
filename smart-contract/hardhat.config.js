require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    celo: {
      url: "https://forno.celo.org",
      accounts: [`${AURORA_PRIVATE_KEY}`],
      // chainId: 42220,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${AURORA_PRIVATE_KEY}`],
      // chainId: 44787,
    },
  },
};
