---
title: Testnet skill set
description: KEVM about
parent: 2020-05-04_11-00-00_about
order: 1
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/kevm/about/
    type: "301"
  - from: /en/kevm/about/testnet-skill-set/
    type: "301"
---
## Testnet skill set

To use the KEVM and IELE testnets the following skills are required:

- Familiarity with writing smart contracts in Solidity. You will need a suite of well-defined smart contracts to use on the testnets.
- Advanced knowledge of the JSON remote procedure call (RPC) protocol.

No registration is required to use the testnet.

Before you can run your smart contracts on the testnets, you will need to collect test tokens from the [faucet](/en/more/kevm/tools/faucet/).

The following are also requirements:

### For the KEVM testnet:

- A Java Virtual Machine (JVM) is needed to run the client. The version must be 1.8.x. The client has not been tested with JVM 1.9.
- 64 bit output.
- Appropriate disk space: enough space will be needed for the blockchain to grow. An SSD of at least 35G is recommended.
- The Mantis client has been tested extensively on Ethereum Classic 
small instances with 2G of RAM. This is sufficient to run the client and the miner.

### For the IELE testnet:

- A Java Virtual Machine (JVM) is needed to build the client, as with the KEVM testnet. The version must be 1.8.x. The client has not been tested with JVM 1.9.
- 230 disk space and 10MB of RAM are recommended.
