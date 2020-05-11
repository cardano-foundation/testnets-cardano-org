---
title: Guide for stake pool operators
description: ITN getting started
order: 6
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/guide-for-stake-pool-operators/
    type: 301
---
## Guide for stake pool operators

In this section we provide helpful information for those of you who are acting as stake pool operators. A complete [How to guide for stake pool operators](https://github.com/input-output-hk/shelley-testnet/blob/master/docs/stake_pool_operator_how_to.md) is also available to help you set up and configure your stake pool. 

PDF versions of this guide are available in English, Japanese, Korean, and Chinese in our [Resources > Links](/en/itn/resources/links/) section.

### The role of a stake pool operator

The foundational concept of cryptocurrencies is decentralization. When you set up a stake pool or choose to run a node on your own, you are helping to improve the Cardano network’s strength and security. The more independent nodes in the ecosystem, the more copies of the blockchain that exist, therefore the more resilient the Cardano network becomes. 

### Who can operate a stake pool?

Anyone can register a stake pool, although it requires an individual or team with system administration skills to be able to operate and maintain a pool. The only cost associated with creating a pool is the stake pool registration fee, which is a  configurable value defined in the genesis configuration file and varies depending on the associated network. For a pool to be competitive, it needs to have a significant amount of stake delegated to it, otherwise the node will run idle and never, or very seldom, create blocks.    

### The context of a stake pool

A stake pool does not exist in isolation, instead it interacts with the entire Cardano ecosystem.

First, the stake pool operator sets up a stake pool node, which is a Jörmungandr server that has been configured to validate blocks from the Cardano blockchain. Once the setup is complete, the stake pool operator registers on the stake pool registry.

The stake pool registry is a list of metadata about stake pool owners that are maintained by the [Cardano Foundation](https://cardanofoundation.org/en/). This list will appear in the Daedalus Rewards interface. However, it is important to note that anyone with enough ada to pay the transaction fee can set up a stake pool, even if they are not listed in Daedalus Rewards.

An ada holder can go to Daedalus, and in the Delegation tab, select the stake pool to which they want to delegate their stake. That delegation action is recorded on the Cardano blockchain and will influence the slot leader selection process in the next epoch.

This diagram outlines the process:

![System Context diagram](https://ucarecdn.com/2a30c9c2-6bc5-4301-aa68-ce34180e296f/)
_**System context diagram for the stake pool operator node**_

_A stake pool operator node provides a valuable service for the Cardano blockchain and communicates indirectly with Daedalus and the Cardano stake pool registry._

### Minimum requirements for running a stake pool

In terms of hardware, you should have the following available:

- 4 GB of RAM 
- a good network connection and about 1 GB of bandwidth per hour 
- a public IP4 address 

Note that processor speed is not a significant factor for running a stake pool. 

### Minimal installation

In order to set up a minimal stake pool, you need a small server that fulfils the hardware requirements and a Jörmungandr node started with the `--secret` parameter.  Although this will work, a stake pool should have close to 100% availability. That means that the node must be online with good internet connection 24/7. 

This diagram outlines the minimal requirements: 

![Container diagram](https://ucarecdn.com/5114b93d-5217-4e82-b19c-561bc9d535fd/)
_**Container diagram for a stake pool operator node with minimal requirements**_

### Registering stake pools with the Cardano Foundation stake pool registry 

At this point we are opening the pre-registration process for new stake pools. As an operator of a public stake pool, you can pre-register it with the official Incentivized Testnet stake pool registry, which is run by the [Cardano Foundation](https://cardanofoundation.org/). You will need to provide signed submissions in the form of Github pull requests into this registry. For details on how to register your stake pool, see the [Incentivized Testnet registry GitHub page](https://github.com/cardano-foundation/incentivized-testnet-stakepool-registry). If you pre-register your stake pool at this point, your pull request will remain open until the point at which the complete network functionality is available, when it will be merged and officially registered. Once your stake pool is fully registered it will appear as a delegation option in the supported testnet wallet Daedalus. 

These submissions are subject to checks and human vetting to ensure that they are well-formed, before being merged to the master repository. There are some rules and semantics that you should be aware of when submitting to the registry, please check [the registry rules](https://github.com/cardano-foundation/incentivized-testnet-stakepool-registry#submission-well-formedness-rules) before you make your submission. You should also refer to the [usage policy ](https://github.com/cardano-foundation/incentivized-testnet-stakepool-registry/blob/master/USAGE_POLICY.md)for compliance and legal information to ensure your pull request is accepted.

### About the Cardano Foundation Trademark Policy

If you have any questions regarding the usage of our trademarks, please refer to the [Cardano Foundation trademark policy](https://cardanofoundation.org/en/legal/trademark-policy/)

Please also read the associated article [For stake pool operators: Logo usage and name of stake pools](https://iohk.zendesk.com/hc/en-us/articles/360038740233).

### Using the stake pool dashboard

A stake pool dashboard is available to download in the [stake pool management GitHub repository](https://github.com/input-output-hk/stakepool-management-tools) to help you manage your stake pool and monitor its performance. There is both a graphical user interface and a command line interface available to use. This tool is in the early stages of development and more functionality will be added soon, we welcome your feedback at this point. 

This dashboard will give you a convenient summary of data related to your stake pool so that you can easily assess how it is performing, as well as provide you with some useful links to supporting materials to help you manage your stake pool. The monitoring data includes details of the health status of the node, as well as reporting on the leader schedule, chain and transaction information, rewards, fragment logs, and general stake pool settings. It also provides us with visibility on the performance of nodes within the network. 

As this dashboard is a proof of concept, please log any issues or suggestions for new features in the [GitHub repository](https://github.com/input-output-hk/stakepool-management-tools), as the Technical Support Desk is not supporting this functionality at this point.

### Costs associated with running a stake pool

While Ouroboros is cheaper to run than a proof of work protocol, running Ouroboros still incurs some costs: electricity, network connectivity, equipment depreciation.etc.

Therefore, stake pools are rewarded for running the protocol in the form of incentives that come from the transaction fees and from inflation of the circulating supply of ada. 

### Learn about incentives

In blockchain technology, the goal is to incentivize participants to “do the right thing”. In Cardano that means achieving a certain distribution of stake. This distribution can be achieved with an appropriate number of stake pools,  not too many or too few. Most stake is expected to be concentrated in stake pools and stake pools are incentivised to be online and actively participate in the protocol. Incentives are designed in such a way that if everyone follows their own rational financial interest, the outcome should be an even distribution of stake amongst stake pools.

In the context of a cryptocurrency, incentives is a way of encouraging stake pools to participate in the protocol and to support it faithfully. In Cardano, that means that the stake pool is online and creates a block when it has been elected as slot leader. 

As stake pools make an investment in the form of hardware, time, and so on, it is fair that they receive incentives for their costs and effort. Incentives in our case refer to monetary incentives in the form of ada. In our incentives model we want to incentivise stake pools to be online and participation in the protocol creating blocks whenever they are elected slot leaders.

On the other hand, there may be people who are not interested or do not have the technical know-how to set up the required software or the time to be online, but they can still participate by delegating their stake to a stake pool.

### The incentives mechanism

A lot of work has gone into creating an incentivization mechanism that will ensure the long term health of the network, but the game theory which underpins the incentivization only works if real rewards are available for real users. The Incentivized Testnet enables us to test the theory in a sandbox environment to make sure it works as intended. The ada rewards earned for delegating stake or running a stake pool are real and, once the testnet is complete, those rewards will be redeemable and available to spend. We are using real rewards to gauge real responses, and to assess how the incentivization mechanism works in a real world setting.

### Understanding the delegation mechanism

As Cardano is a proof-of-stake system, holding stake, or owning ada, means that you can buy goods or services with your purchase and payment power. In addition, you also have the right and obligation to participate in the protocol and create blocks.

These two uses can be separated by the delegation mechanism, meaning someone who owns ada can keep the spending power, while delegating the power to participate in the protocol to someone else, a stake pool. It is important to note that funds can be spent normally at any time, regardless of how they are delegated.
