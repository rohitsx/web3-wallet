import { createContext, useContext, ReactNode, useState } from "react";
import Wallet from "../../utlis/createWallet";

const WalletContext = createContext<Wallet | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [walletInstance] = useState(() => new Wallet());
    return <WalletContext.Provider value={walletInstance}>{children}</WalletContext.Provider>
}

export default function useWallet() {
    const walletInstance = useContext(WalletContext);    
    if (!walletInstance) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return walletInstance;
}