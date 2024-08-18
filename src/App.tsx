import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  return <div>
    <div onClick={() => navigate('/')}>Go Back</div>
    <div onClick={() => navigate('/solana')}>Solona Wallet</div>
    <div onClick={() => navigate('/ethereum')}>Ethereum Wallet</div>
    <div onClick={() => navigate('/balances')}>ETH/SOL Balances</div>
  </div>
}

export default App;
