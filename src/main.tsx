import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import Mnemonic from './assets/mnemoic.tsx';
import { WalletProvider } from './assets/hooks/useWallet.tsx';
import SolanaWallet from './assets/solanaWallet.tsx';
import EthereumWallet from './assets/ethereumWallet.tsx';
import Balances from './assets/Balances.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mnemonic />,
  }, {
    path: "/wallet",
    element: <App />,
  }, {
    path: "/solana",
    element: <SolanaWallet/>,
  }, {
    path: "/ethereum",
    element: <EthereumWallet/>,
  }, {
    path: "/balances",
    element: <Balances/>
  }
])

createRoot(document.getElementById('root')!).render(
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
)
