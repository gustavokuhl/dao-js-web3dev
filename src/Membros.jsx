import { useContract } from "@thirdweb-dev/react"
import { useState, useEffect, useMemo } from "react"

const ERC_1155_CONTRACT_ADDRESS = "0xA9f4136be8c64fD799b405f5880B07116cc3D076"
const ERC_20_CONTRACT_ADDRESS = "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603"

function Membros({ hasClaimedNFT }) {
  const { contract: token } = useContract(ERC_20_CONTRACT_ADDRESS, "token")

  const { contract: editionDrop } = useContract(
    ERC_1155_CONTRACT_ADDRESS,
    "edition-drop"
  )

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
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-medium mb-4">Membros</h2>
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
    </div>
  )
}

export default Membros
