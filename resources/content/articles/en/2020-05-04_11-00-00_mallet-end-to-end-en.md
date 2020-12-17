---
title: Mallet end to end tutorial
description: KEVM getting started
parent: 2020-05-04_11-00-00_getting-started
order: 5
last_updated: "2020-12-17T09:00:00+01:00"
redirects:
  - from: /en/kevm/get-started/deploying-smart-contracts/
    type: "301"
---


## Prerequisites Installation

On Linux and Mac, you will require Node.js 10.16.3, or the latest
version, and the Git tools. For Windows, you will also need the Windows
Subsystem for Linux (WSL).

For reference this is the official [nodejs](https://github.com/nodesource/distributions/blob/master/README.md) documentation.


## Installing Node.js for Linux and MacOS


### Open a terminal  and execute:

    curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
    sudo apt-get -q install -y nodejs


### Verify Node.js is installed with:

    node --version

    v13.14.0


### Install `nvm` which is a version manager for node.js

    curl -s -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash


### Make the `nvm` command available in the current session

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm


### Verify `nvm` is installed

    nvm --version

    0.37.2

With `nvm` working you can install Mallet.


## Installing Mallet 2.0

To get the latest version of Mallet, you first need to clone the
repository at <https://github.com/input-output-hk/mallet>, and then
install with npm.


### Clone the Mallet git repository

Open a terminal window and type in:

    git clone https://github.com/input-output-hk/mallet


### Install specific node version for Mallet

After cloning the repository, execute:

    cd mallet

    cat .nvmrc

    $ $ 10.16.3

Then install the required node version

    nvm install 10.16.3
    nvm use --silent


### Download and install Mallet and its dependencies.

    npm install --silent


### Verify Mallet was installed correctly

Finally, To check your installation, execute Mallet's `version`:

    ./mallet --version

    2.1.0

If the version number displays correctly.
It means you have successfully installed mallet.


## Installing the `solcjs` compiler

The `solcjs` compiler, takes your source code, written in solidity, and creates a binary that file
that you can later, deploy to the devnet using Mallet.


### Install `solcjs` with `npm`

    sudo npm install -g solc


    /usr/lib/node_modules/solc/solcjs
    + solc@0.8.0
    updated 1 package in 1.296s


### Verify `solcjs` was installed

    solcjs --version

    0.8.0+commit.c7dfd78e.Emscripten.clang

Once we get the right version on `solcjs` we can go forward to deploy smart contracts.

If you have problems installing any of the prerequisites (node, Mallet or solcjs),
contact the community in Slack:
[Join IOHK | Devnets on Slack](https://join.slack.com/t/iohkdevnets/shared_invite/zt-jvy74l5h-Bhp5SQajefwjig72BIl73A)


<a id="orgfd048b1"></a>

## Create a HelloWorld smart contract

To deploy your smart contracts on the KEVM devnet and to test Mallet
you will need to compile to KEVM (K - Ethereum virtual machine) bytecode.
You can compile the bytecode directly with using [solcjs](https://github.com/ethereum/solc-js#usage-on-the-command-line).


### Create a Solidity  file

Create a `myContract.sol` file

    cat << EOF >myContract.sol
    // SPDX-License-Identifier: MIT
    pragma solidity >=0.6.0 <0.9.0;


    contract HelloWorld {
      function helloWorld() external pure returns (string memory) {
        return "Hello, World!";
      }
    }
    EOF


### Compile with `solcjs`

    solcjs --bin --abi --base-path . ./myContract.sol


### Verify the compiled file exists

In your directory now there should be an  `.bin` file

    ls *.bin

    _myContract_sol_HelloWorld.bin


# Mallet 2.0

Mallet, the minimal wallet, is the command line interface used to send
transactions, deploy smart contracts, and interact with the IELE and
KEVM devnets.


## Connect to the KEVM devnet

    ./mallet kevm -d ./data

    Mallet 2.1.0 - IELE/KEVM devnet utility
    Type 'help()' to view the online documentation or 'listCommands()' to view available commands

This will open a session in the read-eval-print-loop (Repl) environment
for Node.js. Mallet commands are imported automatically.

Everything typed in the Repl has to be valid JavaScript. Technically
speaking, the commands are simply functions and properties of Mallet
object. However, we tend to refer to them as commands because that
reflects how they are used.


## Using the faucet


### Create an account

    //execute inthe Mallet Repl
    //mallet kevm -d ./my_data/
    //mallet> .load ../test_smartcontract_deploy.js

    myAccount = newAccount()

The `newAccount` command asks your password, and returns your new account
address.

Note that we are assigning the return value of newAccount to a variable
named myAccount so that we can refer to it later.


### Select an account

Now we will make the account just created active

    selectAccount(myAccount)

    '0x45402404f51909b640d03f361c742c38d34bb3e7'


### Verify the balance of your new account

Since the account has just been created its balance should be 0.

    getBalance()

If you don't give any argument, this will return the balance of the
selected account.


### Request tokens from the faucet with `requestFunds`

    requestFunds()

It may take a few minutes for the funds to be transferred.

Now that you have created and funded your account, you can compile and
deploy smart contracts.


### Check the new balance in the account

    getBalance()


## Bring the compiled smart contract into Mallet

Using the `_myContract_HelloWorld.bin` created in the step:
[1.4](#orgfd048b1)
you can now import it to mallet


### Import the `fileSystem` module

    fs = require("fs");


### Read the contents of the binary file

    myContract = fs.readFileSync('_myContract_sol_HelloWorld.bin', 'utf8');


## Deploying smart contracts

Now that you have the bytecode from `solcjs`, the next step is simply to deploy it:


### Prepare the transaction to deploy the contract

    tx = { gas: 470000, data: myContract}


### Send transaction with the smart contract

    deploymentHash = sendTransaction(tx)

you will get back the tx hash on which it was deployed.


### View receipt

You can view details with the following command:

    getReceipt(deploymentHash)


### Save your contract address

To save your contract address, create a variable that takes the return value of getReceipt().

    myContractAddress = getReceipt(deploymentHash).contractAddress


### Test your smart contract

    sendTransaction({to: myContractAddress,gas:10000})


## Getting help

When running Mallet in the command-line interface, the help command can
be useful. This opens the **Readme file** in your default web browser:

    help()

Or you can [Join IOHK | Devnets on Slack](https://join.slack.com/t/iohkdevnets/shared_invite/zt-jvy74l5h-Bhp5SQajefwjig72BIl73A), where the community helps each other
