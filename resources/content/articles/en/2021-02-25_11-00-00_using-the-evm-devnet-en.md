---
title: Using the EVM devnet
description: EVM getting started
parent: 2021-02-25_11-00-00_getting-started
order: 1
last_updated: "2021-02-25T09:00:00+01:00"

---
## Using the EVM devnet

To get up and running, you need to install Mallet and start compiling your smart contracts. Then you can start experimenting and identify any issues with your smart contracts.

### Known issues

There currently are three known issues:

- Only supports up to EVM version `Byzantium`. Therefore, Solidity compiler 0.5.1 is recommended.
- RPC `eth_logs` does not return any logs.
- `eth_getWork` is not returning expected values.
