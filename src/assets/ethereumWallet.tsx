import useWallet from './hooks/useWallet';
import { useEffect, useRef, useState } from 'react';

export default function EthereumWallet() {
    const wallet = useWallet();
    const seedPhrase = useRef(wallet.getMnemonic().split(' '));
    const [ethereumIndex, setEthereumIndex] = useState(0);
    const [address, setAddress] = useState<any[]>([]);

    type Address = {
        privateKey: string;
        publicKey: string;
    };

    useEffect(() => {
        wallet.getETHAddress(ethereumIndex).then(addr => {
            setAddress(prevAddresses => [...prevAddresses, addr]);
        });

        console.log(address);
        
    }, []);

    useEffect(() => {
        if (ethereumIndex > 0) {
            wallet.getETHAddress(ethereumIndex).then(addr => {
                setAddress(prevAddresses => [...prevAddresses, addr]);
            });
        }
    }, [ethereumIndex, wallet]);

    function addWallet() {
        setEthereumIndex(prev => prev + 1);
    }

    return (
        <div>
            <h1>Ethereum Wallet</h1>
            <div>
                <div>Your Seed Phrase</div>
                {seedPhrase.current.map((word: string) => (
                    <div key={word}>{word}</div>
                ))}
            </div>
            <div>
                <button onClick={addWallet}>Add Wallet</button>
                <div>
                    {address.map((addr: Address, index: number) => (
                        <div key={index}>
                            <div>Public Key</div>
                            <div>{addr.publicKey}</div>
                            <div>Private Key</div>
                            <div>{addr.privateKey}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
