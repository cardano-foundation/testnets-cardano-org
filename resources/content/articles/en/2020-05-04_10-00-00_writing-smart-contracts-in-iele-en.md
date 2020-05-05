---
title: Writing Smart Contracts in IELE
description: IELE getting started
parent: 2020-05-04_10-00-00_getting-started
order: 1
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/iele/get-started/
    type: 301
  - from: /en/iele/get-started/writing-smart-contracts-in-iele/
    type: 301
---
## Writing Smart Contracts in IELE

There are two ways to interact with the IELE testnet and VM. One is the Remix integrated development environment (IDE), and the other is to use Mallet, the command line wallet program. Both connect to the IELE testnet and the Solidity compiler, and are functionality equivalent. The main difference is that Remix can be accessed through your web browser so there is no need to install anything on your computer, while Mallet and the compiler are text-based and need to be installed.

### Writing smart contracts in IELE using Remix

#### Quick start

If you are an experienced Remix user, we have good news for you. Using the IELE VM to test and debug your smart contracts is as easy as ever

Go to the [Remix IELE tool](/en/more/iele/tools/compiler/), and write your smart contract as you would normally. In the Compile tab, tick the box for the Compile to IELE option.

Now you are using the IELE VM. You can correct any errors that the compiler throws up, and it is a good opportunity to read about the [language differences](https://github.com/runtimeverification/solidity/tree/sol2iele/help) with standard Solidity. When you are ready to deploy:

Select the Run tab and Environment: IELE TestNet blockchain. In Account, write your address for the tokens you received in the faucet, or you can create an account by pressing the (+) sign. Click Deploy IELE to publish your smart contract.

And that’s it! Your smart contract is now running on the IELE testnet. You can even check everything is working using the block explorer.
