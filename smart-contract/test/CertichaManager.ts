import { CertichaManager, CertichaNFT } from "../typechain-types";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("CertichaManager Contract", function () {
  let certichaNFT: CertichaNFT;
  let certichaManager: CertichaManager;
  let owner: Signer, addr1: Signer, addr2: Signer;

  before(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy CertichaNFT contract
    const CertichaNFT = await ethers.getContractFactory("CertichaNFT");
    certichaNFT = await CertichaNFT.deploy(
      await owner.getAddress(),
      "CertichaNFT",
      "CERT"
    );
    await certichaNFT.waitForDeployment();

    // Deploy CertichaManager contract
    const CertichaManager = await ethers.getContractFactory("CertichaManager");
    certichaManager = await CertichaManager.deploy(
      owner.getAddress()
      // certichaNFT.getAddress()
    );

    console.log("await certichaManager.owner()", await certichaManager.owner());
    console.log("await certichaNFT.owner()", await certichaNFT.owner());
    await certichaManager.waitForDeployment();
  });

  describe("Deployment Tests", function () {
    it("Should set the right owner", async function () {
      expect(await certichaManager.owner()).to.equal(await owner.getAddress());
    });

    // it("Should set the CertichaNFT address correctly", async function () {
    //   expect(await certichaManager.
    //     await certichaNFT.getAddress()
    //   );
    // });
  });

  // describe("Program Management", function () {
  //   describe("Add Program", function () {
  //     it("Should add a program successfully and emit ProgramCreated event", async function () {
  //       const tx = await certichaManager.addProgram("Blockchain 101");
  //       const receipt = await tx.wait();

  //       // Check program details
  //       const programId = 1;
  //       const program = await certichaManager.getProgram(programId);
  //       expect(program.name).to.equal("Blockchain 101");
  //       expect(program.certificateCount).to.equal(0);
  //     });

  //     it("Should revert when adding a program with an empty name", async function () {
  //       await expect(
  //         certichaManager.addProgram("")
  //       ).to.be.revertedWithCustomError(certichaManager, "ProgramNameEmpty");
  //     });
  //   });

  //   describe("Retrieve Program Information", function () {
  //     beforeEach(async function () {
  //       // Ensure a program exists for testing
  //       await certichaManager.addProgram("Ethereum Basics");
  //     });

  //     it("Should retrieve program information successfully", async function () {
  //       const programId = 2;
  //       const program = await certichaManager.getProgram(programId);

  //       expect(program.name).to.equal("Ethereum Basics");
  //       expect(program.certificateCount).to.equal(0);
  //     });

  //     it("Should revert when retrieving information for a non-existent program", async function () {
  //       const nonExistentProgramId = 999;
  //       await expect(
  //         certichaManager.getProgram(nonExistentProgramId)
  //       ).to.be.revertedWithCustomError(certichaManager, "ProgramNotExist");
  //     });
  //   });
  // });

  describe("Certificate Issuance", function () {
    beforeEach(async function () {
      // Ensure a program exists for testing
      await certichaManager.addProgram("Advanced Blockchain");
    });

    it("Should issue certificates successfully and emit CertificatesIssued event", async function () {
      const programId = 1;
      const participants = ["Alice", "Bob"];
      const recipient = await addr1.getAddress();

      console.log("certichaManager", await certichaManager.owner());
      console.log("owner", await owner.getAddress());
      console.log("certichaNFT", await certichaNFT.owner());
      await certichaManager
        .connect(owner)
        .issueCertificates(
          programId,
          recipient,
          participants,
          "https://www.certicha.com"
        );

      // Check that certificates were issued correctly
      for (const participant of participants) {
        const hasCertificate = await certichaManager.hasCertificate(
          programId,
          participant
        );
        expect(hasCertificate).to.be.true;
      }

      // Check that certificate count incremented
      //   const program = await certichaManager.getProgram(programId);
      //   expect(program.certificateCount).to.equal(participants.length);
    });

    it("Should revert when issuing certificates for a non-existent program", async function () {
      const invalidProgramId = 999;
      const participants = ["Charlie"];
      await expect(
        certichaManager.issueCertificates(
          invalidProgramId,
          await addr1.getAddress(),
          participants,
          "https://www.certicha.com"
        )
      ).to.be.revertedWithCustomError(certichaManager, "ProgramNotExist");
    });

    it("Should revert when issuing certificates with an empty participants array", async function () {
      const programId = 1;
      const emptyParticipants: string[] = [];
      await expect(
        certichaManager.issueCertificates(
          programId,
          await addr1.getAddress(),
          emptyParticipants,
          "https://www.certicha.com"
        )
      ).to.be.revertedWithCustomError(
        certichaManager,
        "NoParticipantsProvided"
      );
    });

    it("Should revert when attempting to issue duplicate certificates to the same participants", async function () {
      const programId = 1;
      const participants = ["Dave", "Eve"];

      await certichaManager.issueCertificates(
        programId,
        await addr1.getAddress(),
        participants,
        "https://www.certicha.com"
      );

      await expect(
        certichaManager.issueCertificates(
          programId,
          await addr1.getAddress(),
          participants,
          "https://www.certicha.com"
        )
      ).to.be.revertedWithCustomError(
        certichaManager,
        "CertificateAlreadyIssued"
      );
    });
  });

  // describe("Certificate Ownership Tracking", function () {
  //   it("Should confirm certificate ownership for a participant", async function () {
  //     await certichaManager.connect(owner).addProgram("Certification Program");
  //     const participants = ["Alice", "Bob"];
  //     const programId = 2;
  //     await certichaManager.issueCertificates(
  //       programId,
  //       await addr1.getAddress(),
  //       participants
  //     );

  //     const participant = "Alice";

  //     const hasCertificate = await certichaManager.hasCertificate(
  //       programId,
  //       participant
  //     );
  //     expect(hasCertificate).to.be.true;
  //   });

  //   it("Should confirm no certificate ownership for a participant without a certificate", async function () {
  //     await certichaManager.connect(owner).addProgram("Certification Program");
  //     const participants = ["Charlie", "David"];

  //     const programId = 2;
  //     await certichaManager.issueCertificates(
  //       programId,
  //       await addr1.getAddress(),
  //       participants
  //     );
  //     const nonParticipant = "Eve";

  //     const hasCertificate = await certichaManager.hasCertificate(
  //       programId,
  //       nonParticipant
  //     );
  //     expect(hasCertificate).to.be.false;
  //   });

  //   describe("Batch Check Certificate Ownership", function () {
  //     it("Should batch check certificate ownership accurately", async function () {
  //       await certichaManager
  //         .connect(owner)
  //         .addProgram("Certification Program");

  //       const programId = 2;
  //       const participants = ["Alice", "Bob", "Charlie2"];
  //       const ownershipStatuses = await certichaManager.batchCheckCertificates(
  //         programId,
  //         participants
  //       );

  //       expect(ownershipStatuses).to.deep.equal([true, true, false]);
  //     });

  //     it("Should return false ownership statuses for a non-existent program ID", async function () {
  //       const invalidProgramId = 999;
  //       const participants = ["Alice", "Bob"];
  //       const ownershipStatuses = await certichaManager.batchCheckCertificates(
  //         invalidProgramId,
  //         participants
  //       );

  //       expect(ownershipStatuses).to.deep.equal([false, false]);
  //     });
  //   });
  // });
});
