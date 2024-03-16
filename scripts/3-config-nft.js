import sdk from "./1-initialize-sdk.js"
import { readFileSync } from "fs"
;(async () => {
  try {
    const editionDrop = await sdk.getContract(
      "0xA9f4136be8c64fD799b405f5880B07116cc3D076",
      "edition-drop"
    )
    await editionDrop.createBatch([
      {
        name: "Super Prensado",
        description: "Esse NFT vai te dar acesso ao PrensaDAO!",
        image: readFileSync("scripts/assets/prensado2.png"),
      },
    ])
    console.log("✅ Novo NFT criado com sucesso!")
  } catch (error) {
    console.error("falha ao criar o novo NFT", error)
  }
})()
