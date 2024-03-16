import sdk from "./1-initialize-sdk.js"

const token = await sdk.getContract(
  "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603",
  "token"
)

;(async () => {
  try {
    const amount = 1_000_000
    await token.mint(amount)
    const totalSupply = await token.totalSupply()

    console.log(
      "✅ Agora temos",
      totalSupply.displayValue,
      "$PREN em circulação"
    )
  } catch (error) {
    console.error("Falha ao imprimir o dinheiro", error)
  }
})()
