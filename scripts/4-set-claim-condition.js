import sdk from "./1-initialize-sdk.js"
import { MaxUint256 } from "@ethersproject/constants"
;(async () => {
  try {
    const editionDrop = await sdk.getContract(
      "0xA9f4136be8c64fD799b405f5880B07116cc3D076",
      "edition-drop"
    )
    const claimConditions = [
      {
        startTime: new Date(),
        maxQuantity: 50_000,
        price: 0,
        quantityLimitPerTransaction: 1,
        waitInSeconds: MaxUint256,
      },
    ]

    await editionDrop.claimConditions.set("0", claimConditions)
    console.log("✅ Condições de reinvidicação configuradas com sucesso!")
  } catch (error) {
    console.error("Falha ao definir condições de reinvidicação", error)
  }
})()
