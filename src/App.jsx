import {
  useAddress,
  ConnectWallet,
  Web3Button,
  lightTheme,
} from "@thirdweb-dev/react"

const App = () => {
  const address = useAddress()
  console.log("👋 Address:", address)

  return (
    <div className="w-100 h-[100vh] flex flex-col justify-center items-center bg-green-100">
      {address ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Bem-vind@s à PrensaDAO</h1>
          <Web3Button />
        </>
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
