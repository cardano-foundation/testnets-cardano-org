---
title: Modelling financial products in Marlowe
description: Marlowe getting started
order: 1
parent: 2020-05-04_08-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/marlowe/get-started/
    type: "301"
  - from: /en/marlowe/get-started/modeling-financial-products-in-marlowe/
    type: "301"
---
## Modelling financial products in Marlowe

Marlowe is a domain-specific language (DSL), designed to create the building blocks of financial contracts: payments to and from participants (we call the latter 'deposits'), choices by participants, and real world information. Marlowe contracts can branch based on alternatives and have a finite lifetime, at the end of which any remaining money is returned to the participants. This feature means that money cannot be forever locked in a contract. We have implemented a selection of contracts from the [ACTUS](https://www.actusfrf.org) standard.

The [Marlowe Playground](https://alpha.marlowe.iohkdev.io) is an environment where you can simulate the action of a Marlowe contract before running it on the blockchain. You can see how the contract evolves as participants interact with it, setting choices and making deposits of currency, for example. The playground allows 'undo' actions, so you can try other paths through the contract. Also, you can perform a 'static analysis' that will tell you whether all payments that your contract mandates will be made in full: if not, it will display an example of how a payment can fail. The playground has resources for authoring contracts in both Marlowe and Haskell, all in a no-code visual environment.
