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

    {
    "name": "TestPool",
    "description": "The pool that tests all the pools",
    "ticker": "TEST",
    "homepage": "https://teststakepool.com"
    }

This data needs to be hosted by the pool operator at a URL that they maintain (their personal website, a github raw gist file, etc, for example "[https://gist.githubusercontent.com/testPool/.../testPool.json](https://gist.githubusercontent.com/CarlosLopezDeLara/894990b1ed0a585edf6641868c1ac48d/raw/79fcb39d1788716bbfb5f1084b04438320513132/testPool.json). The URL must be no more than 64 bytes long.


2. Register or re-register the pool on-chain using the node CLI as described in the tutorials (Stake Pool Registration).  Provide all the necessary metadata in the registration, including the relay information, the URL for the metadata file and metadata hash, as well as the cost parameters.  

```shell
cardano-cli shelley stake-pool registration-certificate \
--cold-verification-key-file FILE                       
--vrf-verification-key-file FILE     
--pool-pledge LOVELACE               
--pool-cost LOVELACE                 
--pool-margin DOUBLE                 
--pool-reward-account-verification-key-file FILE       
--pool-owner-stake-verification-key-file FILE
--pool-relay-port INT   
--pool-relay-ipv4 STRING
--pool-relay-ipv6 STRING
--pool-relay-port INT   
--single-host-pool-relay STRING
--pool-relay-port INT   
--multi-host-pool-relay STRING
--metadata-url URL       
--metadata-hash HASH     
--mainnet                
--testnet-magic NATURAL  
--out-file FILE         
```
Build, sign and submit the transaction:

```shell
cardano-cli shelley transaction build-raw \
--tx-in TxId#TxIx
--tx-out TxOut+Lovelace            
--ttl SLOT                   
--fee LOVELACE              
--certificate-file FILE      
--withdrawal WITHDRAWAL      
--metadata-file FILE         
--update-proposal-file FILE  
--out-file FILE              
```
3. Obtain the pool id using the node CLI.
```shell
cardano-cli shelley stake-pool id --verification-key-file pool.vkey
> <poolid>
```

You can check whether the on-chain registration has succeeded by running:

```shell
cardano-cli shelley query ledger-state --testnet-magic 42 \
| jq '._delegationState._pstate._pParams.<poolid>'
```
