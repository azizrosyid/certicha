import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://base-sepolia.infura.io/v3/798508845b4e4627910c371858b5c96f",
      accounts: [
        "0x00000",
      ],
    },
  },
};

export default config;
