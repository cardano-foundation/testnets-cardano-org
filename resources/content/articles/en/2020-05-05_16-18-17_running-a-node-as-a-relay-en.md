---
parent: 2020-05-05_16-12-19_installing-and-running-the-cardano-node
title: Running Cardano node as a relay
description: Running Cardano node as a relay
order: 3
external_href: ""
last_updated: 2020-06-08T12:08:02.000Z
---
## Running Cardano node as a relay

Within the Cardano environment, there are two types of nodes: Block-producing nodes, and relay nodes, which are nodes with no operational certificates. 

Relay nodes do not have any keys, so they cannot produce blocks. Instead, relays act as proxies between the core network nodes and the internet, establishing a security perimeter around the core, block-producing network nodes. Since external nodes cannot communicate with block-producing nodes directly, relay nodes ensure that the integrity of the core nodes and the blockchain remains intact, even if one or more relays become compromised.

Each node should run on a dedicated server, and the firewall on the block-producing node's server should be configured to only allow incoming connections from its relays.

If a relay node becomes compromised, you can simply switch it off and use a different one.

**Configuring your node communication**

Nodes (both block-producing and relay nodes), are configured in the topology.json file, which defines the network nodes with which your node can communicate.

The [topology.json](https://github.com/input-output-hk/cardano-node/blob/master/doc/getting-started/understanding-config-files.md#the-topologyjson-file) file must specify at least three parameters:

* `addr` - the IP address of the node that your node should talk to.
* `port` - the port that you wish that communication to go through.
* `valency` - defines how many open connections your node should have. This parameter only affects dns addresses. If a dns address is provided, `valency` determines the number of resolved IP addresses that the node should maintain an active connection with. For IP addresses, `valency` is a boolean value where `0` means that the address should be ignored.


**Configuring a relay node via the Cardano CLI**

This procedure assumes the availability of working `config.yaml`, `topology.json`, and `genesis.json` files.

To create a relay node, follow these steps:

1. Create a folder for the node and copy the configuration files.

```
 cd cardano-node
 mkdir relay
 cp config.yaml genesis.json topology.json block-producing/
 cp config.yaml genesis.json topology.json relay/
```

2. Specify the port that the relay node will use for communicating with other nodes. For example, the relay node is configured to communicate with an external node with the URL: relays-new.cardano-mainnet.iohk.io,through port 8081, with valency value of 1 (only one active connection).

relay/topology.json:

```
 {
      {
        "addr": "relays-new.cardano-mainnet.iohk.io",
        "port": 8081,
        "valency": 1
      }
  }
  ```

3. Start the node on the AWS instance, using a terminal multiplexer like tmux. Using tmux enables the aperture of different panes in a single terminal window. 

Install tmux using `sudo yum install tmux -y` and start it with `tmux new`.

4. Start the relay node with this code:

```
 cardano-node run \
     --topology relay/topology.json \
     --database-path relay/db \
     --socket-path relay/db/node.socket \
     --host-addr 127.0.0.1 \
     --port 8081 \
     --config relay/config.yaml
```
