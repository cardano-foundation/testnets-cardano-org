---
title: KEVM testnet support
description: KEVM about
parent: 2020-05-04_11-00-00_about
order: 2
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/kevm/about/kevm-testnet-support/
    type: "301"
---
## KEVM testnet support

The KEVM testnet is based on the K framework, a system for specifying languages and virtual machines and then deriving tools for these languages such as interpreters, type checkers, equivalence checkers, and debuggers.  It can be used to create both static and dynamic analysis tools.

[KEVM](https://github.com/kframework/evm-semantics/blob/master/README.md) is a specification of the EVM (Etherium Virtual Machine) in K.

KEVM is also an interpreter for EVM, automatically derived from the KEVM specification. You could say that the K specification of EVM is the “source code” for the interpreter. But it is much more than that. KEVM can be used to prove that smart contracts are correct. This is done by specifying a contract’s desired properties in K, combining the contract with the KEVM specification, and then using the [K framework](https://runtimeverification.com/blog/k-framework-an-overview/) to verify those properties. KEVM can be used to check for errors such as integer over and under flows, stack over and under flows, out-of-gas, and other contract generic properties. You can also verify more targeted properties for specific contracts.

When you run a smart contract on the testnet using the testnet wallet, the testnet will send the contract to the KEVM interpreter to be executed. This interpreter is the only part of the testnet that is based on the K framework. But because the interpreter is generated from the K specification, you can use K (and KEVM) to verify your smart contracts before you send them to the testnet. In this sense, testnet is related to the entire K framework.
