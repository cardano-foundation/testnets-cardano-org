---
title: Sample Smart Contracts
description: IELE getting started
parent: 2020-05-04_10-00-00_getting-started
order: 5
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/iele/get-started/sample-smart-contracts/
    type: "301"
---
## Sample Smart Contracts

The IELE-Solidity compiler doesn’t support all the instructions in EVM-Solidity. This was a design decision to improve the security and verifiability of your smart contracts. The following examples demonstrate ways to improve your smart contracts so that they compile in IELE.

### Replace global.msg data with a bytes parameter

In IELE there is no need to use the global msg.data object to pass parameters between functions. Instead, it is replaced by a bytes parameter in the function definition.

```
//use a bytes parameter as part of the function definition
function set(bytes b) public returns (bool) {     
  data = b;                                       
  return true;
}
```

For more information, see [address.call is not supported in IELE](https://github.com/runtimeverification/solidity/blob/sol2iele/help/call.md). Source code is available in [call-and-msg-data.iele.sol](https://github.com/runtimeverification/solidity/blob/sol2iele/help/examples/call-and-msg-data.iele.sol).

### Replace address.call with an ordinary function call.
Demonstrates how you use an ordinary function call to replace: address.call, abi.encodeWithSignature and abi.encodeWithSelector. 

```
contract ClientContract {
  function test() public returns (uint) {
    //encode the target function name
    bytes4 callee = bytes4(keccak256("set()"));

    ByteStoreContract store = new ByteStoreContract();
    //use abi.encode to assemble the calling function and its parameters
    store.set(abi.encode(callee, uint256(1), uint256(2), uint256(3)));
    return store.getLength();
  }
}
```

For more information, see [address.call is not supported in IELE](https://github.com/runtimeverification/solidity/blob/sol2iele/help/call.md). Source code is available in [call-and-msg-data.iele.sol](https://github.com/runtimeverification/solidity/blob/sol2iele/help/examples/call-and-msg-data.iele.sol).

### Replace delegatecall with an ordinary function call

IELE doesn't allow delegatecall. Instead, the library's source is compiled and the resulting bytecodes are included in your compiled contract. That means you pay for better security with a slightly higher gas price for bigger contracts. As you can read in the example, Contract inherits from LibraryContract, because the LibraryContract source code is part of your program and what used to be delegatecall is now an ordinary internal call.

```
//this would normally be provided via ‘import’
contract LibraryContract {
  event libraryEvent(address from);
  
  function libraryFunction() public {
    emit libraryEvent(this);
  }
}
// reusing LibraryContract
contract Contract is LibraryContract {  
  function contractFunction() public {
    libraryFunction();                    // <<<- 2
  }
}
```

For more information, see [address.delegatecall is not supported in IELE](https://github.com/runtimeverification/solidity/blob/sol2iele/help/delegatecall.md). Source code is available in [delegatecall.iele.sol](https://github.com/runtimeverification/solidity/blob/sol2iele/help/examples/delegatecall.iele.sol).

### Longer examples

Apart from the short examples mentioned above, there are longer sample smart contracts that the IELE team uses in the compiler tests repository. You can review them in [compilation test smart contracts](https://github.com/runtimeverification/solidity/tree/sol2iele/test/compilationTests).

Also, you can use the checklist [Moving Solidity code from EVM to IELE](https://github.com/runtimeverification/solidity/tree/sol2iele/help) as a guide to moving your code to IELE. The compiler displays error messages that will help you to develop more secure smart contracts with IELE-Solidity. 
