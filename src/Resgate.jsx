import React from "react"
import { ERC_1155_CONTRACT_ADDRESS } from "./constants"
import { Web3Button, useContract } from "@thirdweb-dev/react"

function Resgate() {
  const { contract: editionDrop } = useContract(
    ERC_1155_CONTRACT_ADDRESS,
    "edition-drop"
  )

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Bem-vind@s à PrensaDAO</h1>
      <Web3Button
        theme={"light"}
        contractAddress={ERC_1155_CONTRACT_ADDRESS}
        action={async (contract) => {
          try {
            await contract.erc1155.claim(0, 1)
          } catch (err) {
            console.log(err)
          }
        }}
        onSuccess={() => {
          console.log(
            `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/base-sepolia/${editionDrop.getAddress()}/0`
          )
        }}
        onError={(error) => {
          console.error("Failed to mint NFT", error)
        }}
      >
        Resgate seu NFT
      </Web3Button>
    </div>
  )
}

export default Resgate
