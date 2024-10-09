import express from "express";
import logger from "morgan";
import * as path from "path";
import {
    createPublicClient,
    createWalletClient,
    decodeAbiParameters,
    decodeErrorResult,
    decodeFunctionData,
    encodeFunctionData,
    http,
} from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import { getContract } from "viem";
import { certichaManagerAbi } from "./generated";

import { Contract, ethers, Wallet } from "ethers";

const PRIVATE_KEY = (process.env.PRIVATE_KEY || "0x000") as `0x${string}`;

const account = privateKeyToAccount(PRIVATE_KEY);

const publicClient = createPublicClient({
    transport: http(
        "https://base-sepolia.infura.io/v3/798508845b4e4627910c371858b5c96f",
    ),
    chain: base,
});

const walletClient = createWalletClient({
    transport: http(
        "https://base-sepolia.infura.io/v3/798508845b4e4627910c371858b5c96f",
    ),
    chain: base,
    account,
});

const contract = getContract({
    address: "0x053cB640aAB8b7d32E5D1c59aD3028136A17902c",
    abi: certichaManagerAbi,
    client: walletClient,
});

const provider = new ethers.JsonRpcProvider(
    "https://base-sepolia.infura.io/v3/798508845b4e4627910c371858b5c96f",
);

const wallet = new Wallet(PRIVATE_KEY, provider);

const etherContract = new Contract(
    "0x053cB640aAB8b7d32E5D1c59aD3028136A17902c", // Contract address
    certichaManagerAbi, // ABI
    wallet, // Signer or provider (wallet in this case for write capabilities)
);

export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));

app.post("/program", async (req, res) => {
    try {
        const program = await etherContract.getFunction("addProgram")(
            req.body.name,
        );
        res.send(program);
    } catch (e: any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

app.get("/program/:id", async (req, res) => {
    try {
        const program = await contract.read.getProgram([BigInt(req.params.id)]);
        res.send(program);
    } catch (e: any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

app.post("/certificate", async (req, res) => {
    try {
        const program = await etherContract.getFunction("issueCertificates")(
            BigInt(req.body.programId),
            req.body.address,
            req.body.participants,
            "https://ipfs.io/ipfs/Qmb17fWh3y7gQN9Rxy8M6MG2T9C8Y5Dfvzzinjdx6c8jne",
            {
                gasLimit: 500000,
            },
        );

        const receipt = await program.wait();

        res.send(receipt);
    } catch (e: any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that");
});
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        res.status(500).send(err.message);
    },
);
