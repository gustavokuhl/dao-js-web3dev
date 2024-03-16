import sdk from "./1-initialize-sdk.js"

/**
  0 - Pending: Aguardando aprovação ou início.
  1 - Active: Em andamento ou em processo de votação.
  2 - Canceled: Cancelado e não será mais considerado.
  3 - Defeated: A proposta foi rejeitada pela maioria dos votantes.
  4 - Succeeded: A proposta foi aprovada pela maioria dos votantes
  5 - Queued: Na fila para ser processado ou executado.
  6 - Expired: O prazo para a ação ou votação terminou.
  7 - Executed: A ação ou proposta foi realizada com sucesso.
 */

const VOTE_CONTRACT_ADDRESS = "0x804eF932eae86F18917218D481012C2642dc26CD"

;(async () => {
  try {
    const vote = await sdk.getContract(VOTE_CONTRACT_ADDRESS, "vote")

    const allProposals = await vote.getAll()
    console.log(`Total de propostas: `, allProposals)

    // Pegar o ID da proposta, e só depois executar
    // const proposalId = allProposals[1].proposalId
    // console.log("Proposal Executed: ", await vote.execute(proposalId))
  } catch (error) {
    console.error("Falha ao listar propostas:", error)
    process.exit(1)
  }
})()
