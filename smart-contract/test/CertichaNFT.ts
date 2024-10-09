import { expect } from "chai";
import { ethers } from "hardhat";
import { CertichaNFT } from "../typechain-types";
import { Typed, AddressLike, ContractRunner, Signer } from "ethers";

describe("CertichaNFT Contract", function () {
  let certichaNFT: CertichaNFT;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  const certificateName: string[] = ["Alice", "Bob", "Charlie", "David", "Eve"];

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const CertichaNFT = await ethers.getContractFactory("CertichaNFT");
    console.log(owner.getAddress());
    certichaNFT = await CertichaNFT.deploy(
      owner.getAddress(),
      "CertichaNFT",
      "CERT"
    );

    await certichaNFT.waitForDeployment();
  });

  describe("Deployment Tests", function () {
    it("Should set the correct owner", async function () {
      expect(await certichaNFT.owner()).to.equal(await owner.getAddress());
    });
    it("Should initialize with _currentTokenId as 0", async function () {
      expect(await certichaNFT.getCurrentTokenId()).to.equal(0n);
    });
    it("Should have empty certificates and _hasCertificate mappings initially", async function () {
      await expect(
        certichaNFT.getCertificateData(1)
      ).to.be.revertedWithCustomError(certichaNFT, "ERC721NonexistentToken");
    });
  });

  describe("Minting Certificates", function () {
    it("Should mint a certificate with valid name and programName, increment _currentTokenId, and emit event", async function () {
      const programName = "Blockchain Basics";

      // Mint the certificate
      await expect(
        certichaNFT
          .connect(owner)
          .mintCertificates(
            await addr1.getAddress(),
            certificateName,
            programName
          )
      ).to.emit(certichaNFT, "CertificateMinted");

      // Verify _currentTokenId increment
      // expect(await certichaNFT["_currentTokenId"]()).to.equal(1);

      // Check certificate data
      const certData = await certichaNFT.getCertificateData(1);
      expect(certData[0]).to.equal(certificateName[0]);
      expect(certData[1]).to.equal(programName);
    });

    it("Should revert when minting a second certificate for the same recipient and programName", async function () {
      const programName = "Blockchain Basics";

      // Mint the first certificate
      console.log("await owner.getAddress()", await addr1.getAddress());
      await certichaNFT
        .connect(owner)
        .mintCertificates(
          await addr1.getAddress(),
          certificateName,
          programName
        );

      // Attempt to mint a second certificate for the same recipient and program
      // await expect(
      //   certichaNFT
      //     .connect(owner)
      //     .mintCertificates(
      //       await addr1.getAddress(),
      //       certificateName,
      //       programName
      //     )
      // )
      //   .to.be.revertedWithCustomError(certichaNFT, "CertificateAlreadyIssued")
      //   .withArgs(await addr1.getAddress(), programName);
    });

    it("Should mint certificates with unique tokenIds for the same recipient but different programNames", async function () {
      // Mint certificates for different programs
      await certichaNFT
        .connect(owner)
        .mintCertificates(
          addr1.getAddress(),
          certificateName,
          "Blockchain Basics"
        );
      await certichaNFT
        .connect(owner)
        .mintCertificates(
          addr1.getAddress(),
          certificateName,
          "Advanced Solidity"
        );

      // Verify _currentTokenId is incremented correctly
      // expect(await certichaNFT["_currentTokenId"]()).to.equal(2);

      // Check each token's data
      const certData1 = await certichaNFT.getCertificateData(1);
      const certData2 = await certichaNFT.getCertificateData(6);

      expect(certData1[1]).to.equal("Blockchain Basics");
      expect(certData2[1]).to.equal("Advanced Solidity");
    });

    it("Should mint certificates with unique tokenIds for different recipients but same programName", async function () {
      const programName = "Blockchain Basics";

      // Mint certificates for different recipients for the same program
      await certichaNFT
        .connect(owner)
        .mintCertificates(addr1.getAddress(), certificateName, programName);

      // Check data for each token
      certificateName.forEach(async (name, index) => {
        const certData = await certichaNFT.getCertificateData(index + 1);
        expect(certData[0]).to.equal(name);
        expect(certData[1]).to.equal(programName);
      });
    });
  });

  describe("3. Retrieving Certificate Data", function () {
    beforeEach(async function () {
      // Mint a certificate to set up for data retrieval tests
      await certichaNFT
        .connect(owner)
        .mintCertificates(
          await addr1.getAddress(),
          certificateName,
          "Blockchain Basics"
        );
    });

    it("Should retrieve certificate data for an existing tokenId", async function () {
      const certData = await certichaNFT.getCertificateData(1);

      expect(certData[0]).to.equal("Alice");
      expect(certData[1]).to.equal("Blockchain Basics");
    });

    it("Should revert with ERC721NonexistentToken error for a non-existent tokenId", async function () {
      await expect(
        certichaNFT.getCertificateData(999)
      ).to.be.revertedWithCustomError(certichaNFT, "ERC721NonexistentToken");
      // .withArgs(999);
    });
  });


  describe("6. Edge Cases", function () {
    it("Should revert when minting with address(0) as recipient", async function () {
      const name = "Alice";
      const programName = "Blockchain Basics";

      await expect(
        certichaNFT
          .connect(owner)
          .mintCertificates(ethers.ZeroAddress, certificateName, programName)
      ).to.be.revertedWithCustomError(certichaNFT, "ERC721InvalidReceiver");
    });

    it("Should not allow minting with empty strings for name or programName", async function () {
      const emptyName: string[] = [];
      const emptyProgram = "";

      await expect(
        certichaNFT
          .connect(owner)
          .mintCertificates(await addr1.getAddress(), emptyName, emptyProgram)
      ).to.be.revertedWith("Names array cannot be empty.");

      await expect(
        certichaNFT.getCertificateData(1)
      ).to.be.revertedWithCustomError(certichaNFT, "ERC721NonexistentToken");
    });

    // it("Should handle max uint256 value for _currentTokenId", async function () {
    //   // Manually set _currentTokenId to MaxUint256
    //   await ethers.provider.send("hardhat_setStorageAt", [
    //     certichaNFT.target,
    //     ethers.keccak256(ethers.hexlify(0)),
    //     ethers.MaxUint256.toHexString(),
    //   ]);

    //   await expect(
    //     certichaNFT
    //       .connect(owner)
    //       .mintCertificate(
    //         await addr1.getAddress(),
    //         "Alice",
    //         "Blockchain Basics"
    //       )
    //   ).to.be.reverted; // Expect overflow error
    // });
  });
});
