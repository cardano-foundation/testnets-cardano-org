---
title: Understanding the delegation mechanism
description: About
parent: 2020-05-04_05-00-00_about
order: 3
last_updated: "2020-05-22T09:00:00+01:00"
---
## Understanding the delegation mechanism

As Cardano is a proof-of-stake system, owning ada, or holding stake, not only allows you to buy goods or services, but also confers upon you the right and obligation to participate in the protocol and create blocks.

These two uses can be separated by the delegation mechanism, meaning someone who owns ada can keep the spending power, while delegating the power to participate in the protocol to someone else, a stake pool. It is important to note that funds can be spent normally at any time, regardless of how they are delegated.

For a pool to remain competitive, it needs to have a significant amount of stake delegated to it. Otherwise the node will run idle and never, or very seldom, create blocks.

Delegating a stake pool requires the creation of a delegation certificate, which might look like this:

`cardano-cli shelley stake-address delegation-certificate \
     --staking-verification-key-file stake.vkey \
     --stake-pool-verification-key-file node.vkey \
     --out-file delegation.cert`

This particular certificate delegates funds from all stake addresses associated with key stake.vkey to the pool belonging to node.vkey.
