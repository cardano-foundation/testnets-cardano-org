---
parent: 2020-05-05_16-12-19_installing-and-running-the-cardano-node
title: Building the node from source
description: Source node build - Shelley Haskell testnet
order: 2
external_href: ""
last_updated: 2020-05-05T16:19:01.000Z
---
<!--StartFragment-->

By building and running the node directly from the source code, you can ensure that you get all the latest code updates.

The following instructions presume that you will be running your node on a Linux system and are using cabal. For more information, see the supported platforms page. You can run a node on any platform by using a virtual machine, although instructions on how to set up a virtual machine to do so are not provided here. See the [community content](https://staging-updated-testnets-cardano.netlify.app/admin/#/collections/articles-en/entries/2020-05-04_05-00-00_community-en) section for additional information about virtual machines.

To build and run the node from source, you need the following packages and tools:

* the Haskell platform and Haskell build-tool cabal (stack can also be used)
* the version control system git
* the gcc C-compiler
* C++ support for gcc
* developer libraries for the the arbitrary precision library gmp
* developer libraries for the compression library zlib
* developer libraries for systemd and ncurses

You can install these dependencies as follows:

`sudo yum update -y `\
`sudo yum install git gcc gmp-devel -y `\
`sudo yum install zlib-devel systemd-devel ncurses-devel -y `\
`curl -sSL https://get.haskellstack.org/ | sh`

If you are using a different flavor of Linux, you will need to use the package manager suitable for your platform, instead of yum, and the names of the packages you need to install might differ.

How to build and run the node from source:

1. In the terminal, run the following git command to clone the Cardano node repository and download the source code: `git clone `[`https://github.com/input-output-hk/cardano-node.git`](https://github.com/input-output-hk/cardano-node.git) \
   This should create a `cardano-node` folder.
2. Download the latest source code from the releases page to this folder. \
   After the download has finished, you can check the contents using the following command: `ls cardano-node`
3. Change your working directory to the folder in which the source code was downloaded using the following command:\
   `cd cardano-node`
4. You should check out the latest release, for example tag 1.10.0 using the following command:\
   `git fetch --all --tags`\
   `git checkout tags/1.10.0`
5. Build the source code using Cabal by running the following command:\
   `build all` \
   Please note that building the node may take some time, possibly several hours. If you prefer you can also build the source code using stack. 

   6. Run the following command to initialize the node:\
   `./scripts/shelley-testnet-live.sh`