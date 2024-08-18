import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <div className="nav-container">
                <Link to="/solana" className="nav-item">Solana Wallet</Link>
                <Link to="/" className="nav-item">Mnemonic</Link>
                <Link to="/ethereum" className="nav-item">Ethereum Wallet</Link>
            </div>
        </nav>
    );
}