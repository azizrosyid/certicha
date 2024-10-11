import express from "express";
import logger from "morgan";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();
import {
    createPublicClient,
    createWalletClient,
    decodeAbiParameters,
    decodeErrorResult,
    decodeFunctionData,
    encodeFunctionData,
    http,
} from "viem";
import { base, baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import { getContract } from "viem";
import { certichaManagerAbi } from "./generated";

const PRIVATE_KEY = (process.env.PRIVATE_KEY || "0x000") as `0x${string}`;

const account = privateKeyToAccount(PRIVATE_KEY);

const publicClient = createPublicClient({
    transport: http(
        "https://base-sepolia.infura.io/v3/798508845b4e4627910c371858b5c96f",
    ),
    chain: baseSepolia,
});

const walletClient = createWalletClient({
    transport: http(
        "https://base-sepolia.infura.io/v3/798508845b4e4627910c371858b5c96f",
    ),
    chain: baseSepolia,
    account,
});

const contractAddress = process.env.CONTRACT_ADDRESS || "";

const contract = getContract({
    address: contractAddress as `0x${string}`,
    abi: certichaManagerAbi,
    client: walletClient,
});

export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));

app.post("/program", async (req, res) => {
    try {
        const addProgram = await contract.write.addProgram([req.body.name]);
        res.send(addProgram);
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
        const baseUrl =
            "https://mockapi.io/projects/60d4b6f7bca5b20017a0c6f3/certificate";
        const program = await contract.write.issueCertificates([
            BigInt(req.body.programId),
            req.body.address,
            req.body.participants,
            baseUrl + `/${req.body.programId}`,
        ]);

        res.send(program);
    } catch (e: any) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

app.get("/certificate/:id", async (req, res) => {
    try {
        const program = await contract.read.addressCertichaNFT();
        res.send(program);
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
