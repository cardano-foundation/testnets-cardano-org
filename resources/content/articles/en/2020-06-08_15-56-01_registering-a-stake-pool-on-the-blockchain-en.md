---
parent: 2020-05-05_12-27-39_get-started
title: Registering a stake pool on the blockchain
description: Registering a stake pool on the blockchain
order: 5
external_href: ""
last_updated: 2020-06-08T16:41:44+01:00
---
An account needs to have a stake pool registration certificate before it can participate in stake delegation between stake pools. This cryptographically-signed certificate contains details such as pool owner information, the hash of the pool operator’s verification key and VRF key, pledge details, the associated reward account, pool relay nodes, and the hash of the pool metadata. 

The registration certificate transfers staking rights from one staking key to another. The certificate contains the staking-key of the pool leader and is sent to the blockchain to register the stake pool with the other participants of the blockchain. 

To make sure that you can delegate your stake to one or more pools, you need to register your stake key in the blockchain using the CLI:

```cardano-cli shelley stake-address registration-certificate \
     --staking-verification-key-file stake.vkey \
     --out-file stake.cert```

Once the certificate has been created, you must include it in a transaction to post it to the blockchain. First, you need to calculate the fees needed for this transaction. The transaction will have to be signed by both the payment signing key (corresponding to the UTXO used to pay the fees), and by the stake signing key, as illustrated in this example:
```cardano-cli shelley transaction calculate-min-fee \
     --tx-in-count 1 \
     --tx-out-count 1 \
     --ttl 200000 \
     --testnet-<name> \
     --signing-key-file payment.skey \
     --signing-key-file stake.skey \
     --certificate-file stake.cert \
     --protocol-params-file protocol.json

 > 171485
In addition to paying fees for this transaction, you also need to include a deposit. This deposit is refundable and you will get it back when you deregister the key. The deposit amount can be found in the protocol.json under key keyDeposit:
...
 "keyDeposit": 400000,
 …
Next, you need to create the raw transaction, for example:
cardano-cli shelley transaction build-raw \
     --tx-in <the utxo used for paying fees and deposit> \
     --tx-out $(cat payment.addr)+999428515 \
     --ttl 200000 \
     --fee 171485 \
     --out-file tx.raw \
     --certificate-file stake.cert

Finally, you sign and submit the transaction to complete the process. 
How to create a registration certificate:
You can use create a registration certificate, as follows:

cardano-cli shelley stake-pool registration-certificate \
     --stake-pool-verification-key-file node.vkey \ 
     --vrf-verification-key-file vrf.vkey \
     --pool-pledge 100000000000 \
     --pool-cost 10000000000 \
     --pool-margin 0.01 \
     --reward-account-verification-key-file staking.vkey \
     --pool-owner-staking-verification-key staking.vkey \
     --out-file pool.cert
Where the pledge to the pool is 100000000000 lovelace, and the cost of operating the pool is set to 100000000000 lovelace.

A delegation certificate is published on the blockchain, therefore transaction fees apply. When you are creating a stake pool, you need to generate a registration certificate and embed it in a special transaction that creates the stake pool.  

Once the certificate is registered on the blockchain a node ID is assigned to the stake pool. 
