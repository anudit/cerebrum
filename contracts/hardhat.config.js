require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");
require('dotenv').config()

let mnemonic = process.env.MNEMONIC;

const infuraNetwork = (network, chainId, gas) => {
  return {
    url: `https://${network}.infura.io/v3/${process.env.PROJECT_ID}`,
    chainId,
    gas,
    accounts: mnemonic ? { mnemonic } : undefined
  };
};

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            runs: 99999,
            enabled: true
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            runs: 99999,
            enabled: true
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {},
    rinkeby: infuraNetwork("rinkeby", 4, 6283185),
    kovan: infuraNetwork("kovan", 42, 6283185),
    goerli: infuraNetwork("goerli", 5, 6283185),
    substrate: {
      url: "http://127.0.0.1:9933",
      chainId: 21,
      gasPrice: 1000000000,
      accounts: mnemonic ? { mnemonic } : undefined
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY ? process.env.ETHERSCAN_API_KEY : undefined
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 1,
    coinmarketcap: process.env.CMC_APIKEY
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    only: ['Cerebrum'],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  }
};

