import sdk from "./1-initialize-sdk.js"
;(async () => {
  try {
    // Contrato de governança
    const vote = await sdk.getContract(
      "0x804eF932eae86F18917218D481012C2642dc26CD",
      "vote"
    )
    // Contrato ERC-20
    const token = await sdk.getContract(
      "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603",
      "token"
    )

    await token.roles.grant("minter", vote.getAddress())

    console.log(
      "✅ Módulo de votos recebeu permissão de manipular os tokens com sucesso"
    )
  } catch (error) {
    console.error("falha ao dar acesso aos tokens ao módulo de votos", error)
    process.exit(1)
  }

  try {
    // Contrato de governança
    const vote = await sdk.getContract(
      "0x804eF932eae86F18917218D481012C2642dc26CD",
      "vote"
    )
    // Contrato ERC-20
    const token = await sdk.getContract(
      "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603",
      "token"
    )

    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS)

    const ownedAmount = ownedTokenBalance.displayValue
    const percent90 = (Number(ownedAmount) / 100) * 90

    await token.transfer(vote.getAddress(), percent90)

    console.log(
      "✅ Transferiu " +
        percent90 +
        " tokens para o módulo de votos com sucesso"
    )
  } catch (err) {
    console.error("falhar ao transferir tokens ao módulo de votos", err)
  }
})()
