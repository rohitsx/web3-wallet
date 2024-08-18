import { generateMnemonic, mnemonicToSeedSync, mnemonicToSeed } from "bip39";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Wallet as etherWallet, HDNodeWallet, ethers } from "ethers"
import axios from "axios";

type address = {
    privateKey: string;
    publicKey: string;
};

export default class Wallet {
    private mnemonic: string;

    constructor() {
        this.mnemonic = generateMnemonic();
    }

    public getMnemonic(): string {
        return this.mnemonic;
    }


    public getSolanaAddress(solanaIndex: number): address {
        const seed = mnemonicToSeedSync(this.mnemonic);
        const derivedSeed = derivePath(`m/44'/501'/${solanaIndex}'/0'`, seed.toString('hex')).key;
        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
        const solanaKeypair = new Keypair(keypair);

        return {
            privateKey: Buffer.from(solanaKeypair.secretKey).toString('hex'),
            publicKey: solanaKeypair.publicKey.toBase58()
        }
    }

    /**
     * getSolanaBalance
     */
    public async getSolanaBalance(walletAdress: string) {
        const response = await axios.post('https://solana-mainnet.g.alchemy.com/v2/Il61Yi7gbnT3tFtx1shQXnziAGYoabFa', {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [walletAdress]
        });
        const balanceLamports = response.data.result.value;
        const balanceSOL = balanceLamports / LAMPORTS_PER_SOL;

        // Format to 9 decimal places (maximum precision for SOL)
        return balanceSOL.toFixed(9);

    }

    public async getETHAddress(ethereumIndex: number): Promise<address> {
        const seed = await mnemonicToSeed(this.mnemonic);
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(`m/44'/60'/${ethereumIndex}'/0'`);
        const privateKey = child.privateKey;
        const wallet = new etherWallet(privateKey);

        return {
            privateKey: wallet.address,
            publicKey: wallet.privateKey
        };
    }

    public async getETHBalance(walletAdress: string) {
        const response = await axios.post('https://eth-mainnet.g.alchemy.com/v2/Il61Yi7gbnT3tFtx1shQXnziAGYoabFa', {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_getBalance",
            "params": [walletAdress, "latest"]
        });

        const hexBalance = response.data.result;
        const balanceWei = ethers.toBigInt(hexBalance);
        const balanceEther = ethers.formatEther(balanceWei);
        return balanceEther;
    }


}
