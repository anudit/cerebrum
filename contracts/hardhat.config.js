require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");
require('hardhat-ethernal');
require('dotenv').config()

let pk1 = process.env.PK_A;
let pk2 = process.env.PK_B;

const infuraNetwork = (network, chainId, gas) => {
  return {
    url: `https://${network}.infura.io/v3/9f34d0bf5e1b4b36914fd5bc66c50b05`,
    chainId,
    gas,
    accounts: pk1 == null ? [] : [pk1, pk2]
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
    // substrate: {
    //   url: "https://anudit-cerebrum-6hp8-9933.githubpreview.dev",
    //   chainId: 42,
    //   gasPrice: 1000000000,
    //   accounts: pk1 == null ? [] : [pk1, pk2]
    // }
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

