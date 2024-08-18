import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    return <div>
        <div onClick={() => navigate('/solana')}>Solana Wallet</div>
        <div onClick={() => navigate('/ethereum')}>Ethereum Wallet</div>
        <div onClick={() => navigate('/balances')}>ETH/SOL Balances</div>
        <div onClick={() => navigate('/')}>Mnemonic</div>
    </div>
}