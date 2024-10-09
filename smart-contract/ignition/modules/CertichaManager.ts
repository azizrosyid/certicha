import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CertichaManager", (hre) => {
  const certichaNFT = hre.contract("CertichaNFT", [
    "0x61F2B7781b3cb4B8eB77FC1aFd4F23179303AD66",
    "CertichaNFT",
    "CERT",
  ]);

  console.log(
    `CertichaNFT deployed to: ${hre.call(certichaNFT, "owner")}`
  );

  return {
    CertichaNFT: certichaNFT,
  };
});
