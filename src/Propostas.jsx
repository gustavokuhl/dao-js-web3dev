import { useAddress, useContract } from "@thirdweb-dev/react"
import { AddressZero } from "@ethersproject/constants"
import { useEffect, useState } from "react"
import { ERC_20_CONTRACT_ADDRESS, VOTE_CONTRACT_ADDRESS } from "./constants"

function Propostas({ hasClaimedNFT }) {
  const address = useAddress()
  const { contract: token } = useContract(ERC_20_CONTRACT_ADDRESS, "token")

  const [proposals, setProposals] = useState([])
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  const { contract: vote } = useContract(VOTE_CONTRACT_ADDRESS, "vote")

  useEffect(() => {
    if (!hasClaimedNFT) {
      return
    }
    // Uma chamada simples para vote.getAll() para pegar as propostas.
    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll()
        setProposals(proposals)
        console.log("🌈 Propostas:", proposals)
      } catch (error) {
        console.log("falha ao buscar propostas", error)
      }
    }
    getAllProposals()
  }, [hasClaimedNFT, vote])

  // Nós também precisamos checar se o usuário já votou.
  useEffect(() => {
    if (!hasClaimedNFT || !proposals.length) {
      return
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address)
        setHasVoted(hasVoted)
        if (hasVoted) {
          console.log("🥵 Usuário já votou")
        } else {
          console.log("🙂 Usuário ainda não votou")
        }
      } catch (error) {
        console.error("Falha ao verificar se carteira já votou", error)
      }
    }
    checkIfUserHasVoted()
  }, [hasClaimedNFT, proposals, address, vote])

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-medium mb-4">Propostas</h2>
      <form
        className="flex flex-col gap-2 w-[600px]"
        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()

          setIsVoting(true)

          const votes = proposals.map((proposal) => {
            const voteResult = {
              proposalId: proposal.proposalId,
              vote: 2, // DEFAULT = abstenção
            }
            proposal.votes.forEach((vote) => {
              const elem = document.getElementById(
                proposal.proposalId + "-" + vote.type
              )

              if (elem.checked) {
                voteResult.vote = vote.type
                return
              }
            })
            return voteResult
          })

          try {
            const delegation = await token.getDelegationOf(address)
            if (delegation === AddressZero) {
              await token.delegateTo(address)
            }

            try {
              await Promise.all(
                votes.map(async ({ proposalId, vote: _vote }) => {
                  const proposal = await vote.get(proposalId)
                  if (proposal.state === 1) {
                    // Aberta
                    return vote.vote(proposalId, _vote)
                  }
                  return
                })
              )

              try {
                await Promise.all(
                  votes.map(async ({ proposalId }) => {
                    const proposal = await vote.get(proposalId)
                    if (proposal.state === 4) {
                      // Pronta para executar
                      return vote.execute(proposalId)
                    }
                  })
                )
                setHasVoted(true)
                console.log("votado com sucesso")
              } catch (err) {
                console.error("falha ao executar votos", err)
              }
            } catch (err) {
              console.error("falha ao votar", err)
            }
          } catch (err) {
            console.error("falha ao delegar tokens")
          } finally {
            setIsVoting(false)
          }
        }}
      >
        {proposals.map((proposal) => (
          <div
            key={proposal.proposalId}
            className="card bg-white border border-gray-200 rounded-lg p-4"
          >
            <h5 className="mb-4 text-center">{proposal.description}</h5>
            <div className="flex justify-between mx-8">
              {proposal.votes.map(({ type, label }) => {
                const translations = {
                  Against: "Contra",
                  For: "A favor",
                  Abstain: "Abstenção",
                }
                return (
                  <div key={type}>
                    <input
                      className="mr-2"
                      type="radio"
                      id={proposal.proposalId + "-" + type}
                      name={proposal.proposalId}
                      value={type}
                      defaultChecked={type === 2} // Abster
                    />
                    <label htmlFor={proposal.proposalId + "-" + type}>
                      {translations[label]}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <button
          className="inline-flex justify-center items-center bg-slate-900 text-white rounded-lg p-2"
          disabled={isVoting || hasVoted}
          type="submit"
        >
          {isVoting
            ? "Votando..."
            : hasVoted
              ? "Você já votou"
              : "Submeter votos"}
        </button>
        {!hasVoted && (
          <small className="mx-auto">
            Isso irá submeter várias transações que você precisará assinar.
          </small>
        )}
      </form>
    </div>
  )
}

export default Propostas
