---
title: Testing transactions
description: Shelley getting started
order: 9
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/testing-transactions/
    type: "301"
---
## Testing transactions

We encourage you to try out various configurations and scenarios so 
that we can assess the patterns that occur and how the nodes react. 
The first thing you will want to do is to test how to send money between
accounts. You can use the JCLI to build a transaction, encode it, and 
send it to a particular node.

Before you build a transaction you will need to have the following information:

- The input transaction hash: this is usually the UTXO that is 
currently stored in a node. It is crucial to store the private key of 
the address that held the initial funds (as stored in genesis.yaml), 
because you will need it when building a transaction.
- To get this, you can use the JCLI and this command: 
  `jcli rest v0 utxo get --host http://127.0.0.1:8443/api`
- The receiver address: any valid UTXO address you generated in previous steps.
- The sender address: any valid UTXO address you generated in previous steps.
- Transaction witness private key: in the simplest scenario, it is the private key of the transaction sender.

To check the status of a transaction and verify that it has been added to a block, or was rejected, use this command: 
`jcli rest v0 message logs -h http://127.0.0.1:8443/api`

As part of your testing you will want to check the address balances and verify that the balances were updated. First, ensure that you have waited the minimum slot duration, as specified in the slot duration parameter of the genesis.yaml configuration file, then use this command: 
`jcli rest v0 utxo get --host http://127.0.0.1:8443/api`

Please refer to more in-depth documentation [here](https://input-output-hk.github.io/jormungandr/jcli/transaction.html).

You may want to try out new blockchain settings or need to restart a 
clean blockchain for testing purposes. In this case, you need to delete 
the storage file that you specified in the node configuration. 
Otherwise, the blockchain and storage will not have the correct state.
