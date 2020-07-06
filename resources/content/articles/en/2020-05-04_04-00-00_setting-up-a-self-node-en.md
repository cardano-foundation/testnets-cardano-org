---
title: Setting up a self node
description: Shelley getting started
order: 1
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/
    type: "301"
  - from: /en/cardano/shelley/get-started/setting-up-a-self-node/
    type: "301"
---
## Setting up a self node

The first step is to install and set up your self node. The node is the software that implements the underlying Ouroboros protocol that runs Cardano. Its role is to perform tasks to do with networking, transactions, blocks, and so on. 

This node works on most platforms and allows you to connect easily to a blockchain. The Rust source code contains two tools: Jörmungandr, the Cardano node, and the JCLI, its command line interface.

By installing Jörmungandr and JCLI from source you can be sure that you get the latest updates of the code.  You can also install them from a [release](https://github.com/input-output-hk/jormungandr/releases), which may be faster. There are [video tutorials](https://www.youtube.com/playlist?list=PLnPTB0CuBOBzHmIMplX6BT6F3tzKOSFG5) to help you set it up in both ways, or you can follow the instructions below. Currently, the minimum supported version of the Rust compiler is 1.35, but we recommend using the most recent stable version.

How to install Jörmungandr from source:

1. [Install rustup](https://www.rust-lang.org/tools/install) 
1. Run `rustup install stable`
1. Run `rustup default stable`
1. Clone this repository: `git clone --recurse-submodules https://github.com/input-output-hk/jormungandr` 
1. Enter the repository directory: `cd jormungandr` 
1. Install Jörmungandr: `cargo install --path jormungandr` 
1. Install JCLI: `cargo install --path jcli` 

You will also need to do one of the following, depending on your platform:

- on Windows, add `/userProfile/.cargo/bin` to the PATH; 
- on Linux and OSX, add `${HOME}/.cargo/bin` to your ${PATH} 

How to install Jörmungandr from a release:

1. Go to the [releases site](https://github.com/input-output-hk/jormungandr/releases). 
1. Choose the file that matches your hardware and operating system. 
1. Click the link to download the file. 
1. Uncompress the file. 
1. Add the executables to the PATH of your system. 
1. Go to the Scripts folder in the [GitHub repository](https://github.com/input-output-hk/jormungandr/tree/master/scripts). 
1. Open thebootstrap script. 
1. Click the Raw button. 
1. Save it as a script (.sh) and give it executable permissions. 
1. Perform steps 7 to 9 for: 

create-account-and-delegate.shtempl

faucet-send-certificate.shtempl

faucet-send-money.shtempl

send-transaction

1. In Jcli-helpers,execute the `bootstrap.sh` file.
1. To start the node, execute the following command:

```shell
jormungandr --genesis-block block-0.bin --config config.yaml --secret pool-secret1.yaml
```

If you use the bootstrap script you can expect the following results: 

```shell
############################################################

* Consensus: genesis
* REST Port: 8443

############################################################

* CLI version: jcli 0.2.0
* NODE version: jormungandr 0.2.0

############################################################

faucet account: talshgf8qq8790lvwsffyq28v2cyztxcg6vuv85rehafg9kzsja2009cyrhv0y
  * public: ed25519_pk16zfcqp13tlmr5z2fqz3mzkpqjekzxn8rpaq7d122pds5yh2nmewq12mszf
  * secret: ed25519e_sk12q6pzzy8604fk4jkh7yrd5j99dhrltsuyjfg4nnpu8cjkvyz2eg6u8ukz5lv2eyylcz2vx430zp7s053alep6p8zj2Ipt9yvdx2ngpsq5xq7g
  * amount: 1000000000

pool id: 70c2daeb42bdf1c7a9fa7beab8f2213bb9aec5d12421a6f93467705b36e6e8a5
To start the node:
  jormungandr ——genesis—btock ./btock—0. bin ——config ./config.yamt ——secret ./poot—secretl. yamt
To connect using CLI REST:
  jcli rest v0 --host "http://127.0.0.1:8443/api"
For example:
  jcti rest v0 node stats —h "http://127.0.0.1:8443/api"
```

The self node configuration includes a Yaml file (loaded to the bootstrap script) that allows you to build your own blockchain and set its parameters. It bootstraps your own genesis block and enables your machine to run a multi-node environment. Here you can experiment with your own version of Ouroboros Genesis, manually build transactions, and demonstrate the workings of the cryptocurrency. 

If you want to create several nodes or stake pools, or implement and test more complex configurations, you can use a selection of [Nix scripts](https://github.com/input-output-hk/jormungandr-nix) that wrap some of the functions into a one-step process for ease of use.
