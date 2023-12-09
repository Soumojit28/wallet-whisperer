import { HardhatUserConfig } from "hardhat/config";
// import "hardhat-abi-exporter";
// import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-deploy";
// import "hardhat-tracer";
// import "hardhat-contract-sizer";
// import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter"
// import "@nomiclabs/hardhat-web3";
// import "hardhat-gui"
import * as dotenv from "dotenv";
import "hardhat-docgen"
dotenv.config({ path: __dirname + "/.env" });
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      chainId: 5,
      url: "https://eth-goerli.g.alchemy.com/v2/Lqi-_lwH8mlKdYiB23flLulXxchmOzpl",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mainnet: {
      chainId: 1,
      url: "https://eth-mainnet.g.alchemy.com/v2/cz4JcV3d4nIRcZSSR71Zrcalh1PDyxcj",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    polygon: {
      chainId: 137,
      url: "https://rpc.ankr.com/polygon/",
      accounts: [process.env.PRIVATE_KEY || ""],
      saveDeployments: true,
    },
    polygonMumbai: {
      chainId: 80001,
      url: "https://rpc.ankr.com/polygon_mumbai/",
      accounts: [process.env.PRIVATE_KEY || ""],
      saveDeployments: true,
    },
    zkEVMTest: {
      chainId: 1442,
      url: `https://rpc.public.zkevm-test.net`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts: [process.env.PRIVATE_KEY || ""],
      gasPrice: 1000000000
    },
    'base-goerli': {
      url: 'https://goerli.base.org',
      accounts: [process.env.PRIVATE_KEY || ""]
    },

  },
  namedAccounts: {
    deployer: {
        default: 0,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "QFZE642XXV4YANFUCC3MQ3NERX6XH1UXAV",
      polygon: "QFZE642XXV4YANFUCC3MQ3NERX6XH1UXAV",
      goerli: "7TMQDQN93WFJ6Y9IGK7GAPJCQK8WSH6YMT",
      mainnet: "7TMQDQN93WFJ6Y9IGK7GAPJCQK8WSH6YMT",
      zkEVMTest:"C7546JVE9YTJD37SBGFK5S1UJ8DJQ126VY",
      scrollSepolia: "48EQKFV3BTGJN8DRY4E2UNMMYZIITYFSPY",
      'base-goerli':"7M6RR9S9IKPD8NPWKS31WJKBEGMJ7DSFEU",
    },
    customChains: [
      {
        network: "zkEVMTest",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/"
        }
      },
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://api-sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
      {
        network: 'base-goerli',
        chainId: 84531,
        urls: {
          apiURL: 'https://api-goerli.basescan.org/api',
          browserURL: 'https://goerli.basescan.org/',
        },
      },
    ]
  },
  gasReporter: {
    gasPrice: 200,
    enabled: true,
    outputFile:"gas-report.txt",
    currency: "USD",
    noColors:true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token:"MATIC",
    rst: true

  },
};
export default config;