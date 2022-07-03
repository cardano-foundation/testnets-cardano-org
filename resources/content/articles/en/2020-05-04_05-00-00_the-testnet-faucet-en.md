---
parent: 2020-05-04_05-00-00_about
title: The testnet faucet
description: Shelley Haskell about
order: 6
last_updated: 2020-07-29T08:00:00.000Z
---
## The Cardano testnet faucet

Since the Cardano testnet is an independent network, separate from the Cardano mainnet, it requires its own tokens.

The faucet is a web-based service that provides free tokens to users of the testnet who are running a stake pool or other node. The tokens enable users to experiment with Cardano features without spending ada cryptocurrency on the mainnet.

You will need some initial funds to start testing stake pools and delegating stake on the testnet network. The [faucet component](https://developers.cardano.org/en/testnets/cardano/tools/faucet/) will provide you with the tokens required to get started.

We have applied an initial daily faucet limit of 1000 test ada a day for each testnet user to ensure everyone has access to funds.

When you have finished using your test tokens, please return them to the faucet so that other members of the community can use them. Please return your test tokens to this address: 
`addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3`

If you have an API key and prefer to use the cli, you can use the following command:

```bash
curl -v -XPOST "https://faucet.cardano-testnet.iohkdev.io/send-money/$YOURADDRESS?apiKey=$APIKEY"
```
