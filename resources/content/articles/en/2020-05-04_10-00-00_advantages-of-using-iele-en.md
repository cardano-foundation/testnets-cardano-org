---
title: Advantages of using IELE
description: IELE about
parent: 2020-05-04_10-00-00_about
order: 3
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/iele/about/advantages-of-using-iele/
    type: "301"
---
## Advantages of using IELE

In the Goguen phase of the Cardano project, the Ethereum virtual machine (EVM) has been replaced by IELE. IELE is the foundation of a strategy to make secure, reliable, and efficient smart contracts easier to write. Many of its benefits will only appear in later phases, but Solidity programmers get some of them now.

### No arithmetic for 'int' and 'uint' types.

In EVM, 'int' and 'uint' values are 256 bits long, so they can overflow. Doubling the largest positive number produces a negative one. The notorious [BatchOverflow](https://thenextweb.com/hardfork/2018/04/25/ethereum-smart-contract-integer-overflow/) exploit shows how serious such a mistake can be – and how easy it is to make.

In IELE, overflow is impossible because numbers can be arbitrarily long. If a number grows too large to fit into 256 bits, more bits are allocated.

Note: IELE treats integers with a specified length, like 'uint8', the same way EVM does. If you add 1 to the largest possible 'uint8', you'll get 0.

### No stack overflow

The EVM stores cheap transient data on its stack. The stack has room for only 1,024 256-bit values. That means stack overflow is something a programmer has to worry about. IELE's stack, like that of virtual machines for languages such as Java or Python, is limited only by available memory. So stack overflows hardly ever happen and almost certainly mean your program has a bug (probably infinite recursion). And, unless you have provided an unrealistically huge gas allowance, you'll run out of gas before the stack overflows. (That is, after all, the purpose of gas: to prevent runaway computation.)

### Contracts have been made easier to write and less error-prone

Contract creation has been changed, both to prohibit risky code and to allow the thorough static security analysis that will come in the next phases of Cardano.

EVM's CALLDATA and DELEGATECALL instructions make security bugs too easy, so they've been replaced with a safer mechanism. Cheaper contract creation means they aren't needed as a way to save gas.

Unlike the Ethereum Solidity compiler, the Cardano compiler doesn't allow inline bytecodes. Instead, the typical reasons people write inline code are handled by built-in functions. (More will be added if needed.)

In EVM, it's possible to create a contract without calling its constructor. That is impossible in IELE.

### IELE as a foundation for future benefits

#### Security and reliability

You want contracts to work no matter what values are passed to them. For example, if an account tries to transfer ether to itself, the result should be no change in the account. Some implementations incorrectly reject the transaction because of an insufficient balance. That bug isn't so serious, but it – along with arithmetic overflow – shows how hard it is for humans to think of special cases.

IELE is designed to support machine analysis. Specifically, Cardano will enable high-value contracts to be evaluated like this:

* What the contract must do is stated in a precise language, separately from the code.
* The contract source code is compiled into IELE's underlying language, which has been specified with great precision.
* Formal verification techniques are used to (in effect) explore all possible values. So the case where the ether sender is the same as the ether receiver will automatically be checked.

You may have heard that formal verification is an 'ivory tower' and impractical concept. But it's ideally suited for smaller programs (such as contracts), working in a special domain (such as blockchain operations), compiled to a specially-constructed virtual machine (such as IELE). For high-value contracts, formal verification will be cost-effective.

#### Multiple languages

In this phase of Cardano, only Solidity compiles for IELE. More languages (eg, Plutus) will be supported in later phases. IELE was designed to make it easier to add a language than EVM allows.

As you'd hope, a contract written in one language will be able to call a contract written in another. That means, for example, that Solidity code can be reused while you migrate to another language.

#### Standing on the shoulders of giants

The IELE virtual machine's instruction set is modelled after that of LLVM. LLVM is an open source technology that's widely used, most notably in Apple's toolset for building iPhone and Mac apps. Over the eighteen years LLVM has been in development, many optimization and analysis techniques have been applied to its instruction set. Going forward, Cardano can adapt the best of them rather than having to invent new ones.