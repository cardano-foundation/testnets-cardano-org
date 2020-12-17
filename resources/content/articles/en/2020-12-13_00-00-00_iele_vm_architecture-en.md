---
title: Smart Contracts Architecture
description: How does the different components interact in KEVM and IELE
order: 3
parent: 2020-05-04_11-00-00_about
external_href: ""
last_updated: "2020-12-15T11:30:00+01:00"
---

## Smart Contracts Architecture

To execute smart contracts in a blockchain there are many technologies involved. And all the different moving parts can become difficult to understand. Here we look at the big picture first and then drill down, so that the components and their interactions become clearer.

## Context level view

From a 10,000 ft view the interactions are easy to grasp. There are developers, users, and validators. They all interact with each other indirectly by storing actions in a blockchain. Each one of these actors have different goals:

**1. A developer**
    codifies the smart contract and deploys it \[1,2\].

**2. A user**
    interacts with the smart contract by transactions stored \[3,4\]

**3. A blockchain validator**
    (aka stake pool operator or miner) is the one responsible for adding blocks and also executing the smart contracts that record the result of the execution in the blockchain. \[5-7\].

Once we understand the goals of each actor in this process we can understand the needs for different pieces of software.

It's worth pointing out that, while coding, a developer will actually play the three roles.

![Context level](https://ucarecdn.com/aca5fe3d-ec06-49e9-8692-540024c575ff/summary.svg)

## Container Level

Of course, in order to interact with the blockchain each actor requires specialized software. Zooming in the chart, we can see what each actor uses as their main software. These tools include the following:

A developer uses a development environment that can be either: Truffle Suite, or a combination of tools (editor, compiler, and minimal wallet) to deploy the smart contract. Whatever the tools, what is important to remember is that the quality of these programs is paramount since defects in them translate directly to losses in assets.

A user uses a wallet and the Mantis node to make transactions which is how a normal user interacts with a smart contract.

A stake pool operator (or miner depending on the blockchain) interacts directly with its node (composed of several software programs) to validate and append transactions to the blockchain.

![Container level](https://ucarecdn.com/96b7b345-150c-4065-8723-b53460f3cd94/container_level.svg)

## Component Level

Zooming in once more, we can see in detail what is inside each component.

1.  > **A Development Environment**

    1.  > is composed of a text editor, a compiler (either to IELE or KEVM), and a wallet (for deploying the smart contract). When using an IDE such as Truffle all the components are integrated. Whereas, when using a terminal each component is an actual program invoked from the command line.

    > **Stake Pool Node**

    2.  > has three parts: One is a Mantis node (the same as the user) so that it downloads a copy of the blockchain. It also requires a block validator (commonly known as miner) that validates the new transactions inside a block. When the transaction is one for a smart contract (or the block number has reached a certain point), it executes the smart contract on a virtual machine. That can be either the IELE VM or the KEVM. With the results calculated the block validation process continues as usual.

![Component level](https://ucarecdn.com/352f0c1a-0fb3-4e18-a9b7-7466dc8cd5d3/component_level.svg)

## How does it actually look?

How do these components look when a developer is working with them?

In this video [Lars Brünjes](mailto:lars.bruenjes@iohk.io), director of education at IOHK develops a smart contract using the Solidity to IELE compiler and the Mallet wallet.

<!-- embed youtube/Tp4Z0RbjSa8 -->

As we have seen, several software elements need to be in place to execute smart contracts. However, the basic interactions between a developer, user, and stake pool operator are very simple.
