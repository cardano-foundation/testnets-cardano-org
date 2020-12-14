---
title: Smart Contracts with KEVM and IELE Architecture
description: How does the different components interact in KEVM and IELE
order: 4
external_href: ""
---

# Smart Contracts Architecture with KEVM and IELE

To execute smart contracts in a blockchain there are many technologies involved. And all the different moving parts can become difficult to understand. Here we look at the big picture first and then drill down, so that the components and their interactions become clearer.

## Context level view

From a 10,000 ft view the interactions are easy to grasp. There are developers, users, and validators. They all interact with each other indirectly by storing actions in a blockchain. Each one of these actors have different goals:

1.  > **A developer**

    1.  > codifies the smart contract and deploys it \[1,2\].

    > **A user**

    2.  > interacts with the smart contract by transactions stored \[3,4\]

    > **A blockchain validator**

    3.  > (aka stake pool operator or miner) is the one responsible for adding blocks and also executing the smart contracts that record the result of the execution in the blockchain. \[5-7\].

Once we understand the goals of each actor in this process we can understand the needs for different pieces of software.

It's worth pointing out that, while coding, a developer will actually play the three roles.

![Context level](../article-images/2020-12-13_00-00-000_iele_vm_architecture/summary.svg)

## Container Level

Of course, in order to interact with the blockchain each actor requires specialized software. Zooming in the chart, we can see what each actor uses as their main software. These tools include the following:

A developer uses a development environment that can be either: the Remix IDE, the Truffle Suite, or a combination of tools (editor, compiler, and minimal wallet) to deploy the smart contract. Whatever the tools, what is important to remember is that the quality of these programs is paramount since defects in them translate directly to losses in assets.

A user uses a wallet and the Mantis node to make transactions which is how a normal user interacts with a smart contract.

A stake pool operator (or miner depending on the blockchain) interacts directly with its node (composed of several software programs) to validate and append transactions to the blockchain.

![Container level](../article-images/2020-12-13_00-00-000_iele_vm_architecture/container_level.svg)

## Component Level

Zooming in once more, we can see in detail what is inside each component.

1.  > **A Development Environment**

    1.  > is composed of a text editor, a compiler (either to IELE or KEVM), and a wallet (for deploying the smart contract). When using an IDE such as Remix or Truffle all the components are integrated. Whereas, when using a terminal each component is an actual program invoked from the command line.

    > **Stake Pool Node**

    2.  > has three parts: One is a Mantis node (the same as the user) so that it downloads a copy of the blockchain. It also requires a block validator (commonly known as miner) that validates the new transactions inside a block. When the transaction is one for a smart contract (or the block number has reached a certain point), it executes the smart contract on a virtual machine. That can be either the IELE VM or the KEVM. With the results calculated the block validation process continues as usual.

![Component level](../article-images/2020-12-13_00-00-000_iele_vm_architecture/component_level.svg)

## How does it actually look?

How do these components look when a developer is working with them?

In this video [<span class="underline">Lars Brünjes</span>](mailto:lars.bruenjes@iohk.io), director of education at IOHK develops a smart contract using the Solidity to IELE compiler and the Mallet wallet.

[![Mallet tutorial](https://img.youtube.com/vi/Tp4Z0RbjSa8/0.jpg)](https://www.youtube.com/watch?v=Tp4Z0RbjSa8 "")

As we have seen, several software elements need to be in place to execute smart contracts. However, the basic interactions between a developer, user, and stake pool operator are very simple. 
