import {
  useAddress,
  useContract,
  useNFTBalance,
  useNetworkMismatch,
  useSwitchChain,
  ConnectWallet,
} from "@thirdweb-dev/react"
import { useMemo } from "react"
import Propostas from "./Propostas"
import Membros from "./Membros"
import Conexao from "./Conexao"
import Resgate from "./Resgate"
import { ERC_1155_CONTRACT_ADDRESS } from "./constants"

const App = () => {
  const address = useAddress()
  const isMismatched = useNetworkMismatch()
  const switchChain = useSwitchChain()

  const { contract: editionDrop } = useContract(
    ERC_1155_CONTRACT_ADDRESS,
    "edition-drop"
  )
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  if (isMismatched) {
    return (
      <div className="w-100 h-[100vh] flex flex-col justify-center items-center gap-16 bg-green-100">
        <button
          className="inline-flex justify-center items-center bg-slate-900 text-white rounded-lg p-3"
          onClick={() => switchChain(84532)}
        >
          Switch to Base Sepolia
        </button>
      </div>
    )
  }

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
          <Resgate />
        )
      ) : (
        <Conexao />
      )}
    </div>
  )
}

export default App
