import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";

type solanaAddress = {
    privateKey: string;
    publicKey: string;
};

export default class Wallet {
    private mnemonic: string;
    private keypair: Keypair;

    constructor() {
        this.mnemonic = generateMnemonic();
        this.keypair = this.generateKeypairFromMnemonic(this.mnemonic);
    }

    public getMnemonic(): string {
        return this.mnemonic;
    }

    public getSolanaAddress(): solanaAddress {
        return {
            privateKey: Buffer.from(this.keypair.secretKey).toString('hex'),
            publicKey: this.keypair.publicKey.toBase58()
        }
    }

    private generateKeypairFromMnemonic(mnemonic: string): Keypair {
        const seed = mnemonicToSeedSync(mnemonic);
        const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString('hex')).key;
        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
        return new Keypair(keypair);
    }

    
}
