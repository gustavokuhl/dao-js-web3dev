import sdk from "./1-initialize-sdk.js"
import { ethers } from "ethers"

const ERC_20_CONTRACT_ADDRESS = "0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603"
const VOTE_CONTRACT_ADDRESS = "0x804eF932eae86F18917218D481012C2642dc26CD"

;(async () => {
  try {
    const vote = await sdk.getContract(VOTE_CONTRACT_ADDRESS, "vote")
    const token = await sdk.getContract(ERC_20_CONTRACT_ADDRESS, "token")

    const amount = 420_000
    const description =
      "Cunhar para a DAO uma quantidade adicional de " +
      amount +
      " tokens no tesouro?"

    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0, // ETH
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ]

    await vote.propose(description, executions)
    console.log("✅ Proposta de cunhar tokens criada com sucesso!")
  } catch (error) {
    console.error("falha ao criar primeira proposta", error)
    process.exit(1)
  }

  try {
    const vote = await sdk.getContract(VOTE_CONTRACT_ADDRESS, "vote")
    const token = await sdk.getContract(ERC_20_CONTRACT_ADDRESS, "token")

    const amount = 6_900
    const description =
      "A DAO deveria transferir " +
      amount +
      " tokens do tesouro para " +
      process.env.WALLET_ADDRESS +
      " por ser uma pessoa incrível?"

    const executions = [
      {
        nativeTokenValue: 0, // ETH
        transactionData: token.encoder.encode("transfer", [
          process.env.WALLET_ADDRESS,
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),

        toAddress: token.getAddress(),
      },
    ]

    await vote.propose(description, executions)
    console.log(
      "✅ Proposta de dar prêmio do tesouro para si mesmo criada com sucesso, vamos torcer para votarem sim!"
    )
  } catch (error) {
    console.error("falha ao criar segunda proposta", error)
  }
})()
