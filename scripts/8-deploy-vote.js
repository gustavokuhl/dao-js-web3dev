import sdk from "./1-initialize-sdk.js"

;(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "PrensaDAO - A DAO dos maconheiros malucos",
      voting_token_address: "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603",
      voting_delay_in_blocks: 0,
      voting_period_in_blocks: 6570, // 1 dia
      voting_quorum_fraction: 0,
      proposal_token_threshold: 1,
    })

    console.log(
      "✅ Módulo de votos implantado com sucesso no endereço:",
      voteContractAddress
    )
  } catch (err) {
    console.error("Falha ao implantar o módulo de votos", err)
  }
})()
