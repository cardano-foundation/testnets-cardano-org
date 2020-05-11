---
title: Configuring your network
description: ITN getting started
order: 4
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/configuring-your-network/
    type: 301
---
## Configuring your network

The network consists of a collection of nodes, devices that participate in a decentralized network and help to maintain the blockchain. These nodes interact with each other in a number of ways. Nodes operate within a neighbourhood, or ring topology, where information is communicated freely and regularly between the nodes. Nodes connect with other nodes in their vicinity that share similar interests and fragments. Nodes that are outside of the immediate vicinity can be reached using a cyclon typology, which adds a randomness to the protocol, but ensures faster sharing of information.

To help you get started, we are providing test networks that consist of several nodes and stake pools. These also connect to trusted peers, those nodes in the network that your node will initially trust when building out the network. To learn more about these different types of release testnets, please visit [About > Testnet introduction](/en/itn/about/testnet-introduction/) where the beta and nightly releases are explained. 

### Connecting to the beta release testnet

To connect to the established beta release testnet, add the trusted peer information, as outlined on the [Jörmungandr status page](https://hydra.iohk.io/job/Cardano/iohk-nix/jormungandr-deployment/latest-finished/download/1/index.html), and then run this command:

```shell
jormungandr --config <config file>
```

If you are using Windows `cmd` you can use `^` for multiline entry. 

### Connecting to the nightly release testnet

The latest up to date configuration files and genesis hash for the nightly network are outlined on the [Jörmungandr status page](https://hydra.iohk.io/build/1505847/download/1/index.html). DISCLAIMER: the nightly testnet can be reset at any time, without warning. 

Once you have this information, run the same command as detailed above. 

You will need to use the [REST API](https://editor.swagger.io/?url=https://raw.githubusercontent.com/input-output-hk/jormungandr/master/doc/openapi.yaml) to connect and receive your funds. To get funds, use this command:

```shell
curl -X POST https://faucet.nightly.jormungandr.iohkdev.io/send-money/<ADDRESS>
```

At start up you need to provide the command line parameter to connect to the specific genesis-block-hash for the testnet of your choice. This is a unique identifier which identifies the blockchain and provides security and a guarantee that you are connected to the right blockchain. 

Once that is done you are connected and already fetching the first blocks of the blockchain.
