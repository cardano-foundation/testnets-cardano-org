---
title: Deploying smart contracts
description: KEVM getting started
parent: 2020-05-04_11-00-00_getting-started
order: 5
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/kevm/get-started/deploying-smart-contracts/
    type: "301"
---
## Deploying smart contracts

Once you have  installed Mallet 2.0, follow the tutorial to:

- connect to the testnet;
- create accounts;
- request tokens from the faucet;
- compile a smart contract (only available for IELE testnet);
- deploy it in the testnet;
- execute a smart contract.

To run Mallet and connect to a testnet:

### Connect to the KEVM testnet

```shell
./mallet kevm
```

This  will open a session in the read-eval-print-loop (Repl) environment for Node.js. Mallet commands are imported automatically.

Everything typed in the Repl has to be valid JavaScript. Technically speaking, the commands are simply functions and properties of Mallet object. However, we tend to refer to them as commands because that reflects how they are used.

#### Basic Commands

**Create an account**

```javascript
mallet> myAccount = newAccount()
Enter password:
```

The newAccount command asks your password, and returns your new account address.

```shell
0x*************
```

Note that we are assigning the return value of newAccount to a variable named myAccount so that we can refer to it later.

**List existing accounts**

```javascript
mallet> listAccounts()
```

Will return a list of all existing accounts.

**Select an account**

```javascript
mallet> selectAccount(myAccount)
```

**Get the balance of your account**

```javascript
mallet> getBalance()
```

If you don’t give any argument, this will return the balance of the selected account.

**Request tokens from the faucet**

```javascript
mallet> requestFunds()
```

It may take a few minutes for the funds to be transferred.

Now that you have created and funded your account, you can compile and deploy smart contracts.

#### Compiling smart contracts

To deploy your smart contracts on the KEVM testnet you will need to compile to KEVM (K - Ethereum virtual machine) bytecode. You can compile the bytecode directly with using [solc](https://github.com/runtimeverification/solidity), or using an IDE (Integrated development environment) such as  [Remix](https://remix.ethereum.org/) or similar.

Disclaimer:  Remix  is just one IDE that you can use to compile the bytecode. There are other IDEs that also perform this function. We have included instructions on using Remix as an example

#### Compiling with ‘solc’ (command line)

You can also compile your smart contract using only commandline tools. In that regard you will need to install the ‘[solc](https://github.com/runtimeverification/solidity)’ (soliditiy to KEVM compiler) in you can compile smart contracts directly from your terminal:

### from your terminal NOT inside mallet

```shell
solc --bin --abi myContract.sol > myContract.bin
```

With your compiled code, now you can read it and deploy it from mallet

import the fs module from Node.js:

```javascript
mallet> fs = require('fs')
```

read the contents of the file:

```javascript
mallet> myContract = fs.readFileSync('myContract.bin', 'utf8')
```

#### Deploying smart contracts

Now that you have the bytecode either from solc or from Remix, the next step is simply to deploy it:

```javascript
// prepare the transaction to deploy the contract
mallet> tx = {
// gas limit, mandatory
gas: 470000,
// the variable with our smart contract binary
data: myContract
};

//deploy the smart contract
mallet> deploymentHash = sendTransaction(tx)
Enter password:

//you will get back the tx hash on which it was deployed.
'0x........'
```

**View receipt**

You can view details with the following command:

```javascript
mallet> getReceipt(deploymentHash)
```

To save your contract address, create a variable that takes the return value of getReceipt().

```javascript
mallet> myContractAddress = getReceipt(deploymentHash).contractAddress
```

**Test your smart contract**
To test your contract:

```javascript
mallet> sendTransaction({to: myContractAddress,
gas:,
arguments: args});
```

#### Getting help

When running Mallet in the command-line interface, the help command can be useful. This opens the Readme file in your default web browser:

```javascript
mallet> help()
```
