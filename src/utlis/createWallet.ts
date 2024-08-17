import { generateMnemonic, mnemonicToSeedSync, mnemonicToSeed } from "bip39";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Wallet as etherWallet, HDNodeWallet } from "ethers"

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

    public async getETHAddress(ethereumIndex: number):  Promise<address>  {
        const seed = await mnemonicToSeed(this.mnemonic);
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(`m/44'/60'/${ethereumIndex}'/0'`);
        const privateKey = child.privateKey;
        const wallet = new etherWallet(privateKey);

        return {
            privateKey: wallet.address,
            publicKey: wallet.privateKey
        }
    }


}
