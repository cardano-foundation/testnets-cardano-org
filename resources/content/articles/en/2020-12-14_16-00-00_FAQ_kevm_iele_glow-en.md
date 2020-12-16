---
title: FAQ for KEVM, IELE, and GLOW
description: Frequently asked questions on KEVM, IELE and Glow
order: 4
external_href: ""
parent: "2020-05-04_07-00-00_virtual-machines"
last_updated: "2020-12-15T11:30:00+01:00"
---

## FAQs for KEVM, IELE, and Glow

Note: At this point in time, we are restarting and accelerating the K
Ethereum Virtual Machine (KEVM) program *only*. The IELE program will be
coming very soon.

### I’m a Cardano fan

**Q. Why are we doing this?**

A. To provide the community with an environment to experience
the technology for smart contracts that Cardano will deliver as
part of the Goguen rollout. We want to establish a conversation with the community
and develop an ecosystem to support these features. KEVM and
IELE will allow Solidity developers to participate in the Cardano
ecosystem. IELE in particular will allow *universal* compatibility, which
means that it will be possible to write smart contracts in
several different languages besides Solidity (Python, for example).

**Q. Who is the devnet targeted at? Who would be able to use it?**

A. The devnet is targeted at smart contract developers who have previously
created smart contracts for other blockchains using Solidity. For example, ETC developers, 
Ethereum, Tron, etc.)

**Q. How can one access the devnet?**

A. Our dedicated [devnet site](https://developers.cardano.org/) is now live.

**Q. What is the difference between the current iteration of the devnet and the previous ones?**

A. In 2018, we introduced a testnet with KEVM and IELE support. In the 2020
iteration, we have upgraded the testnet and included a *third* language,
[Glow](https://glow-lang.org/), to the list of available options for writing smart contracts.

**Q. How does Mantis interact with the devnets? Why are we using an ETC codebase for this?**

The KEVM is 100% compatible with the EVM, so it made sense to plug
the VM into Mantis, as Mantis was already compatible
with ETC. Also, Glow is easier to run on top of
KEVM, and finally, we want to initiate a conversation with the community.

**Q. How does this relate to [native tokens](https://developers.cardano.org/en/development-environments/native-tokens/native-tokens/)?

In the future, smart contracts written in KEVM, IELE, and Glow will have
native tokens exposed as part of the language. This currently not possible
because both work streams (native tokens and VMs) work in parallel and will
converge later with the launch of Goguen.

**Q. What funcionality can I expect?**

A. You can take a smart contract created in Solidity,
compile it to run in KEVM or IELE, and deploy it to the test
environments. There is a faucet where you can request funds to deploy
your smart contract.

**Q. What’s the user journey of what a developer can do, step by step, using what tools?**

A. You can read the [Smart Contracts Architecture](http://../iele_vm_architecture) article, and see
how the different pieces work together.

**Q. What’s *Mallet*, and how does it fit into the journey?**

A. Mallet, the minimal wallet, is the [command line interface](https://testnets.cardano.org/en/more/iele/getting-started/mallet-installation/)
used to send transactions, deploy smart contracts, and interact with the IELE and KEVM devnets.

**Q. What tools or Integrated Development Environments (IDEs) are we offering?**

A. We will initiatlly support Mallet. Support for the Truffle and Remix IDEs is coming soon.

### I’m a developer

**Q. What is IELE?**

A. IELE consists of two things: the [IELE Virtual Machine (VM)](https://testnets.cardano.org/en/more/iele/about/the-iele-virtual-machine/)
and the IELE assembly language, which is executed by that VM.

The IELE VM differs from the KEVM, the original EVM, and other VMs, 
in that IELE is *register-based*, rather than *stack-based*. The VM
itself, the compiler, and other tools are all formally verified
by the K Framework. For more information on virtual machines,
please read [Stack-Based vs. Register-Based Virtual Machines](https://docs.google.com/document/u/0/d/1XilTNYriTCXF93uCw82GnFZ4_3j1JATsdC7ICPnvVLQ/edit).

**Q. Is IELE its own language?**

A. The IELE language is the low-level language executed by the IELE VM.
The typical process for creating a smart contract is to write it in 
Solidity or any other supported high-level language, compile to IELE assembly, 
and execute the result in the IELE VM. However, it is also possible to [write
IELE assembly code directly](https://testnets.cardano.org/en/more/iele/getting-started/coding-in-iele-assembly/)

As an analogy of how Solidity gets compiled to IELE assembly and
executed on the IELE VM, think of how Java gets compiled to Java
byte code (low level) and executed on the Java virtual machine (JVM).

**Q. What is KEVM?

A. KEVM is an implementation of the Ethereum virtual machine (EVM)
developed by [Runtime Verification](https://runtimeverification.com/). It is derived
automatically from the formal semantics of the EVM (i.e., the
[yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf) ) thanks
to [K framework technology](https://runtimeverification.com/blog/k-framework-an-overview/).

KEVM has two main advantages over the original EVM:

1.  > It is *correct by construction*, meaning that the user of the VM
    > only needs to read the formal semantics of EVM, which are given in a
    > clear and easy-to-understand declarative form. The user can be sure
    > that the VM will behave *precisely* as specified, and not in any other way.

2.  > By leveraging the K framework technology, it was possible to
    > automatically derive other tools such as a compiler and a fully
    > automated prover.

**Q. What is the K Framework?**

A. The K Framework is a set of tools used to define programming languages.
It has been used in the aerospace and automotive industries, and it is now
being used in the blockchain industry. Once the language is defined, tools
such as a parser, an interpreter, and even a program verifier are
available for it, 

**Q. What is the difference between the KEVM and IELE VM?**

A. The KEVM is an *implementation* of the EVM developed within the K-Framework. 
The IELE VM is an *entirely new* VM, inspired by the low-level virtual machine (LLVM).
The KEVM is stack-based and can execute the complete Solidity language, while LLVM is
register-based, and IELE uses a more restricted subset of the language.

Smart contracts written for the IELE VM are more secure than the normal
EVM and KEVM languages because of the thread model used to develop IELE.
See [Benefits of using the IELE VM](https://docs.google.com/document/u/0/d/1lqFBLubaY3C2zLXeQ0nBI-172Q2B--IdpKT6VNDwT8A/edit)
for more information.

**Q. What are the differences between IELE, KEVM, Glow, Plutus, and Marlowe?**

A. These products are related but are not the quite the same. Let's classify them:

- IELE and KEVM are VMs that execute programs
- Plutus and Solidity are general purpose *languages* that operate in blockchains
- Glow and Marlowe are domain-specific languages targeting financial contracts

A domain-specific language is used to write concise programs about financial concepts
such as debt, interest, etc., while general purpose languages like Plutus and Solidity
can also implement applications such as Crypto-kitties. All these languages *must be compiled*
to run in a VM (IELE or KEVM).

**Q. What is Universal Compatibility?**

A. Just like there are many natural languages (English, Spanish, etc.),
there are many programming languages (Java, C++, Haskell, etc.). There
also are many smart contract programming languages (Plutus, Solidity,
Glow, Marlowe, etc.). However, each programming language requires one
compiler for every processor (Intel, ARM, M1) on which it is going to
execute. With a VM such as IELE, only *one* compiler per language is needed, 
since all of the programming languages will execute in the same VM. 
In the future, you will be able to write smart contracts in *your* favorite language.

**Q. What is the Remix IDE?

A. It is an enhanced text editor specialized for writing code in a programming language. 
The Remix IDE is an open-source IDE that can be used to write smart contracts in
Solidity.

On the KEVM and IELE testnet websites, you can use Remix to write your smart contract, compile it,
check for errors, and deploy it.

**Q. How can I reuse a smart contract in IELE *and* in KEVM?**

A. Solidity compiles to both the KEVM and the IELE VMs, so some Solidity
contracts can be reused by simply re-compiling them. In comparison to the
KEVM, IELE offers increased security by supporting arbitrarily large
signed integers (thus getting rid of issues of arithmetic overflow),
removing unsafe features like DelegateCall and being register-based
(thus avoiding the risk of stack over- or underflows). This means that
*some* Solidity features are not 100% compatible with IELE.

These failsafe changes force Solidity developers to avoid unsafe constructs  
before the IELE compiler accepts their code, so some rework might be necessary
when trying to reuse Solidity code. Read [Benefits of using the IELE VM](https://docs.google.com/document/u/0/d/1lqFBLubaY3C2zLXeQ0nBI-172Q2B--IdpKT6VNDwT8A/edit)
for more information.

**Q. What is Glow?**

[Glow](https://glow-lang.org/) is an open-source,
secure programming language developed by [Mutual Knowledge Systems](https://mukn.io/)
and designed to create safe decentralized finance (DeFi) applications. 
Glow's goal is to simplify the writing and verification of —a “JavaScript for Blockchain”.
