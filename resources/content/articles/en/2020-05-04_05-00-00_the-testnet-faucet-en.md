---
parent: 2020-05-04_05-00-00_about
title: The testnet faucet
description: Shelley Haskell about
order: 3
last_updated: 2020-05-01T08:00:00.000Z
---
## The Shelley testnet faucet

Since the Shelley testnet is an independent network, separate from the Cardano mainnet, it requires its own tokens.

The faucet is a web-based service that provides free tokens to users of the testnet who are running a stake pool or other node. The tokens enable users to experiment with Cardano features without spending ada cryptocurrency on the mainnet.

You will need some initial funds to start testing stake pools and delegating stake on the testnet network. The [faucet component](/en/shelley/tools/faucet/) will provide you with the tokens required to get started.

When you have finished using your test tokens, please return them to the faucet so that other members of the community can use them. Please return your test tokens to this address: 
`615609ae508051b0251587ac43f816f6ee1e104057e1168032ba644e27bc1c7dc8`

If you prefer you can use the cli command: 

```bash
curl -v -XPOST "https://faucet.ff.dev.cardano.org/send-money/<YOURADDR>?apiKey=CGX2UGexU3CpSW1MMY0HitKVSrAiQuyR
```
