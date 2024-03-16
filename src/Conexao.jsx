import { ConnectWallet } from "@thirdweb-dev/react"

function Conexao() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-2">Bem-vind@s à PrensaDAO</h1>
      <h3 className="text-xl mb-6">a DAO dos amantes de prensado</h3>
      <ConnectWallet theme={"light"} />
    </div>
  )
}

export default Conexao
