---
title: Mallet end to end tutorial
description: EVM getting started
parent: 2021-02-25_11-00-00_getting-started
order: 5
last_updated: "2021-02-25T09:00:00+01:00"

---


## Installation prerequisites

- Linux and MacOS:  Node.js 10.16.3 (recommended), Python (2.7), Curl, Make and Git.
- Windows: Install the same as above within the Windows Subsystem for Linux (WSL).

Consult the official [nodejs](https://github.com/nodesource/distributions/blob/master/README.md) documentation for reference.


### Installing Node.js for Linux and MacOS

Follow these steps to install Node.js in Linux and MacOS operating systems.

**1. Open a terminal and execute:**

    curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
    sudo apt-get -q install -y nodejs


**2. Verify Node.js is installed with:**

    node --version


**3. Install `nvm` (a version manager for node.js):**

    curl -s -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash


**4. Make the `nvm` command available in the current session:**

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm


**5. Verify that `nvm` is installed:**

    nvm --version

    0.37.2

Note: Install Mallet only *after* verifying that `nvm` is installed *and* working.


### Installing Mallet 2.0

**1. Clone this [repo](<https://github.com/input-output-hk/mallet>) to get the latest version of Mallet, and then
install it with the `npm` command.**


**2. Clone the Mallet git repository**

Open a terminal window and type:

    git clone https://github.com/input-output-hk/mallet


**3. Install specific node version for Mallet**

After cloning the repository, execute:

    cd mallet

    cat .nvmrc

    10.16.3

Then install the required node version:

    nvm install 10.16.3
    nvm use --silent


**4. Download and install Mallet and its dependencies:**

    npm install --silent


**5. Verify that Mallet was installed correctly**

Check the integrity of the Mallet installation by using the `version` command:

    ./mallet --version

    2.1.0

If the version number displays correctly, the installation was successful.


## Mallet 2.0

Mallet, the minimal wallet, is the command line interface (CLI) used to send
transactions, deploy smart contracts, and interact with the IELE and
EVM devnets.

**1. Connect to the EVM devnet:**

    ./mallet evm -d ./data

    Mallet 2.1.0 - IELE/EVM devnet utility
    Type 'help()' to view the online documentation or 'listCommands()' to view available commands

This will open a session in the read-eval-print-loop (Repl) environment
for Node.js. Mallet commands are imported automatically.

Everything typed in the Repl has to be valid JavaScript. Technically
speaking, the commands are simply functions and properties of Mallet
object. However, we tend to refer to them as *commands* because that
reflects how they are used.

> Note: If you have problems installing any of the prerequisites (node or Mallet),
contact the community in Slack:
[Join IOHK | Devnets on Slack](https://join.slack.com/t/iohkdevnets/shared_invite/zt-jvy74l5h-Bhp5SQajefwjig72BIl73A)


**2. Create an account**

Create an account to use this faucet by using this code:

    //execute inthe Mallet Repl
    //mallet evm -d ./my_data/
    //mallet> .load ../test_smartcontract_deploy.js

    myAccount = newAccount()

The `newAccount` command asks your password, and returns your new account
address.

Note that we are assigning the return value of `newAccount` to a variable
named `myAccount` so we can refer to it later.




**3. Select an account**

Activate the account we have just created by using this code:

    selectAccount(myAccount)

    '0x45402404f51909b640d03f361c742c38d34bb3e7'


**4. Verify the balance of your new account**

Since the account has just been created, its balance should be 0.

    getBalance()

If you don't give any argument, this will return the balance of the
selected account.


**5. Request tokens from the faucet with `requestFunds`:**

    requestFunds()

Fund transfer might take a few minutes.


**6. Check the new balance in the account:**

    getBalance()


**7 Send funds to another account
  
    sendTransaction({to: '0x0.....', gas: 1000000, gasPrice: 5, value: 99999})

After entering your password as required, this will return a Transaction hash 

    Enter password:
    '0x73caee480d8ce11fd0e2987c4f35c3ae78697acf0fb766932a2a8a60d5cf5319'
    
  
**8 Check Transaction Hash

    getReceipt('0x73caee480d8ce11fd0e2987c4f35c3ae78697acf0fb766932a2a8a60d5cf5319')
    
    { transactionHash:
     '0x73caee480d8ce11fd0e2987c4f35c3ae78697acf0fb766932a2a8a60d5cf5319',
    transactionIndex: 0,
    blockNumber: 12345,
    blockHash:
     '0x841b3078d9cfeca290fb3a478d4c2f7210990f0e93491a947467657bb47d2b5c',
    cumulativeGasUsed: 21000,
    gasUsed: 21000,
    logs: [] }
   
This hash can also be verified via the Explorer, as can the balance of an account.

**Getting help**

The `help` command can be useful When running Mallet in the CLI. This command opens the **Readme file** in your default web browser:

    help()
    
Alternatively, [Join IOHK | Devnets on Slack](https://join.slack.com/t/iohkdevnets/shared_invite/zt-jvy74l5h-Bhp5SQajefwjig72BIl73A) to obtain help from the community.
