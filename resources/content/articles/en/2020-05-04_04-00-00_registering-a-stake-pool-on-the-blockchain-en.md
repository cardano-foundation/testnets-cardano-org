---
title: Registering a stake pool on the blockchain
description: Shelley getting started
order: 8
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/registering-a-stake-pool/
    type: 301
---
## Registering a stake pool on the blockchain

An account needs to have a stake pool certificate before it can participate in stake delegation between stake pools. This certificate is a cryptographically-signed piece of metadata in the blockchain that transfers staking rights from one staking key to another. The certificate contains the staking-key of the pool leader and is sent to the blockchain to register the stake pool with the other participants of the blockchain. A delegation certificate is published on the blockchain, therefore transaction fees apply. When you are creating a stake pool, you need to generate a registration certificate and embed it in a special transaction that creates the stake pool. Please refer to [these instructions](https://github.com/elviejo79/stake-pool-operator/blob/master/docs/stake_pool_operator_how_to.md) on how to register your stake pool on the blockchain.

Once the certificate is registered on the blockchain a node ID is assigned to the stake pool. The second stage of registration is to register your stake pool owner metadata with the Cardano Foundation, please refer to [Registering stake pools with the Cardano Foundation stake pool registry](/en/itn/getting-started/guide-for-stake-pool-operators/).
