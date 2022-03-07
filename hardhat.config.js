require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.7.0",
      },
      {
        version: "0.6.0",
      },
    ],
  },
  networks: {
    matic: {
      url: process.env.MATIC_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "Y9KVN5AXDYYE5BNBW74VTKEUQPZMDPTA3R"
  }
};
