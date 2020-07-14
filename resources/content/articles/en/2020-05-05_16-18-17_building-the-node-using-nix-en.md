---
parent: 2020-05-05_16-12-19_installing-and-running-the-cardano-node
title: Building a node using Nix
description: Nix build - Shelley testnet
order: 1
external_href: ""
last_updated: 2020-05-19T16:17:15.000Z
redirects:
  - from: /en/shelley-haskell/get-started/installing-and-running-the-cardano-node/building-the-node-using-nix/
    type: "301"
---
## Building a node using Nix

[Nix](https://nixos.org/) is a purely functional, cross-platform package manager for Linux and Unix systems. It is the package manager of choice for IOHK's internal development teams, and thus the recommended method for building a Cardano node to run on your machine.

**Note:** The following instructions assume you are using Linux and have curl installed. See the [supported platforms](/shelley/about/supported-platforms/) page for more details about supported platforms for the Shelley testnet.

1. Download and install the Nix package manager by running the following commands from a terminal:

```shell
curl -L https://nixos.org/nix/install -o install-nix.sh
chmod +x ./install-nix.sh
```
2. Create a file with name `nix.conf` and add the following into the file:  

    extra-sandbox-paths = /etc/nsswitch.conf /etc/protocols
    substituters = https://iohk.cachix.org https://hercules-ci.cachix.org https://cache.nixos.org/ https://cache.nixos.org https://hydra.iohk.io https://cache.nixos.org/
    trusted-substituters =
    trusted-public-keys = iohk.cachix.org-1:DpRUyj7h7V830dp/i6Nti+NEO2/nhblbov/8MW7Rqoo= hercules-ci.cachix.org-1:ZZeDl9Va+xe9j+KqdzoBZMFJHVQ42Uu/c/1/KMC5Lw0= hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ= cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY=

3. Run:

```shell
./install-nix.sh --daemon --nix-extra-conf-files nix.conf
```

4. Follow the instructions presented as part of the Nix installation process.

5. Once Nix is installed, open a new `nix-shell` session and enter the following commands, which will clone the Cardano node GitHub repository, open the node file directory, build the node itself, and then run it:

```shell
git clone https://github.com/input-output-hk/cardano-node
cd cardano-node
nix-build -A scripts.ff.node -o ff-node-local
./ff-node-local
```

Please be aware that the process of building the node may take some time, possibly several hours.

You should now have a Cardano node running on your machine, connected to the Shelley testnet.
