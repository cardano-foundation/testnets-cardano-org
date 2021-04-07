# Creating, Deploying, and Testing a HelloWorld smart contract

### Pre-requisites

Deploying smart contracts on the K Ethereum Virtual Machine (KEVM) devnet and testing Mallet requires:

1. Compiling the Solidity code to KEVM bytecode, which you can do using [solc](https://hub.docker.com/r/ethereum/solc).
2. The installation of the [Docker Engine](https://docs.docker.com/engine/install/)

## Creating the contract
Follow these steps to create a *HelloWorld* smart contract.

**1. Create a Solidity file**

Create a `myContract.sol` file:
```
    cat << EOF >myContract.sol
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

    `docker run --rm -v $(pwd):/sources ethereum/solc:0.5.1 -o /sources --bin --abi /sources/myContract.sol`
    
**3. Verify that the compiled file exists:**

If the file was correctly compiled, there should be a `HelloWorld.bin` file in your directory.
  
```
  ls *.bin
  HelloWorld.bin
```
       
**4. Bring the compiled smart contract into Mallet**

Import the smart contract into Mallet using the `HelloWorld.bin` file.

**5. Import the `fileSystem` module:**

    `fs = require("fs");`
    
**6. Read the contents of the binary file:**

    `myContract = "0x" + fs.readFileSync('HelloWorld.bin', 'utf8');`
    
## Deploying the HelloWorld smart contract

Now that you have the bytecode from `solc`, the next step is deploying it.

Follow these steps to deploy the HelloWorld smart contract.

**1. Prepare the transaction to deploy the contract:**

    `tx = { gas: 470000, data: myContract}`

**2. Send a transaction with the smart contract:**

    `deploymentHash = sendTransaction(tx)`
    
This will return the tx hash on which the contract was deployed to.

**3. View receipt**

Run this command to view transaction details:
    `getReceipt(deploymentHash)`
    
**4. Save your contract address**

To save your contract address, create a variable that takes the return value of `getReceipt():`
    `myContractAddress = getReceipt(deploymentHash).contractAddress`

## Testing the smart contract

**1. Test the contract**

Run this command to test the smart contract.

    `web3.toAscii(web3.eth.call({to: myContractAddress, data: '0xc605f76c'}))`
    
The expected output should contain **"Hello, World!"**. 
