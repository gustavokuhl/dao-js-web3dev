# WEB3DEV x ThirdWeb - DAO usando Javascript

## **Bem vind@s 👋**

Para iniciar o front-end do projeto, clone o repo e siga esses comandos:

1. Rode `npm install` no diretório raiz
2. Rode `npm start` para iniciar o projeto

Para rodar os scripts, utilize o Node:

```bash
node scripts/1-initialize-sdk.js
```

## **Execuções de script**

### 1-initialize-sdk.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
```

### 2-deploy-drop.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Contrato editionDrop implantado com sucesso, endereço: 0xA9f4136be8c64fD799b405f5880B07116cc3D076
✅ bundleDrop metadados: {
  name: 'Membro da PrensaDAO',
  description: 'A DAO dos amantes de prensado',
  image: 'https://028f920f57f18e743e6dca4a3284ba1f.ipfscdn.io/ipfs/bafybeiehpctyueckhil4zxo7driuou6n7hwzgg4aqu755ivv3tc6m6qcya/0',
  app_uri: 'https://028f920f57f18e743e6dca4a3284ba1f.ipfscdn.io/ipfs/bafybeiagia2jgvodnsucbykhb5sftawhjkowfilvn2gstjze6cwtdbywtm/',
  seller_fee_basis_points: 0,
  fee_recipient: '0x0000000000000000000000000000000000000000',
  merkle: {},
  symbol: ''
}
```

### 3-config-nft.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Novo NFT criado com sucesso!
```

### 4-set-claim-condition.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Condições de reinvidicação configuradas com sucesso!
```

### React claim NFT

```
🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/base-sepolia/0xA9f4136be8c64fD799b405f5880B07116cc3D076/0
```

### 5-deploy-token.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Módulo de token implantado com sucesso. Endereço: 0x7324De0Bb0aAD8b1A86bA6fB5a334BB08D26c603
```

### 6-print-money.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Agora temos 1000000.0 $PREN em circulação
```

### 7-airdrop-token.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Vai enviar 2873 tokens para  0xaf83f96944ceda6052AB0B9F78adFEb7661A6Ed7
🌈 Começando o airdrop...
✅ Feito o airdrop de tokens para todos os donos de NFT!
```

### 8-deploy-vote.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Módulo de votos implantado com sucesso no endereço: 0x804eF932eae86F18917218D481012C2642dc26CD
```

### 9-setup-vote.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Módulo de votos recebeu permissão de manipular os tokens com sucesso
✅ Transferiu 897414.3 tokens para o módulo de votos com sucesso
```

### 10-create-vote-proposals.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
✅ Proposta de cunhar tokens criada com sucesso!
✅ Proposta de dar prêmio do tesouro para si mesmo criada com sucesso, vamos torcer para votarem sim!
```

### 11-revoke-roles.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
👀 Papeis que existem agora: {
  admin: [ '0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d' ],
  minter: [
    '0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d',
    '0x804eF932eae86F18917218D481012C2642dc26CD'
  ],
  transfer: [
    '0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d',
    '0x0000000000000000000000000000000000000000'
  ],
  metadata: []
}
🎉 Papeis depois de remover nós mesmos {
  admin: [],
  minter: [],
  transfer: [
    '0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d',
    '0x0000000000000000000000000000000000000000'
  ],
  metadata: []
}
✅ Revogados nossos super-poderes sobre os tokens ERC-20
```

### 12-executing-proposals.js

```
👋 SDK inicializado pelo endereço: 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d
Total de propostas:  [
  {
    proposalId: BigNumber {
      _hex: '0x2a02248ff6be33a5c82fbf0fead9a379080dc40ed75f52cb3ab8849682fabc20',
      _isBigNumber: true
    },
    proposer: '0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d',
    description: 'Cunhar para a DAO uma quantidade adicional de 420000 tokens no tesouro?',
    startBlock: BigNumber { _hex: '0x712282', _isBigNumber: true },
    endBlock: BigNumber { _hex: '0x713c2c', _isBigNumber: true },
    state: 1,
    votes: [ [Object], [Object], [Object] ],
    executions: [ [Object] ]
  },
  {
    proposalId: BigNumber {
      _hex: '0x41ce616d3af7563267c4d504bde5f6ee0bf9b843e9853cb1ce3479f8d4144dc4',
      _isBigNumber: true
    },
    proposer: '0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d',
    description: 'A DAO deveria transferir 6900 tokens do tesouro para 0x6ad1BB9DE62B004AEcdaB504F5C6Ec18f494D08d por ser uma pessoa incrível?',
    startBlock: BigNumber { _hex: '0x712285', _isBigNumber: true },
    endBlock: BigNumber { _hex: '0x713c2f', _isBigNumber: true },
    state: 1,
    votes: [ [Object], [Object], [Object] ],
    executions: [ [Object] ]
  }
]
```
