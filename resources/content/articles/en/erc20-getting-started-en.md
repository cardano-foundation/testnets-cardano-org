---
parent: erc20-converter
title: Getting started
description: Getting started with the converter
order: 2
---

## Getting started

> Note: the current AGIX ERC20 converter is the testnet version and there are some known issues that we are working on to be improved in gradual upgrades. While the user flow and UI for the testnet converter will likely be very similar on mainnet, the current build is not yet optimized for performance. The testnet phase is an essential part of this process, gathering user data – particularly at times of high network saturation – will help us address this and improve throughput as we get closer to the mainnet launch.


To start using [the converter](https://testnet.agix-converter.iohk.io/), you first need to go through the initial setup and registration.

### Setting up your Metamask account

1. To set up your Metamask account, you need to add an existing wallet or [download a new Metamask wallet extension](https://metamask.io/download.html) for your Chrome or Firefox browser.
2. Click Metamask on the toolbar and select ‘Get Started’.
3. Import your existing Ethereum wallet by using a 12-word seed phrase, or select ‘Create a Wallet’ if you do not have one. Agree with the terms and conditions to proceed.

![1-metamask](https://ucarecdn.com/8c671aab-a9d0-4feb-b7d5-fc68d0218edd/) 

4. Set up a new password, read the terms of use, then click ‘Create’. Note that it is important to write down your secret backup phrase as it is the only way that you can restore your account. Then click ‘All Done’ to proceed.
5. Now that the wallet account has been created, click the Metamask extension on the toolbar and ensure to select ‘Kovan Test Network’:

![2-kovan-testnet](https://ucarecdn.com/184f854c-ee76-45ec-8839-f072e034b6a2/)

### Using the faucet

To start testing the converter, you can get some testnet Ethers (KETH), testnet SingularityNET tokens (AGIX), and testnet ada (tADA) from the faucet. 

**Getting KETH** 

1. Copy your account address from the Metamask wallet by clicking your account name.

![3-copy-address](https://ucarecdn.com/a7786cfa-fce2-4d03-8a4f-4da4631a3474/)

2. Go to the [Kovan faucet chat](https://gitter.im/kovan-testnet/faucet) or [the Chainlink faucet](https://linkfaucet.protofire.io/kovan) and paste your Metamask wallet address there to receive some KETH tokens.

**Getting testnet AGIX**  

1. First, you need to add AGIX tokens to the Metamask wallet. Click ‘Add token’ at the bottom of your Metamask wallet.
2. Move to the ‘Custom Token’ tab and copy-paste the AGIX smart contract hash: 0x20802d1a9581b94e51db358c09e0818d6bd071b4.
3. Click ‘Next’, and then ‘Add token’.

![5-agix-addition](https://ucarecdn.com/f606bf4b-73ba-441c-b5b9-fb9785e0f51a/)

4. To get testnet AGIX, copy your account address from the Metamask wallet.
5. Go to the [SingularityNET faucet](https://faucet.singularitynet.io/) and log in with your GitHub account.
6. Select the ‘Kovan’ option, paste your wallet address, and click ‘Submit’.

![6-agi-faucet](https://ucarecdn.com/2b55b413-41e5-48fe-a734-158dd589c8a3/)

7. You should receive 10 testnet AGIX. If you do not receive these testnet tokens, you can [request help from the support team](https://iohk.zendesk.com/hc/en-us/requests/new).

**Getting testnet ada (tADA)**

You will need testnet ada at later stages to be able to pay the fee for migrating your tokens from Cardano to Ethereum. Note that ada is not required when migrating Ethereum tokens to Cardano, as you will be paying testnet Ethers for transaction fees. 

1. First, make sure to download and install the testnet Cardano wallet - [testnet Daedalus](https://testnets.cardano.org/en/testnets/cardano/get-started/wallet/) or [Yoroi Nightly](https://chrome.google.com/webstore/detail/yoroi-nightly/poonlenmfdfbjfeeballhiibknlknepo).
2. Go to the [faucet](https://testnets.cardano.org/en/testnets/cardano/tools/faucet/) for requesting tADA.
3. Enter the address of the account where you want to top up funds.
4. If you have been issued with an API key, please enter this to access any additional funds you may have been allocated.
5. Click ‘Request funds’. Funds will be in the testnet account you specified within a few minutes.
