---
parent: 2020-05-05_16-12-19_installing-and-running-the-cardano-node
title: Building a node from source
description: Shelley testnet
order: 2
external_href: ""
last_updated: 2020-05-19T16:19:01.000Z
redirects:
  - from: /en/shelley-haskell/get-started/installing-and-running-the-cardano-node/building-the-node-from-source/
    type: "301"
---
## Installing dependencies
By building and running a node directly from the source code, you can ensure that you get all the latest code updates.

The following instructions presume that you will be running your node on a Linux system and are using cabal. For more information, see the [supported platforms](https://developers.cardano.org/en/testnets/cardano/about/supported-platforms/) page. You can run a node on any platform by [using a virtual machine](https://developers.cardano.org/en/testnets/cardano/get-started/installing-and-running-the-cardano-node/running-the-node-on-an-aws-instance/).

To build and run a node from source, you need the following packages and tools:

* the Haskell platform and Haskell build-tool cabal
* the version control system git
* the gcc C-compiler
* C++ support for gcc
* developer libraries for the the arbitrary precision library gmp
* developer libraries for the compression library zlib
* developer libraries for systemd and ncurses

You can install these dependencies as follows:

For a CentOS/RHEL-based system:
```shell
sudo yum update -y
sudo yum install git gcc gmp-devel -y
sudo yum install zlib-devel systemd-devel ncurses-devel -y
```

For Debian/Ubuntu, use the following instead:

```shell
sudo apt-get update -y
sudo apt-get install build-essential pkg-config libffi-dev libgmp-dev libssl-dev libtinfo-dev libsystemd-dev zlib1g-dev make g++ tmux git jq wget libncursesw5 -y
```

If you are using a different flavor of Linux, you will need to use the package manager suitable for your platform, and the names of the packages you need to install might differ.

## Downloading, unpacking, installing and updating Cabal:

    wget https://downloads.haskell.org/~cabal/cabal-install-3.2.0.0/cabal-install-3.2.0.0-x86_64-unknown-linux.tar.xz
    tar -xf cabal-install-3.2.0.0-x86_64-unknown-linux.tar.xz
    rm cabal-install-3.2.0.0-x86_64-unknown-linux.tar.xz cabal.sig
    mkdir -p ~/.local/bin
    mv cabal ~/.local/bin/

## Downloading and installing GHC:

    wget https://downloads.haskell.org/~ghc/8.6.5/ghc-8.6.5-x86_64-deb9-linux.tar.xz
    tar -xf ghc-8.6.5-x86_64-deb9-linux.tar.xz
    rm ghc-8.6.5-x86_64-deb9-linux.tar.xz
    cd ghc-8.6.5
    ./configure
    sudo yum install ncurses-compat-libs

Add ~/.cabal/bin/ and ~/.local/bin/ to the PATH

Then run:

    cabal update

## Building and running the node from source:

Use the [installing from source instructions](https://docs.cardano.org/projects/cardano-node/en/latest/getting-started/install.html) to build and run the node from source. 
