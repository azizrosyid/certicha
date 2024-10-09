//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CertichaManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const certichaManagerAbi = [
    {
        type: "constructor",
        inputs: [{ name: "_owner", internalType: "address", type: "address" }],
        stateMutability: "nonpayable",
    },
    {
        type: "error",
        inputs: [
            { name: "participant", internalType: "string", type: "string" },
        ],
        name: "CertificateAlreadyIssued",
    },
    { type: "error", inputs: [], name: "InvalidNFTContractAddress" },
    { type: "error", inputs: [], name: "NoParticipantsProvided" },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "OwnableInvalidOwner",
    },
    {
        type: "error",
        inputs: [{ name: "account", internalType: "address", type: "address" }],
        name: "OwnableUnauthorizedAccount",
    },
    { type: "error", inputs: [], name: "ProgramNameEmpty" },
    { type: "error", inputs: [], name: "ProgramNotExist" },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "programId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
            {
                name: "participants",
                internalType: "string[]",
                type: "string[]",
                indexed: false,
            },
            {
                name: "recipient",
                internalType: "address",
                type: "address",
                indexed: false,
            },
        ],
        name: "CertificatesIssued",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "previousOwner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "newOwner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
        ],
        name: "OwnershipTransferred",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "programId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
            {
                name: "name",
                internalType: "string",
                type: "string",
                indexed: false,
            },
        ],
        name: "ProgramCreated",
    },
    {
        type: "function",
        inputs: [{ name: "_name", internalType: "string", type: "string" }],
        name: "addProgram",
        outputs: [
            { name: "programId", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "_programId", internalType: "uint256", type: "uint256" },
            {
                name: "participants",
                internalType: "string[]",
                type: "string[]",
            },
        ],
        name: "batchCheckCertificates",
        outputs: [{ name: "", internalType: "bool[]", type: "bool[]" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "_programId", internalType: "uint256", type: "uint256" },
        ],
        name: "getProgram",
        outputs: [
            { name: "name", internalType: "string", type: "string" },
            {
                name: "certificateCount",
                internalType: "uint256",
                type: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "_programId", internalType: "uint256", type: "uint256" },
            { name: "participant", internalType: "string", type: "string" },
        ],
        name: "hasCertificate",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "_programId", internalType: "uint256", type: "uint256" },
            { name: "recipient", internalType: "address", type: "address" },
            {
                name: "participants",
                internalType: "string[]",
                type: "string[]",
            },
            { name: "baseURI", internalType: "string", type: "string" },
        ],
        name: "issueCertificates",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [],
        name: "owner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "newOwner", internalType: "address", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CertichaNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const certichaNftAbi = [
    {
        type: "constructor",
        inputs: [
            { name: "_owner", internalType: "address", type: "address" },
            { name: "_name", internalType: "string", type: "string" },
            { name: "_symbol", internalType: "string", type: "string" },
        ],
        stateMutability: "nonpayable",
    },
    {
        type: "error",
        inputs: [
            { name: "recipient", internalType: "address", type: "address" },
            { name: "programName", internalType: "string", type: "string" },
        ],
        name: "CertificateAlreadyIssued",
    },
    {
        type: "error",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "CertificateDoesNotExist",
    },
    {
        type: "error",
        inputs: [
            { name: "sender", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "owner", internalType: "address", type: "address" },
        ],
        name: "ERC721IncorrectOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC721InsufficientApproval",
    },
    {
        type: "error",
        inputs: [
            { name: "approver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidApprover",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidOperator",
    },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "ERC721InvalidOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "receiver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidReceiver",
    },
    {
        type: "error",
        inputs: [{ name: "sender", internalType: "address", type: "address" }],
        name: "ERC721InvalidSender",
    },
    {
        type: "error",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ERC721NonexistentToken",
    },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "OwnableInvalidOwner",
    },
    {
        type: "error",
        inputs: [{ name: "account", internalType: "address", type: "address" }],
        name: "OwnableUnauthorizedAccount",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Approval",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "operator",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "bool",
                type: "bool",
                indexed: false,
            },
        ],
        name: "ApprovalForAll",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "_fromTokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
            {
                name: "_toTokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
        ],
        name: "BatchMetadataUpdate",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
            {
                name: "recipient",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "name",
                internalType: "string",
                type: "string",
                indexed: false,
            },
            {
                name: "programName",
                internalType: "string",
                type: "string",
                indexed: false,
            },
        ],
        name: "CertificateMinted",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "_tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
        ],
        name: "MetadataUpdate",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "previousOwner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "newOwner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
        ],
        name: "OwnershipTransferred",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "from",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "to",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Transfer",
    },
    {
        type: "function",
        inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "getApproved",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "getCertificateData",
        outputs: [
            { name: "name", internalType: "string", type: "string" },
            { name: "programName", internalType: "string", type: "string" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "getCurrentTokenId",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "recipient", internalType: "address", type: "address" },
            { name: "names", internalType: "string[]", type: "string[]" },
            { name: "programName", internalType: "string", type: "string" },
        ],
        name: "mintCertificates",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [],
        name: "name",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "owner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "approved", internalType: "bool", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "baseURI", internalType: "string", type: "string" }],
        name: "setBaseURI",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "newOwner", internalType: "address", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
    {
        type: "error",
        inputs: [
            { name: "sender", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "owner", internalType: "address", type: "address" },
        ],
        name: "ERC721IncorrectOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC721InsufficientApproval",
    },
    {
        type: "error",
        inputs: [
            { name: "approver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidApprover",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidOperator",
    },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "ERC721InvalidOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "receiver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidReceiver",
    },
    {
        type: "error",
        inputs: [{ name: "sender", internalType: "address", type: "address" }],
        name: "ERC721InvalidSender",
    },
    {
        type: "error",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ERC721NonexistentToken",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Approval",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "operator",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "bool",
                type: "bool",
                indexed: false,
            },
        ],
        name: "ApprovalForAll",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "from",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "to",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Transfer",
    },
    {
        type: "function",
        inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "getApproved",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "name",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "approved", internalType: "bool", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721URIStorage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721UriStorageAbi = [
    {
        type: "error",
        inputs: [
            { name: "sender", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "owner", internalType: "address", type: "address" },
        ],
        name: "ERC721IncorrectOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC721InsufficientApproval",
    },
    {
        type: "error",
        inputs: [
            { name: "approver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidApprover",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidOperator",
    },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "ERC721InvalidOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "receiver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidReceiver",
    },
    {
        type: "error",
        inputs: [{ name: "sender", internalType: "address", type: "address" }],
        name: "ERC721InvalidSender",
    },
    {
        type: "error",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ERC721NonexistentToken",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Approval",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "operator",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "bool",
                type: "bool",
                indexed: false,
            },
        ],
        name: "ApprovalForAll",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "_fromTokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
            {
                name: "_toTokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
        ],
        name: "BatchMetadataUpdate",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "_tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
        ],
        name: "MetadataUpdate",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "from",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "to",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Transfer",
    },
    {
        type: "function",
        inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "getApproved",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "name",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "approved", internalType: "bool", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
    {
        type: "error",
        inputs: [
            { name: "sender", internalType: "address", type: "address" },
            { name: "balance", internalType: "uint256", type: "uint256" },
            { name: "needed", internalType: "uint256", type: "uint256" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC1155InsufficientBalance",
    },
    {
        type: "error",
        inputs: [
            { name: "approver", internalType: "address", type: "address" },
        ],
        name: "ERC1155InvalidApprover",
    },
    {
        type: "error",
        inputs: [
            { name: "idsLength", internalType: "uint256", type: "uint256" },
            { name: "valuesLength", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC1155InvalidArrayLength",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "ERC1155InvalidOperator",
    },
    {
        type: "error",
        inputs: [
            { name: "receiver", internalType: "address", type: "address" },
        ],
        name: "ERC1155InvalidReceiver",
    },
    {
        type: "error",
        inputs: [{ name: "sender", internalType: "address", type: "address" }],
        name: "ERC1155InvalidSender",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "owner", internalType: "address", type: "address" },
        ],
        name: "ERC1155MissingApprovalForAll",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
    {
        type: "error",
        inputs: [
            { name: "spender", internalType: "address", type: "address" },
            { name: "allowance", internalType: "uint256", type: "uint256" },
            { name: "needed", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC20InsufficientAllowance",
    },
    {
        type: "error",
        inputs: [
            { name: "sender", internalType: "address", type: "address" },
            { name: "balance", internalType: "uint256", type: "uint256" },
            { name: "needed", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC20InsufficientBalance",
    },
    {
        type: "error",
        inputs: [
            { name: "approver", internalType: "address", type: "address" },
        ],
        name: "ERC20InvalidApprover",
    },
    {
        type: "error",
        inputs: [
            { name: "receiver", internalType: "address", type: "address" },
        ],
        name: "ERC20InvalidReceiver",
    },
    {
        type: "error",
        inputs: [{ name: "sender", internalType: "address", type: "address" }],
        name: "ERC20InvalidSender",
    },
    {
        type: "error",
        inputs: [{ name: "spender", internalType: "address", type: "address" }],
        name: "ERC20InvalidSpender",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC4906
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc4906Abi = [
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Approval",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "operator",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "bool",
                type: "bool",
                indexed: false,
            },
        ],
        name: "ApprovalForAll",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "_fromTokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
            {
                name: "_toTokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
        ],
        name: "BatchMetadataUpdate",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "_tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: false,
            },
        ],
        name: "MetadataUpdate",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "from",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "to",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Transfer",
    },
    {
        type: "function",
        inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "balanceOf",
        outputs: [
            { name: "balance", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "getApproved",
        outputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "owner", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "approved", internalType: "bool", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721Abi = [
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Approval",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "operator",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "bool",
                type: "bool",
                indexed: false,
            },
        ],
        name: "ApprovalForAll",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "from",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "to",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Transfer",
    },
    {
        type: "function",
        inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "balanceOf",
        outputs: [
            { name: "balance", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "getApproved",
        outputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "owner", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "approved", internalType: "bool", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
    {
        type: "error",
        inputs: [
            { name: "sender", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "owner", internalType: "address", type: "address" },
        ],
        name: "ERC721IncorrectOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "ERC721InsufficientApproval",
    },
    {
        type: "error",
        inputs: [
            { name: "approver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidApprover",
    },
    {
        type: "error",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidOperator",
    },
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "ERC721InvalidOwner",
    },
    {
        type: "error",
        inputs: [
            { name: "receiver", internalType: "address", type: "address" },
        ],
        name: "ERC721InvalidReceiver",
    },
    {
        type: "error",
        inputs: [{ name: "sender", internalType: "address", type: "address" }],
        name: "ERC721InvalidSender",
    },
    {
        type: "error",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ERC721NonexistentToken",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataAbi = [
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Approval",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "owner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "operator",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "approved",
                internalType: "bool",
                type: "bool",
                indexed: false,
            },
        ],
        name: "ApprovalForAll",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "from",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "to",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "tokenId",
                internalType: "uint256",
                type: "uint256",
                indexed: true,
            },
        ],
        name: "Transfer",
    },
    {
        type: "function",
        inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "balanceOf",
        outputs: [
            { name: "balance", internalType: "uint256", type: "uint256" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "getApproved",
        outputs: [
            { name: "operator", internalType: "address", type: "address" },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "operator", internalType: "address", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "name",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "ownerOf",
        outputs: [{ name: "owner", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "approved", internalType: "bool", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "interfaceId", internalType: "bytes4", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ name: "", internalType: "bool", type: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ name: "", internalType: "string", type: "string" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverAbi = [
    {
        type: "function",
        inputs: [
            { name: "operator", internalType: "address", type: "address" },
            { name: "from", internalType: "address", type: "address" },
            { name: "tokenId", internalType: "uint256", type: "uint256" },
            { name: "data", internalType: "bytes", type: "bytes" },
        ],
        name: "onERC721Received",
        outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Math
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mathAbi = [
    { type: "error", inputs: [], name: "MathOverflowedMulDiv" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
    {
        type: "error",
        inputs: [{ name: "owner", internalType: "address", type: "address" }],
        name: "OwnableInvalidOwner",
    },
    {
        type: "error",
        inputs: [{ name: "account", internalType: "address", type: "address" }],
        name: "OwnableUnauthorizedAccount",
    },
    {
        type: "event",
        anonymous: false,
        inputs: [
            {
                name: "previousOwner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
            {
                name: "newOwner",
                internalType: "address",
                type: "address",
                indexed: true,
            },
        ],
        name: "OwnershipTransferred",
    },
    {
        type: "function",
        inputs: [],
        name: "owner",
        outputs: [{ name: "", internalType: "address", type: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        inputs: [
            { name: "newOwner", internalType: "address", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
    },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
    {
        type: "error",
        inputs: [
            { name: "value", internalType: "uint256", type: "uint256" },
            { name: "length", internalType: "uint256", type: "uint256" },
        ],
        name: "StringsInsufficientHexLength",
    },
] as const;
