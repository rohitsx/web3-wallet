import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  return <div>
    <button onClick={() => navigate('/solana')}>Solona Wallet</button>
    <button onClick={() => navigate('/ethereum')}>Ethereum Wallet</button>
  </div>
}

export default App;
