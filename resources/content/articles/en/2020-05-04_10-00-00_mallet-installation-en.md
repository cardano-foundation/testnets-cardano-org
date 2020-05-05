---
title: Mallet installation
description: IELE getting started
parent: 2020-05-04_10-00-00_getting-started
order: 6
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/iele/get-started/mallet-installation/
    type: 301
---
## Mallet installation

Mallet, the minimal wallet, is the command line interface used to send transactions, deploy smart contracts, and interact with the IELE and KEVM testnets.

Version 2.0 is written in Javascript as a Node.js library. This means it is:

- cross-platform and has been tested on Linux, Mac and Windows.
- scriptable: Mallet commands are Javascript functions.
- embeddable: it can be imported as a library by other programs.

You can find the source code at [https://github.com/input-output-hk/mallet](https://github.com/input-output-hk/mallet).

### Prerequisites

On Linux and Mac, you will require Node.js 10.4.0, or the latest 
version, and the Git tools. For Windows, you will also need the Windows 
Subsystem for Linux (WSL).

### Enabling the Windows subsystem for Linux

Although there is a Node.js version for Windows, we have detected 
installation problems with it. Therefore, we recommend installing 
Node.js through the WSL.

Enable the Windows Subsystem for Linux option:

1. Click the [Start] button.
1. Type 'powershell'.
1. Right-click it and select 'Run as administrator'.
1. Type:
```
PS C:/> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
1. Restart when prompted.

Enable Windows developer mode:

1. Open the search function and type 'settings'.
1. Enter: 'Update & Security.'
1. Click on 'For developers'.
1. Enable developer mode.
1. Open a command prompt ('powershell').
1. Type `bash`.

From this point on, installing Node.js is the same as installing it 
on any Linux box. Follow the next section with instructions for Linux.

#### Installing Node.js for Linux and MacOS

Open a terminal program and execute:

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Once Node.js is installed, you can install Mallet.

#### Installing Mallet 2.0

To get the latest version of Mallet, you first need to clone the 
repository at https://github.com/input-output-hk/mallet, and then 
install with npm. To do this:

1. Open a terminal window and type in:
```
git clone https://github.com/input-output-hk/mallet
```
1. After cloning the repository, execute: 
```
cd mallet
npm install
```
This will download and install Mallet and its dependencies. 

To check your installation, execute Mallet's help option:

```
./mallet --help
```

If readme opens correctly when you execute –help, it means you have successfully installed mallet.

Otherwise, please repeat the process or feel free to contact us:

Telegram: [@CardanoDevelopersOfficial](https://t.me/CardanoDevelopersOfficial)

Email: [testnet.goguen@iohk.io](mailto:testnet.goguen@iohk.io)
