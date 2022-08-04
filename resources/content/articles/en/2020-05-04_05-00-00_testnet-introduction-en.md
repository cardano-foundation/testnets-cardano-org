---
parent: 2020-05-04_05-00-00_about
title: Vasil testnet introduction
description: Vasil about
order: 1
last_updated: 2020-05-01T08:00:00.000Z
redirects:
  - from: /en/shelley-haskell/about/testnet-introduction/
    type: "301"
---

>Note: A new dedicated pre-production environment has been freshly spun up for the final stages of testing Vasil functionality. This environment offers improved chain density and a better developer experience. 

> We recommend that all developers, SPOs, and exchanges use this environment rather than the main Cardano testnet. To join the pre-production environment for testing, update your [latest configurations here](https://book.world.dev.cardano.org/environments.html#pre-prod).

## About Vasil testnet

The Cardano testnet has now been upgraded to Vasil functionality and is now available for public functionality testing. 

Vasil enforces the next major upgrade to the Cardano protocol using [Cardano’s hard fork combinator (HFC) approach](https://docs.cardano.org/core-concepts/about-hard-forks). This upgrade is named after a much loved and respected Cardano community member, Vasil St Dabov.

Vasil brings changes that will improve [the handling of on-chain (Plutus) scripts](https://iohk.io/en/blog/posts/2022/04/13/boosting-cardano-s-throughput-with-script-referencing/), reducing user costs and allowing [greater script throughput](https://iohk.io/en/blog/posts/2022/03/21/increasing-the-transaction-throughput-of-cardano/). Vasil changes form the first stages of a series of planned improvements that will be rolled out over time.

More specifically, this upgrade introduces:

-   Diffusion pipelining
-   Plutus V2 (new primitives, a tuned interpreter, and a new cost model)
-   New Plutus built-ins
-   Plutus reference inputs
-   Plutus inline datums
-   Plutus reference scripts
-   Collateral change address
-   Transaction redeemers changes
-   Single VRF implementation

To get started, make sure to:

* upgrade your [node configuration, topology, and genesis files](https://book.world.dev.cardano.org/environments.html)
* check [getting started tutorials](https://github.com/input-output-hk/cardano-node/tree/master/doc/getting-started)
* see [Vasil testnet tutorials](https://github.com/input-output-hk/Vasil-testnet)
* see [Babbage script examples](https://github.com/input-output-hk/cardano-node/tree/master/doc/reference/plutus)

Also, note that:

-  With the Vasil hard fork on mainnet, the *d* parameter will be removed since block production is now fully decentralized, and this will prevent re-federation.
-   If you are an SPO, you now need to create your operational certificate using cold.counter +1. The `OpCert` must be exactly one more than the previously used one.
-   The `minUTxO` formula is now calculated using original bytes instead of `lovelacePerUTxOWord`.
-   When installing the Cardano node, it is now essential to install the `secp256k1` library. See [node installation details here](https://github.com/input-output-hk/cardano-node/blob/master/doc/getting-started/install.md/).

**Feedback**

We welcome feedback on any issues you have encountered:
+ Via [Discord channels](https://discord.com/channels/826816523368005654/826816523964383263) for general questions or discussions.
+ Via the [Cardano node issue tracker](https://github.com/input-output-hk/cardano-node/issues) for any bugs or feature requests in the node. Please tag them as Vasil-related.
+ Via the [Plutus issue tracker](https://github.com/input-output-hk/plutus/issues) for any bugs or feature requests with Plutus.
+ Via [IOG technical support desk](https://iohk.zendesk.com/hc/en-us/categories/900000102203-Shelley-Testnet).

You can also join ['IO DEV announcements' Telegram channel](https://t.me/IOdevannouncements) to receive key development updates.
