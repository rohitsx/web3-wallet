import useWallet from './assets/hooks/useWallet';
import './App.css';

function App() {

  const wallet = useWallet();


  return (
    <>
      <div>
        solana address <br />private key: {wallet.getSolanaAddress().privateKey} <br />public key: {wallet.getSolanaAddress().publicKey}
      </div>
      <br />
      <div>
        ethrium address <br /> 
      </div>

    </>
  );
}

export default App;