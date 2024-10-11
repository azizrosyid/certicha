// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CertichaNFT.sol";

/// @title CertichaManager
/// @dev A smart contract for managing unique certificates associated with specific programs.
contract CertichaManager is Ownable {
    /// @dev Represents a Program structure that holds basic information about each program.
    struct Program {
        string name;
        uint256 certificateCount;
        bool exists;
    }

    /// @dev Program ID counter to generate unique IDs for each program.
    uint256 private programCounter;

    /// @dev Mapping of program IDs to their Program details.
    mapping(uint256 => Program) private programs;

    /// @dev Nested mapping to track certificates issued to participants.
    /// Maps program ID to a participant's identifier (name) to a boolean indicating certificate ownership.
    mapping(uint256 => mapping(string => bool)) private certificates;

    /// @dev Reference to the CertichaNFT contract used for minting certificates.
    address public addressCertichaNFT;

    // Custom Errors
    error InvalidNFTContractAddress();
    error ProgramNameEmpty();
    error ProgramNotExist();
    error NoParticipantsProvided();
    error CertificateAlreadyIssued(string participant);

    /// @dev Event emitted when a new program is created.
    event ProgramCreated(uint256 indexed programId, string name);

    /// @dev Event emitted when certificates are issued to participants.
    event CertificatesIssued(
        uint256 indexed programId,
        string[] participants,
        address recipient
    );

    /**
     * @notice Initializes the CertichaManager contract.
     * @param _certichaNFT Address of the CertichaNFT contract used to mint certificate NFTs.
     */
    constructor(address _owner, address _certichaNFT) Ownable(_owner) {
        if (_certichaNFT == address(0)) revert InvalidNFTContractAddress();
        addressCertichaNFT = _certichaNFT;
    }

    /**
     * @notice Adds a new program to the system.
     * @param _name The name of the new program.
     * @return programId The unique ID of the newly created program.
     */
    function addProgram(
        string memory _name
    ) external onlyOwner returns (uint256 programId) {
        if (bytes(_name).length == 0) revert ProgramNameEmpty();

        programId = ++programCounter;
        programs[programId] = Program({
            name: _name,
            certificateCount: 0,
            exists: true
        });

        emit ProgramCreated(programId, _name);
    }

    /**p
     * @notice Issues certificates for a specific program to a participant address.
     * @dev Ensures each participant can only receive one certificate per program.
     * @param _programId The ID of the program for which to issue the certificate.
     * @param recipient The address of the participant receiving the certificate NFT.
     * @param participants An array of participant names for whom certificates are being issued.
     */
    function issueCertificates(
        uint256 _programId,
        address recipient,
        string[] calldata participants,
        string calldata baseURI
    ) public onlyOwner {
        Program storage program = programs[_programId];
        if (!program.exists) revert ProgramNotExist();
        if (participants.length == 0) revert NoParticipantsProvided();

        CertichaNFT certichaNFT = CertichaNFT(addressCertichaNFT);
        for (uint256 i = 0; i < participants.length; i++) {
            string memory participant = participants[i];
            if (certificates[_programId][participant])
                revert CertificateAlreadyIssued(participant);

            certificates[_programId][participant] = true;
            program.certificateCount++;

            // Mint certificate NFTs for each participant
        }

        certichaNFT.mintCertificates(
            recipient,
            participants,
            program.name,
            baseURI
        );

        // certichaNFT.mintCertificates(recipient, participants, program.name);

        emit CertificatesIssued(_programId, participants, recipient);
    }

    /**
     * @notice Checks if a participant holds a certificate for a specific program.
     * @param _programId The ID of the program to check.
     * @param participant The participant identifier to verify (e.g., name).
     * @return bool indicating certificate ownership status.
     */
    function hasCertificate(
        uint256 _programId,
        string calldata participant
    ) external view returns (bool) {
        return certificates[_programId][participant];
    }

    /**
     * @notice Retrieves information about a specific program.
     * @param _programId The ID of the program to retrieve.
     * @return name The name of the program.
     * @return certificateCount The total number of certificates issued for the program.
     */
    function getProgram(
        uint256 _programId
    ) external view returns (string memory name, uint256 certificateCount) {
        Program storage program = programs[_programId];
        if (!program.exists) revert ProgramNotExist();

        return (program.name, program.certificateCount);
    }

    /**
     * @notice Fetches certificate ownership for a list of participants in a specific program.
     * @dev This function could be gas-intensive if there are many participants; off-chain data handling is recommended for large datasets.
     * @param _programId The ID of the program.
     * @param participants Array of participant names to check.
     * @return Array of booleans indicating certificate ownership for each participant.
     */
    function batchCheckCertificates(
        uint256 _programId,
        string[] calldata participants
    ) external view returns (bool[] memory) {
        bool[] memory ownershipStatuses = new bool[](participants.length);
        for (uint256 i = 0; i < participants.length; i++) {
            ownershipStatuses[i] = certificates[_programId][participants[i]];
        }
        return ownershipStatuses;
    }
}
