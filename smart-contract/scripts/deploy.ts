import { ethers } from "hardhat";

async function main() {
  // Deploy the CertichaNFT contract
  const CertichaNFT = await ethers.getContractFactory("CertichaNFT");
  const certichaNFT = await CertichaNFT.deploy(
    "0x61F2B7781b3cb4B8eB77FC1aFd4F23179303AD66", // Replace with actual owner address
    "CertichaNFT", // NFT Name
    "CTCH" // NFT Symbol
  );
  await certichaNFT.waitForDeployment();
  console.log(`CertichaNFT deployed to: ${await certichaNFT.getAddress()}`);

  // Deploy the CertichaManager contract
  const CertichaManager = await ethers.getContractFactory("CertichaManager");
  const certichaManager = await CertichaManager.deploy(
    "0x61F2B7781b3cb4B8eB77FC1aFd4F23179303AD66" ,// Replace with actual owner address
    await certichaNFT.getAddress() // Address of the deployed

  );
  await certichaManager.waitForDeployment();
  console.log(
    `CertichaManager deployed to: ${await certichaManager.getAddress()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
