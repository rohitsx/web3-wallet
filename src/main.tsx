import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mnemonic from './assets/mnemoic.tsx';
import { WalletProvider } from './assets/hooks/useWallet.tsx';
import SolanaWallet from './assets/solanaWallet.tsx';
import EthereumWallet from './assets/ethereumWallet.tsx';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mnemonic />,
  }, {
    path: "/solana",
    element: <SolanaWallet />,
  }, {
    path: "/ethereum",
    element: <EthereumWallet />,
  },
])

createRoot(document.getElementById('root')!).render(
  <WalletProvider>
    <RouterProvider router={router} />
  </WalletProvider>
)
