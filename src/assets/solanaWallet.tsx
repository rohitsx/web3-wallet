import useWallet from './hooks/useWallet';
import { useEffect, useRef, useState } from 'react';
import NavBar from './navBar';

export default function SolanaWallet() {
  const wallet = useWallet();
  const seedPhrase = useRef(wallet.getMnemonic().split(' '));
  const [solanaIndex, setSolanaIndex] = useState(0);
  const [address, setAddress] = useState([wallet.getSolanaAddress(solanaIndex)]);
  const [balances, setBalances] = useState<string | null>(null);
  const [solanaAddress, setSolanaAddress] = useState<string>('');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  function addWallet() {
    setSolanaIndex(prev => prev + 1);
  }

  function returnBalance() {
    wallet.getSolanaBalance(solanaAddress).then(balanceInstance => {
      setBalances(balanceInstance)
    })
  }

  useEffect(() => {
    if (solanaIndex > 0) {
      const newAddress = wallet.getSolanaAddress(solanaIndex);
      setAddress(prevAddresses => [...prevAddresses, newAddress]);
    }
  }, [solanaIndex]);

  return (
    <div className="container fade-in">
      <NavBar />
      <h1>Solana Wallet</h1>
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
        <h2>Get Solana Balance</h2>
        <div className='input-container'>
          <input
            type="text"
            placeholder="Enter Solana address"
            onChange={(e) => setSolanaAddress(e.target.value)}
          />
          <button onClick={returnBalance}>Submit</button>
        </div>
        {balances && <p>Quantity: {balances}</p>}
      </div>
    </div>
  );
}