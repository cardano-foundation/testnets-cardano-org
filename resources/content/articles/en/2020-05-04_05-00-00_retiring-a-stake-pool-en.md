---
parent: 2020-05-04_05-00-00_configuration
title: Retiring a stake pool
description: Shelley configuration
order: 3
last_updated: 2020-06-12T11:34:32+01:00
redirects:
  - from: /en/shelley-haskell/configuration/retiring-a-stake-pool/
    type: 301
---
## Retiring a stake pool

<!--StartFragment-->

Stake pools might cease to operate for a number of reasons. Any stake pools no longer in use should be retired, so they do not appear as an option for delegators.



If you need to retire a stake pool, you must first determine the epoch within which the pool will be retired, create a de-registration certificate, then attach this certificate to a transaction, and finally submit the transaction to the blockchain. The transaction needs to be signed with the operator’s cold key.



To retire a stake pool, follow these steps:

1. Determine the epoch when the stake pool is to be retired, which must beafterthe current epoch, butno later than eMaxepochs in the future (eMax is a protocol parameter).
2. Use this code to identify the current epoch. The number of slots per epoch is recorded in the genesis file. In this example, the epoch lasts 21600 slots.

```
cat ff-genesis.json | grep epoch
\> "epochLength": 21600,
```

3. Query the epoch's tip to determine the current slot:

```
export CARDANO_NODE_SOCKET_PATH=relay-db/node-socket
cardano-cli shelley query tip --testnet-magic 42
\> Tip (SlotNo {unSlotNo = 856232}) ...
expr 856232 / 21600
\>39
```

The current epoch is 39, which means that the earliest epoch to retire the pool in will be 40.

4. Identify the value of eMax by querying the protocol parameters:

```
cardano-cli shelley query protocol-parameters \
\--testnet-magic 42 \
\--out-file params.json
cat params.json | grep eMax
\>"eMax": 100,
```

In this example, the eMax value is 100, which means that the latest epoch in which the pool can be retired is 139 (the current epoch -39-, plus eMax -100-).

5. Create a de-registration certificate and save it as pool.dereg (or any other name.)



```
cardano-cli shelley stake-pool deregistration-certificate \
\--cold-verification-key-file node.vkey \
\--epoch 41 \
\--out-filepool.dereg
```

6. Create a transaction that contains the de-registration certificate and calculates the fees:

```
cardano-cli shelley transaction calculate-min-fee \
\--tx-in-count 1 \
\--tx-out-count 1 \
\--ttl 860000 \
\--testnet-magic 42 \
\--signing-key-file pay.skey \
\--signing-key-file node.skey \
\--certificate pool.dereg \
\--protocol-params-file params.json
\> 171309
```

7. Query the address that you want to use the pay the transaction fees from, calculate the UTXO to use as input, and calculate the change:

```
cardano-cli shelley query utxo \
\--address $(cat pay) \
\--testnet-magic 42
TxHash TxIx Lovelace

\------------------------------------------------

9db6cf... 0 999999267766
expr 999999267766 - 171309
\> 999999096457
```

8. Build the raw transaction:

```
cardano-cli shelley transaction build-raw \
\--tx-in 9db6cf...#0 \
\--tx-out $(cat pay)+999999096457 \
\--ttl 860000 \
\--fee 171309 \
\--out-file tx.raw \
\--certificate-file pool.dereg
```

9. Sign the transaction with both the payment signing key and the cold signing key:

```
cardano-cli shelley transaction sign \
\--tx-body-file tx.raw \
\--signing-key-file pay.skey \
\--signing-key-file node.skey \
\--testnet-magic 42 \
\--out-file tx.signed
```

10. Submit the signed transaction to the blockchain:

    ```
    cardano-cli shelley transaction submit \
    \--tx-file tx.signed \
    \--testnet-magic 42
    ```

The pool will be retired at epoch 40.



<!--EndFragment-->