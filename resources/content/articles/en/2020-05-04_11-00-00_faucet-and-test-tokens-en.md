---
title: Faucet and test tokens
description: KEVM getting started
parent: 2020-05-04_11-00-00_getting-started
order: 3
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/kevm/get-started/faucet-and-test-tokens/
    type: "301"
---
## Faucet and test tokens

The faucet is a means of providing test tokens to users so that they can run their smart contracts on the KEVM and IELE testnets.

By using the faucet, users can request test tokens that are automatically supplied to them without assistance from developers. 

>Disclaimer: *Do not* try to use real cryptocurrency on the testnets. You should take care to ensure that you only use test tokens when running your smart contracts, and these are obtained through the faucet. Instructions on how to receive test tokens are below.

### How to access the devnet faucet from Mallet

The preferred way to access the faucet is directly from Mallet.
Run the `requestFunds` command in Mallet to request test tokens. 

The following outcomes are possible:

* A success response is returned with the transaction ID and funds are routed to the account. The status of the transaction can be monitored using the block explorer.
* System returns a Type 429 error message. This occurs if you have exceeded the amount of requests from a single IP address. Wait a few minutes before attempting to request funds again.
* System returns a Type 500 error message. This normally indicates a problem with the faucet server. Wait a few minutes before attempting to request funds again.

For more information, please check [requestFunds](https://github.com/input-output-hk/mallet/blob/master/README.md#requestfunds) documentation.
