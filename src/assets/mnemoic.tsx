import useWallet from "./hooks/useWallet";
import { useNavigate } from "react-router-dom";

function Mnemonic() {

    const wallet = useWallet();
    const navigate = useNavigate();

    function navigatePage() {
        navigate('/wallet')
    }

    return (
        <>
            <h1>{wallet.getMnemonic()}</h1>
            <button onClick={navigatePage}>I saved my mnemonic</button>
        </>
    );
}

export default Mnemonic;