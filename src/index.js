import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="base-sepolia-testnet">
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
)
