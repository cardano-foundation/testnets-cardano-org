---
parent: erc20-using-converter
title: Migrating tokens from Cardano to Ethereum
description: Migrating tokens from Cardano to Ethereum
order: 4
---

## Migrating tokens from Cardano to Ethereum

This process involves activities both in the converter and in the testnet Daedalus wallet.

### Stage 1: migrating tokens in the converter

1. To convert your migrated tokens from Cardano back to Ethereum, go to the token card and click ‘Select’.
2. You will see the conversion arrow, which indicates from which blockchain you are migrating your tokens. Switch the arrow to migrate tokens from Cardano to Ethereum:

![cardano-eth-migration](https://ucarecdn.com/6a650d91-d7ab-4599-832a-2c6eb0a84139/-/crop/1061x1066/41,24/-/preview/)

3. Indicate the amount of tokens you would like to migrate back to Ethereum and click ‘Convert’.
4. You will then see a notification that explains the two-step process of sending your tokens and executing the smart contract. You will see the fees charged for tokens migration, which includes Cardano fees and also Ethereum fees. Note that fees might change in the future, as we are now working in the testnet environment:

![notification-window](https://ucarecdn.com/8f5d7d44-0789-4c9b-be01-c64817147b00/)

In the notification, you will see the Cardano address where you should send your AGIX tokens to continue the process. 

5. Copy the Cardano address (from the notification window), then click ‘Understand’ to proceed with token migration. 
6. Go to the ‘Transaction history’. You will see the status of your transaction as ‘Pending deposit’. Now, we need to make the deposit. 

### Stage 2: depositing tokens from Daedalus

To make a deposit, go to your Daedalus testnet version.

1. Click ‘Send’ and paste the Cardano address (that you copied earlier) in the receiver field.
2. Indicate the amount of ada to cover the transaction fee (minimum 1 ada).
3. Select the Cardano-based token you would like to migrate back to Ethereum (AGIX, for example) and indicate the amount for migration. Note that it shouldn’t exceed the amount that you have earlier indicated in the converter.

![daedalus-token-deposit](https://ucarecdn.com/8448d3f2-5fca-4935-9930-5a68e2e09373/)

4. Click ‘Send’.
5. Go back to the ‘Transaction history’ in the converter. You will see the updated status of your transaction - ‘Deposited’. When confirmed on the Cardano blockchain, the burning process will start automatically and the status will change to ‘Burned’, which means that tokens are burnt on Cardano.
6. Once tokens are burnt, click ‘Continue process’ on the Dashboard page:

![continue-process](https://ucarecdn.com/a0819a8f-3690-417e-ac2e-74850615543b/)

7. By clicking the ‘Continue process’ button, you will execute the smart contract and unlock ERC20-based tokens. Once the smart contract is executed, you will receive tokens at your Metamask address. 

> Note that you can send multiple transactions under one conversion. Just send an additional transaction with Cardano-based tokens.

