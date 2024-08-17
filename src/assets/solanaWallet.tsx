import useWallet from './hooks/useWallet';
import { useEffect, useRef, useState } from 'react';

export default function SolanaWallet() {
  const wallet = useWallet();
  const seedPhrase = useRef(wallet.getMnemonic().split(' '));
  const [solanaIndex, setSolanaIndex] = useState(0);
  const [address, setAddress] = useState([wallet.getSolanaAddress(solanaIndex)]);

  function addWallet() {
    setSolanaIndex(prev => prev + 1);
  }

  useEffect(() => {
    if (solanaIndex > 0) {
      const newAddress = wallet.getSolanaAddress(solanaIndex);
      setAddress(prevAddresses => [...prevAddresses, newAddress]);
    }
  }, [solanaIndex]);

  return (
    <div>
      <h1>Solana Wallet</h1>
      <div>
        <div>Your Seed Phrase</div>
        {seedPhrase.current.map((word: string) => (
          <div key={word}>{word}</div>
        ))}
      </div>
      <div>
        <button onClick={addWallet}>Add Wallet</button>
        <div>
          {address.map((addr, index) => (
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
