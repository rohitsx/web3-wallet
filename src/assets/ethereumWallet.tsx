import useWallet from './hooks/useWallet';
import { useEffect, useRef, useState } from 'react';
import NavBar from './navBar';

export default function EthereumWallet() {
    const wallet = useWallet();
    const seedPhrase = useRef(wallet.getMnemonic().split(' '));
    const [ethereumIndex, setEthereumIndex] = useState(0);
    const [address, setAddress] = useState<any[]>([]);
    const [balances, setBalances] = useState<string | null>(null);
    const [ethereumAdress, setEthereumAdress] = useState<string>('');
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [showSeedPhrase, setShowSeedPhrase] = useState(false);


    useEffect(() => {
        wallet.getETHAddress(ethereumIndex).then(addr => {
            setAddress(prevAddresses => [...prevAddresses, addr]);
        });
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

    function returnBalance() {
        console.log(ethereumAdress);
        wallet.getETHBalance(ethereumAdress).then(balanceInstance => {
            setBalances(balanceInstance)
        });
    }

    return (
        <div className="container fade-in">
            <NavBar />
            <h1>Ethereum Wallet</h1>
            <div className="seed-phrase-card">
                <div className="toggle-header" onClick={() => setShowSeedPhrase(!showSeedPhrase)}>
                    <h2>Your Seed Phrase</h2>
                    <span className={`toggle-icon ${showSeedPhrase ? 'open' : ''}`}>▼</span>
                </div>
                <div className={`toggle-content ${showSeedPhrase ? 'open' : ''}`}>
                    <div className="compact-list">
                        {seedPhrase.current.map((word, index) => (
                            <span key={index}>{word}</span>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={addWallet}>Add Wallet</button>
            <div className="card-container">
                {address.map((addr, index) => (
                    <div key={index} className="wallet-card">
                        <div className="toggle-header" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                            <h2>Wallet {index + 1}</h2>
                            <span className={`toggle-icon ${showPrivateKey ? 'open' : ''}`}>▼</span>
                        </div>
                        <div className={`toggle-content ${showPrivateKey ? 'open' : ''}`}>
                            <p><strong>Private Key:</strong></p>
                            <p className="wallet-address">{addr.privateKey}</p>
                        </div>
                        <p><strong>Public Key:</strong></p>
                        <p className="wallet-address">{addr.publicKey}</p>
                    </div>
                ))}
            </div>
            <div className="balance-section">
                <h2>Get Ethereum Balance</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter Ethereum address"
                        onChange={(e) => setEthereumAdress(e.target.value)}
                        className="wallet-address"
                    />
                    <button onClick={returnBalance}>Submit</button>
                </div>
                {balances && <p>Quantity: {balances}</p>}
            </div>
        </div>
    );
}
