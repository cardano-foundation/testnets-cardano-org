---
title: Connecting the nodes
description: ITN getting started
order: 5
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/connecting-the-nodes/
    type: "301"
---
## Connecting the nodes

As the network begins to grow, the various nodes need to be made aware of other participating nodes so that they can interact with each other in real time. As new nodes are added, they need to be plugged into the network to connect the participants together. 

Connecting new nodes is relatively simple, with peers being discovered based on the trusted peers that we provide for your use initially. The trusted peers constitute the initial connections a node will try to establish to become part of the network and participate in peer discovery. We use the [PolderCast](https://docs.rs/poldercast/0.4.0/poldercast/) system as the peer discovery protocol to ensure that stake pools are not at risk of being constantly queried by other nodes for initial peer discovery and synchronization. PolderCast offers a layered topology approach where the amount of layers is configurable and dependent on network growth.

The peer discovery protocol encourages nodes to participate actively in building the decentralized network topology. It also helps nodes to discover new nodes using a process called gossiping, where nodes share information with each other, such as who is on the network, how can they be reached, and what commonalities exist. This process helps the nodes to build out a network of ring and cyclon node configurations.
