import sdk from "./1-initialize-sdk.js"
;(async () => {
  try {
    // Contrato ERC-1155
    const editionDrop = await sdk.getContract(
      "0xA9f4136be8c64fD799b405f5880B07116cc3D076",
      "edition-drop"
    )
    // Contrato ERC-20
    const token = await sdk.getContract(
      "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603",
      "token"
    )

    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0)

    if (walletAddresses.length === 0) {
      console.log(
        "Ninguém mintou o NFT ainda, peça para alguns amigos fazerem isso e ganhar um NFT de graça!"
      )
      process.exit(0)
    }

    const airdropTargets = walletAddresses.map((address) => {
      // Escolha um # aleatório entre 1000 e 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
      console.log("✅ Vai enviar", randomAmount, "tokens para ", address)
      return {
        toAddress: address,
        amount: randomAmount,
      }
    })

    console.log("🌈 Começando o airdrop...")

    await token.transferBatch(airdropTargets)
    console.log("✅ Feito o airdrop de tokens para todos os donos de NFT!")
  } catch (err) {
    console.error("O airdrop de tokens falhou", err)
  }
})()
