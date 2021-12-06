---
parent: erc20-using-converter
title: Migrating tokens from Cardano to Ethereum
description: Migrating tokens from Cardano to Ethereum
order: 3
---

## Migrating tokens from Cardano to Ethereum

This process involves activities both in the converter and in the testnet Daedalus wallet.

### Stage 1: migrating tokens in the converter

1. To convert your migrated tokens from Cardano back to Ethereum, go to the token card and click ‘Select’.
2. You will see the conversion arrow, which indicates from which blockchain you are migrating your tokens. Switch the arrow to migrate tokens from Cardano to Ethereum:

![cardano-eth-migration](https://ucarecdn.com/b3465aef-c840-41d5-8789-afbb9aa6f0c8/)

3. Indicate the amount of tokens you would like to migrate back to Ethereum and click ‘Convert’.
4. You will then see a notification that explains the two-step process of sending your tokens and executing the smart contract. You will see the fees charged for tokens migration, which includes Cardano fees and also Ethereum fees. Note that fees might change in the future, as we are now working in the testnet environment:

![conversion](https://ucarecdn.com/00e6ca3e-5153-4463-baed-82c026340bd7/)

In the notification, you will see the Cardano address where you should send your AGIX tokens to continue the process. 

5. Copy the Cardano address (from the notification window), then click ‘Copy the address & go to the Dashboard’ to proceed with token migration. 
6. Go to the ‘Transaction history’. You will see the status of your transaction as ‘Pending deposit’. Now, we need to make the deposit. 

### Stage 2: depositing tokens from Daedalus

Go to your Daedalus testnet version. Please note that in Daedalus you will need to set up token decimal places based on recommendations provided in the wallet. To set decimal places, which will reflect the correct token amount, go to the ‘Tokens’ tab, find an AGIX token, expand its view, and click ‘Settings’:

![decimals-setup](https://ucarecdn.com/dab39335-5ec2-4b8b-a361-fe6c7623fc95/)

Set the number of decimal places to 8 and click ‘Save’:

![decimals-setup-8](https://ucarecdn.com/5bbc53a6-1c35-4992-898c-955e0ad53992/)

Then, make a deposit:

1. Click ‘Send’ and paste the Cardano address (that you copied earlier) in the receiver field.
2. Indicate the amount of ada to cover the transaction fee (minimum 1 ada).
3. Select the AGIX token you would like to migrate back to Ethereum and indicate the amount for migration. 

![daedalus-token-deposit](https://ucarecdn.com/080c276b-a774-4fcc-adfd-4f6a2d5b544a/-/crop/1600x1060/0,149/-/preview/)

4. Click ‘Send’.
5. Go back to the ‘Transaction history’ in the converter. You will see the updated status of your transaction - ‘Deposited’. When confirmed on the Cardano blockchain, the burning process will start automatically and the status will change to ‘Burned’, which means that tokens are burnt on Cardano.
6. Once tokens are burnt, click ‘Continue process’ on the Dashboard page:

![continue-process](https://ucarecdn.com/a0819a8f-3690-417e-ac2e-74850615543b/)

7. By clicking the ‘Continue process’ button, you will execute the smart contract and unlock AGIX tokens. Once the smart contract is executed, you will receive tokens at your Metamask address. 

> Note that you can send multiple transactions under one conversion. Just send an additional transaction with Cardano-based tokens.

