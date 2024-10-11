import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

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
      accounts: [process.env.PRIVATE_KEY || "0x000"],
    },
  },
};

export default config;
