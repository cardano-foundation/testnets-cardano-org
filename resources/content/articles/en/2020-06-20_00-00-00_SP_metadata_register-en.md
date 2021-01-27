---
parent: 2020-05-05_12-27-39_get-started
title: Registering stake pool metadata
description: How to register stake pool metadata
order: 4
external_href: ""
last_updated: 2020-06-20T00:00:00+00:00
---

## Register stake pool metadata

To register a stake pool metadata you need to:

1. Create a JSON file for your stake pool metadata and store it in your node, for ejample:

 `testPool.json`  

```shell
{
"name": "TestPool",
"description": "The pool that tests all the pools",
"ticker": "TEST",
"homepage": "https://teststakepool.com"
    }
```
Store the file in an url you control. For example [https://teststakepool.com/poolMetadata.json](https://git.io/JJWdJ) You can use a GIST in github, make sure that the URL is less than 65 characters long.

2. Get the hash of your file:
```shell
cardano-cli shelley stake-pool metadata-hash --pool-metadata-file testPool.json
>6bf124f217d0e5a0a8adb1dbd8540e1334280d49ab861127868339f43b3948af
```

3. Register or re-register the pool on-chain using the node CLI as described in the tutorials (Stake Pool Registration).  Provide all the necessary metadata in the registration, including the relay information, the URL for the metadata file and metadata hash, as well as the cost parameters.  

```shell
cardano-cli shelley stake-pool registration-certificate \
--cold-verification-key-file cold.vkey \
--vrf-verification-key-file vrf.vkey \
--pool-pledge <LOVELACE> \
--pool-cost <LOVELACE> \
--pool-margin <PERCENTAGE> \
--pool-reward-account-verification-key-file stake.vkey \
--pool-owner-stake-verification-key-file stake.vkey \
--testnet-magic 42 \
--pool-relay-port <PORT> \
--pool-relay-ipv4 <IP ADDRESS> \
--metadata-url http://testpool/pool1.json
--metadata-hash 6bf124f217d0e5a0a8adb1dbd8540e1334280d49ab861127868339f43b3948af \
--out-file node.cert        
```
Build, sign and submit the transaction:

```shell
cardano-cli shelley transaction build-raw \
--tx-in TxId#TxIx \
--tx-out $(cat payment.addr)+<LOVELACE> \
--ttl <SLOT> \
--fee <LOVELACE> \
--out-file tx.raw \
--certificate-file node.cert \
--certificate-file delegation.cert             
```

```shell
cardano-cli shelley transaction sign \
--tx-body-file tx.raw \
--signing-key-file payment.skey \
--signing-key-file payment.skey \
--signing-key-file cold.skey \
--testnet-magic 42 \
--out-file tx.signed
```

```shell
cardano-cli shelley transaction submit \
--tx-file tx.signed \
--testnet-magic 42
```
4. Obtain the pool id using the node CLI.

```shell
cardano-cli shelley stake-pool id --verification-key-file pool.vkey
> <poolid>
```
You can check whether the on-chain registration has succeeded by running:

```shell
cardano-cli shelley query ledger-state --testnet-magic 42 \
| jq '._delegationState._pstate._pParams.<poolid>'
```

5. Follow this [link](https://github.com/input-output-hk/cardano-node/blob/master/doc/stake-pool-operations/register_stakepool.md) to find the latest building instrcutions. 
