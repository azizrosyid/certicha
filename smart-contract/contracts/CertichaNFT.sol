// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title CertichaNFT
 * @dev NFT contract for certifying recipients in specific programs, ensuring each recipient can only receive one NFT per program.
 */
contract CertichaNFT is ERC721, Ownable, ERC721URIStorage {
    uint256 private _currentTokenId = 0;

    struct Certificate {
        string name;
        string programName;
    }

    /// @notice Mapping from token ID to Certificate data
    mapping(uint256 => Certificate) private certificates;

    /// @notice Tracks if a recipient already holds a certificate for a specific program
    mapping(address => mapping(string => bool)) private _hasCertificate;

    /// @notice Emitted when a new certificate NFT is minted
    event CertificateMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string name,
        string programName
    );

    /// @dev Error for when a certificate already exists for a recipient in a program
    error CertificateAlreadyIssued(address recipient, string programName);

    /// @dev Error for when a certificate does not exist for a given tokenId
    error CertificateDoesNotExist(uint256 tokenId);

    string private _nftBaseURI;

    /**
     * @dev Initializes the contract with the owner address, token name, and symbol.
     * @param _owner Address of the contract owner
     * @param _name Name of the NFT collection
     * @param _symbol Symbol of the NFT collection
     */
    constructor(
        address _owner,
        string memory _name,
        string memory _symbol
    ) Ownable(_owner) ERC721URIStorage() ERC721(_name, _symbol) {}

    function setBaseURI(string memory baseURI) external {
        _nftBaseURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _nftBaseURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @notice Mints new certificate NFTs to a recipient for a specified program.
     * @dev Each recipient can only receive one certificate per program per name.
     * @param recipient Address receiving the NFT(s).
     * @param names Array of names for the certificate holders (e.g., multiple participants).
     * @param programName Name of the program for which the certificate is issued.
     */
    function mintCertificates(
        address recipient,
        string[] calldata names,
        string calldata programName,
        string calldata tokenBaseURI
    ) external {
        require(names.length > 0, "Names array cannot be empty.");
        if (_hasCertificate[recipient][programName]) {
            revert CertificateAlreadyIssued(recipient, programName);
        }

        for (uint256 i = 0; i < names.length; i++) {
            string memory name = names[i];

            // Check if the recipient already has a certificate for this name and program combination

            // Increment token ID and mint the NFT
            _currentTokenId++;
            uint256 tokenId = _currentTokenId;

            string memory participantTokenURI = string(
                abi.encodePacked(tokenBaseURI, tokenId)
            );
            _setTokenURI(tokenId, participantTokenURI);

            _safeMint(recipient, tokenId);

            // Record certificate details for the specific name and program
            certificates[tokenId] = Certificate(name, programName);
            emit CertificateMinted(tokenId, recipient, name, programName);
        }
    }

    /**
     * @notice Retrieves certificate details for a specified tokenId.
     * @param tokenId Unique identifier of the certificate NFT
     * @return name Name of the certificate holder
     * @return programName Name of the program associated with the certificate
     */
    function getCertificateData(
        uint256 tokenId
    ) external view returns (string memory name, string memory programName) {
        if (ownerOf(tokenId) == address(0)) {
            revert CertificateDoesNotExist(tokenId);
        }

        Certificate memory certificate = certificates[tokenId];
        return (certificate.name, certificate.programName);
    }

    function getCurrentTokenId() external view returns (uint256) {
        return _currentTokenId;
    }
}
