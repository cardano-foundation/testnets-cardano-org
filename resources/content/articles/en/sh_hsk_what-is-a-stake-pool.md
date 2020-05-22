---
title: What is a stake pool?
description: About
parent: 2020-05-04_05-00-00_about-en.md
order: 2
last_updated: "2020-05-22T09:00:00+01:00"
---
## What is a stake pool?

A stake pool is a reliable block-producing server node that holds the combined stake of various stakeholders in a single entity (it pools the stake that has been delegated to it). Stake pools are responsible for processing transactions and producing new blocks and are at the core of Ouroboros, the Cardano proof-of-stake protocol.

To be secure, Ouroboros requires a good number of ada holders to be online and maintain sufficiently good network connectivity at any given time. This is why Ouroboros relies on stake pools, entities committed to run the protocol 24/7, on behalf of the contributing ada holders.  In return, pool owners and participating ada holders will earn rewards.

Each stake pool can have one or more owners who are determined early on before the pool is registered. Owners can pledge to the pool, using either some or all of their own stake, to make it more attractive to other delegators, though this is not required. Separately, a stake pool operator is assigned responsibility for setting up and keeping the stake pool running. First, the stake pool operator sets up a stake pool node, which is a Haskell node that has been configured to produce and validate blocks from the Cardano blockchain.
Once a stake pool is set up and ready for use, it must be registered on the blockchain. All stake pools must be registered and registration information is recorded on-chain. The stake pool owners may also choose to register the pool with one or more stake pool registries. These registries are maintained off-chain and are used to compile lists that distinguish stake pools within the Daedalus wallet interface and other tools and web sites. However, it is important to note that being part of a registry is not mandatory, and anyone with enough ada to pay the transaction fee can set up a stake pool, even if they are not listed in any registry. Ada holders may also choose to subscribe to the registries of their choice, or to no registry at all.  An ada holder can then go to Daedalus and select the stake pool to which they want to delegate their stake, in the Delegation tab. That delegation action is recorded on the Cardano blockchain and assuming it is recorded sufficiently early in the epoch, may influence the slot leader selection process in the next epoch and beyond.
