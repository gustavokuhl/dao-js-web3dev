import {
  useAddress,
  ConnectWallet,
  useContract,
  useNFTBalance,
  Web3Button,
} from "@thirdweb-dev/react"
import { useState, useEffect, useMemo } from "react"

const App = () => {
  const address = useAddress()
  console.log("👋 Address:", address)

  const editionDropAddress = "0xA9f4136be8c64fD799b405f5880B07116cc3D076"
  const { contract: editionDrop } = useContract(
    editionDropAddress,
    "edition-drop"
  )

  const tokenAddress = "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603"
  const { contract: token } = useContract(tokenAddress, "token")

  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  const [memberTokenAmounts, setMemberTokenAmounts] = useState([])
  const [memberAddresses, setMemberAddresses] = useState([])

  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4)
  }

  useEffect(() => {
    if (!hasClaimedNFT) {
      return
    }

    const getAllAddresses = async () => {
      try {
        const memberAddresses =
          await editionDrop.history.getAllClaimerAddresses(0)
        setMemberAddresses(memberAddresses)
        console.log("🚀 Endereços de membros", memberAddresses)
      } catch (error) {
        console.error("falha ao pegar lista de membros", error)
      }
    }
    getAllAddresses()
  }, [hasClaimedNFT, editionDrop])

  useEffect(() => {
    if (!hasClaimedNFT) {
      return
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances()
        setMemberTokenAmounts(amounts)
        console.log("👜 Quantidades", amounts)
      } catch (error) {
        console.error("falha ao buscar o saldo dos membros", error)
      }
    }
    getAllBalances()
  }, [hasClaimedNFT, token])

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      const member = memberTokenAmounts?.find(
        ({ holder }) => holder === address
      )

      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      }
    })
  }, [memberAddresses, memberTokenAmounts])

  return (
    <div className="w-100 h-[100vh] flex flex-col justify-center items-center bg-green-100">
      {address ? (
        hasClaimedNFT ? (
          <>
            <h1 className="text-4xl font-bold mb-2">
              Página de membros PrensaDAO
            </h1>
            <h3 className="text-md mb-4">
              parabéns por fazer parte desse clube
            </h3>
            <ConnectWallet theme={"light"} />

            <h2 className="text-2xl font-medium mt-12 mb-4">Membros</h2>
            <table className="w-[400px] text-sm text-gray-500 rounded-lg border overflow-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Endereço</th>
                  <th className="px-6 py-3">Quantidade de tokens</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => (
                  <tr className="bg-white border-b" key={member.address}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {shortenAddress(member.address)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {member.tokenAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-6">Bem-vind@s à PrensaDAO</h1>
            <Web3Button
              theme={"light"}
              contractAddress={editionDropAddress}
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
