import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import "./index.css"

const TW_CLIENT_ID = process.env.REACT_APP_THIRDWEB_CLIENT_ID

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain="base-sepolia-testnet"
      clientId={TW_CLIENT_ID}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
)
