import useWallet from "./hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Mnemonic() {
    const wallet = useWallet();
    const navigate = useNavigate();
    const [showMnemonic, setShowMnemonic] = useState(false);

    function navigatePage() {
        navigate('/solana')
    }

    return (
        <div className="container fade-in">
            <h1>Mnemonic</h1>
            <div className="seed-phrase-card">
                <div className="toggle-header" onClick={() => setShowMnemonic(!showMnemonic)}>
                    <h2>Your Seed Phrase</h2>
                    <span className={`toggle-icon ${showMnemonic ? 'open' : ''}`}>▼</span>
                </div>
                <div className={`toggle-content ${showMnemonic ? 'open' : ''}`}>
                    <div className="compact-list">
                        {wallet.getMnemonic().split(' ').map((word, index) => (
                            <span key={index}>{word}</span>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={navigatePage}>I saved my mnemonic</button>
        </div>
    );
}

export default Mnemonic;