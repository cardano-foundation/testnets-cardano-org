# Creating, Deploying, and Testing a HelloWorld smart contract

### Pre-requisites

Deploying smart contracts on the K Ethereum Virtual Machine (KEVM) devnet and testing Mallet requires:

1. Installation of the [Docker Engine](https://docs.docker.com/engine/install/).
2. Installation of Mallet.
3. Mallet account with enough funds to send a transaction.

## Creating the contract
Follow these steps to create a *HelloWorld* smart contract.

**1. Create a Solidity file**

Create a `myContract.sol` file:
```
    $ cat << EOF >myContract.sol
    // SPDX-License-Identifier: MIT
    pragma solidity >=0.5.1 <0.9.0;
    contract HelloWorld {
      function helloWorld() external pure returns (string memory) {
        return "Hello, World!";
      }
    }
    EOF
```

**2. Compile with `solc`:**

Use the Docker command to compile with `solc`: (Assumes Docker has been installed.)

`$ docker run --rm -v $(pwd):/sources ethereum/solc:0.5.1 -o /sources --bin --abi /sources/myContract.sol`
    
**3. Verify that the compiled file exists:**

If the file was correctly compiled, there should be a `HelloWorld.bin` file in your directory.
  
```
  $ ls *.bin
  HelloWorld.bin
```
       
## Deploying the HelloWorld smart contract using Mallet

Before deploying the contract, import the compiled smart contract into Mallet using the `HelloWorld.bin` file. 

**Note**: Run all commands below in Mallet.

**1. Import the `fileSystem` module:**

`fs = require("fs");`
    
**2. Read the contents of the binary file:**

`myContract = "0x" + fs.readFileSync('HelloWorld.bin', 'utf8');`
    
**3. Prepare the transaction to deploy the contract:**

`tx = { gas: 470000, data: myContract}`

**4. Send a transaction with the smart contract:**

`deploymentHash = sendTransaction(tx)`
    
This will return the tx hash on which the contract was deployed to.

**5. View receipt**

Run this command to view transaction details:

`getReceipt(deploymentHash)`
    
**6. Save your contract address**

To save your contract address, create a variable that takes the return value of `getReceipt():`

`myContractAddress = getReceipt(deploymentHash).contractAddress`

## Testing the smart contract

**1. Test the contract**

Run this command to test the smart contract.

`web3.toAscii(web3.eth.call({to: myContractAddress, data: '0xc605f76c'}))`
    
The expected output should contain **"Hello, World!"**. 
