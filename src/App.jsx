import {
  useAddress,
  ConnectWallet,
  useContract,
  useNFTBalance,
  Web3Button,
} from "@thirdweb-dev/react"
import { useState, useEffect, useMemo } from "react"
import Propostas from "./Propostas"
import Membros from "./Membros"

const ERC_1155_CONTRACT_ADDRESS = "0xA9f4136be8c64fD799b405f5880B07116cc3D076"
const ERC_20_CONTRACT_ADDRESS = "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603"
const VOTE_CONTRACT_ADDRESS = "0x804eF932eae86F18917218D481012C2642dc26CD"

const App = () => {
  const address = useAddress()

  const { contract: editionDrop } = useContract(
    ERC_1155_CONTRACT_ADDRESS,
    "edition-drop"
  )
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  return (
    <div className="w-100 h-[100vh] flex flex-col justify-center items-center gap-16 bg-green-100">
      {address ? (
        hasClaimedNFT ? (
          <>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold mb-2">
                Página de membros PrensaDAO
              </h1>
              <h3 className="text-md mb-4">
                parabéns por fazer parte desse clube
              </h3>
              <ConnectWallet theme={"light"} />
            </div>

            <Membros hasClaimedNFT={hasClaimedNFT} />
            <Propostas hasClaimedNFT={hasClaimedNFT} />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6">Bem-vind@s à PrensaDAO</h1>
            <Web3Button
              theme={"light"}
              contractAddress={ERC_1155_CONTRACT_ADDRESS}
              action={(contract) => {
                contract.erc1155.claim(0, 1)
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
          </>
        )
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-2">Bem-vind@s à PrensaDAO</h1>
          <h3 className="text-xl mb-6">a DAO dos amantes de prensado</h3>
          <ConnectWallet theme={"light"} />
        </>
      )}
    </div>
  )
}

export default App
