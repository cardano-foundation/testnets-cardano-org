---
parent: 2020-05-04_04-00-00_registering-a-stake-pool-on-the-blockchain
title: How do I re-register/change metadata
description: How do I re-register/change metadata
order: 1
external_href: ""
last_updated: 2020-06-16T09:54:33+01:00
---
Stake pool operators might have to update the registration of their pools from time to time. Operators might want to  increase costs or margins, or change keys, for example. Updating stake pool parameters requires the creation of a new registration certificate and submitting this new certificate to the blockchain.

To update the registration of a stake pool, follow these steps: 

1. Create a new registration certificate.

   In this example, the pool’s pledge is updated, the cost to 15,000 ada, and the margin to 20%, All this data is written to a new registration certificate (pool1.cert).

   ```
   1. cardano-cli shelley stake-pool registration-certificate \
          --cold-verification-key-file node1.vkey \
          --vrf-verification-key-file vrf1.vkey \
          --pool-pledge 900000000000 \
          --pool-cost 15000000000 \
          --pool-margin 0.20 \
          --pool-reward-account-verification-key-file stake2.vkey \
          --pool-owner-stake-verification-key-file stake1.vkey \
          --out-file pool1.cert
   ```
2. Submit the new certificate to the blockchain

The new certificate (pool1.cert in this case) has to be submitted to the blockchain by including it in a transaction, so the updated registration will take effect. See the Registering a stake pool on the blockchain section for information about submitting a certificate to the blockchain.

Note: You do not have to pay the stake pool registration deposit again. Costs are only incurred by the transaction fees needed for the transaction that includes the new registration certificate.