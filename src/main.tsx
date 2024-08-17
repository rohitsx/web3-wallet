import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import Mnemonic from './assets/mnemoic.tsx';
import { WalletProvider } from './assets/hooks/useWallet.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mnemonic />,
  }, {
    path: "/wallet",
    element: <App />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
  </StrictMode>,
)
