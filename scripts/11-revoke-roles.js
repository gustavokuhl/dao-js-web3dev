import sdk from "./1-initialize-sdk.js"

const ERC_20_CONTRACT_ADDRESS = "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603"

;(async () => {
  try {
    const token = await sdk.getToken(ERC_20_CONTRACT_ADDRESS, "token")
    const allRoles = token.roles

    console.log(
      "👀 Papeis que existem agora:",
      await allRoles.getAll(allRoles.roles)
    )

    await allRoles.setAll({ admin: [], minter: [] })
    console.log(
      "🎉 Papeis depois de remover nós mesmos",
      await allRoles.getAll(allRoles.roles)
    )
    console.log("✅ Revogados nossos super-poderes sobre os tokens ERC-20")
  } catch (error) {
    console.error(
      "Falha ao remover nossos direitos sobre o tesouro da DAO",
      error
    )
  }
})()
