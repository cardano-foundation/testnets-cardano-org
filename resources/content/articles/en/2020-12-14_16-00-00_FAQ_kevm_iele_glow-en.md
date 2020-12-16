---
title: FAQ for KEVM, IELE, and GLOW
description: Frequently asked questions on KEVM, IELE and Glow
order: 4
external_href: ""
parent: "2020-05-04_07-00-00_virtual-machines"
last_updated: "2020-12-15T11:30:00+01:00"
---

# FAQ for KEVM, IELE, and GLOW

Note that at this point in time we are restarting and accelerating the K
Ethereum Virtual Machine (KEVM) program only. The IELE program will be
coming very soon.

## I’m a Cardano fan

### Why are we doing this?

To provide the community with an environment where you can experience
the technology for smart contracts that will be delivered in Cardano as
part of Goguen. We want to establish a conversation with the community
and further develop an ecosystem to support these features. KEVM and
IELE will allow Solidity developers to participate in the Cardano
ecosystem. IELE in particular will allow universal compatibility, which
basically means that it will be possible to write smart contracts in
several different languages, not only Solidity, but Python for example.

### Who is the devnet for? Who would be able to use it?

The devnet is targeted at smart contract developers who have previously
created smart contracts in the Solidity language for other blockchains.
(for example ETC developers, Ethereum, Tron, etc)

### How can one access it?

Our dedicated [devnet site](https://developers.cardano.org/) is live.

### What is the difference between these and the last iterations?

In 2018 we introduced a testnet with KEVM and IELE support. In the 2020
iteration, we have upgraded them and also included a third language
[Glow](https://glow-lang.org/) to the
list of available options for writing your smart
contracts.

### How does Mantis interact with these devnet? Why are we using an ETC codebase for this?

First of all KEVM is 100% compatible with EVM and it made sense to plug
the virtual machine in our project (Mantis) that was already compatible
with Ethereum Classic. Secondly, Glow is also easier to run on top of
KEVM and thirdly, as we mentioned earlier we want to start the
conversation with the community.

### How does this relate to native tokens?

In the future, your smart contracts for KEVM, IELE, and Glow will have
native tokens exposed as part of the language. Currently it’s still not
possible, because both work streams (native tokens and virtual machines)
are working in parallel to converge later with the launch of Goguen.

### What can I expect to do on it?

You can take a smart contract that you created before in Solidity,
compile it to run in KEVM or IELE, and deploy it to the test
environments. There is a faucet where you can request funds to deploy
your smart
contract.

### What’s the user journey of what a developer can do, step by step, using what tools?

You can read the [Smart Contracts Architecture](http://../iele_vm_architecture) article, and see
how the different pieces work together.

### What’s Mallet and how does it fit into the journey?

Mallet, the minimal wallet, is the command line interface used to send
transactions, deploy smart contracts, and interact with the IELE and
KEVM testnets. for [more information](https://testnets.cardano.org/en/more/iele/getting-started/mallet-installation/).

### What tools or IDEs are we offering?

In the beginning, Mallet is supported, with Truffle and Remix IDE
support coming soon.

## I’m a developer

### What is IELE?

IELE consists of two things: the [IELE Virtual Machine (VM)](https://testnets.cardano.org/en/more/iele/about/the-iele-virtual-machine/)
and the IELE assembly language, which is executed by that machine.

The IELE VM differs from the KEVM, the original EVM, and other virtual
machines, as it is register-based and not stack-based. The virtual
machine itself, the compiler, and other tools are all formally verified
by using the K Framework. For more information on virtual machines,
please read [Stack-Based vs. Register-Based Virtual Machines](https://docs.google.com/document/u/0/d/1XilTNYriTCXF93uCw82GnFZ4_3j1JATsdC7ICPnvVLQ/edit).

### Is IELE its own language?

The IELE language is the low-level language that the IELE virtual
machine executes. The typical process involved in creating a smart
contract is to write it in Solidity or another supported high-level
language, compile to IELE assembly, and execute the result in the IELE
virtual machine. However, it is also possible to write IELE assembly
code directly.

As an analogy of how Solidity gets compiled to IELE assembly and
executed on the IELE VM, you can think of how Java gets compiled to Java
byte code (low level) and executed on the Java virtual machine (JVM).
You can see an outline of the coding and compilation process in the
[Coding In IELE Assembly](https://testnets.cardano.org/en/more/iele/getting-started/coding-in-iele-assembly/)
video.

### What is KEVM?

KEVM is an implementation of the Ethereum virtual machine (EVM)
developed by [Runtime Verification](https://runtimeverification.com/). It is derived
automatically from the formal semantics of EVM (i.e. the
[yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf) ) thanks
to [K framework technology](https://runtimeverification.com/blog/k-framework-an-overview/).
The two main advantages of KEVM over the original EVM are:

1.  > It is correct by construction, meaning that the user of the VM
    > only needs to read the formal semantics of EVM which is given in a
    > clear declarative, easily understandable form, and can be sure
    > that the VM will behave precisely as specified.

2.  > By leveraging the K framework technology, it was possible to
    > automatically derive other tools such as a compiler and a fully
    > automated prover.

### What is the K Framework?

The K Framework is a set of tools used to define programming languages.
It has been used in the aerospace industry, the automotive industry and
now in the blockchain industry. Once the language is defined, tools are
available for it, such as a parser, an interpreter and even a program
verifier.

### What is the difference between the KEVM and IELE VM?

Basically, the KEVM is an implementation of the Ethereum virtual
machine, developed with the K-Framework. The IELE virtual machine is an
entirely new virtual machine, inspired by the LLVM. KEVM is stack-based
and the other is register-based. KEVM can execute the complete solidity
language and IELE uses a more restricted subset of the language.

Smart contracts written for the IELE VM are more secure than the normal
EVM and KEVM languages because of the thread model that was used to
develop IELE. (For more information see:
[Benefits of using the IELE VM](https://docs.google.com/document/u/0/d/1lqFBLubaY3C2zLXeQ0nBI-172Q2B--IdpKT6VNDwT8A/edit).

### What is the difference between IELE, KEVM, Glow, Plutus, and Marlowe?

These concepts are related but are not the same. First classify them:
IELE and KEVM are virtual machines that execute programs, Plutus and
Solidity are general purpose languages that operate in blockchains,
while Glow and Marlowe are domain specific languages targeting financial
contracts.

A domain specific language like Glow and Marlowe is used to write
concise programs about financial concepts such as debt, interest, etc..
A general purpose language like Plutus and Solidity can also implement
other programs such as crypto-kitties. All of them are compiled to run
in a virtual machine (IELE, or KEVM).

### What is Universal Compatibility?

Just like there are many natural languages (English, Spanish, etc.)
there are many programming languages (Java, C++, Haskell, etc.), and
there are many smart contract programming languages (Plutus, Solidity,
Glow, Marlowe, etc.). However, each programming language requires one
compiler for every processor (Intel, ARM, M1) on which it is going to
execute. With a virtual machine such as IELE, only one compiler per
language is needed, since all of the programming languages will execute
in the same virtual machine. In the future, you will be able to write
smart contracts in your favorite language.

### What is the Remix IDE?

IDE stands for Integrated Development Environment. It is a fancy text
editor specialized for writing code in a programming language. The Remix
IDE is an open source IDE that can be used to write smart contracts in
Solidity.

On the KEVM and IELE testnet websites you can use Remix to: write your
smart contract, compile it, check the errors that the compiler presents,
and then deploy.

### How can I reuse a smart contract in IELE and in KEVM?

Solidity compiles to both the KEVM VM and the IELE VM, so some Solidity
contracts can be reused by simply recompiling them. In comparison to the
KEVM, IELE offers increased security by supporting arbitrarily large
signed integers (thus getting rid of issues of arithmetic overflow),
removing unsafe features like DelegateCall and being register-based
(thus avoiding the risk of stack over- or underflows), which means that
not all Solidity features are 100% compatible with IELE.

These changes force Solidity developers to avoid unsafe constructs in
order to make the IELE compiler to even accept their code, so some
rework might be necessary when trying to reuse Solidity code. For more
information read the [Benefits of using the IELE VM](https://docs.google.com/document/u/0/d/1lqFBLubaY3C2zLXeQ0nBI-172Q2B--IdpKT6VNDwT8A/edit)

### What is GLOW?

[Glow](https://glow-lang.org/) is a
secure programming language used to develop safe decentralized
applications (DApps) in the domain of finance. It is open source and is
currently being developed by [Mutual Knowledge Systems](https://mukn.io/). Its goal is to make it significantly
easier to write and verify DApps—a “JavaScript for Blockchain”.
