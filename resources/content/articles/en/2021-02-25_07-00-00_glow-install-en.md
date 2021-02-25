---
title: Installing Glow
description: Installing Glow
parent: 2021-02-03_07-00-00_getting-started
order: 3
last_updated: "2021-02-25T09:00:00+01:00"
---
## Installing Glow

The first step is to install Glow so that you can get started. Glow can be installed on either Linux or MacOs.  You can run the installation inside a virtual machine and for extra security we recommend that you use [Qubes OS](https://www.qubes-os.org/).

To install Glow, follow these steps:
1. Open a terminal window (or any application on your system that allows you to enter shell commands).
2. Type the following command line:
`curl -L https://glow-lang.org/install/glow-install | sh`

This installation script first installs the [Nix](https://nixos.org/) package manager, which may require you to manually type yes, or y and/or type the administrator password to authorize parts of the installation. If you weren’t using Nix before, you may have to start a new shell for the PATH to be set up correctly and be able to run glow.

Note: If you use Linux or macOS on x86_64, all the binary packages for the software are cached, and the installation should only take a few minutes, depending on the speed of your internet connection. This software may require over 2GB of memory, so please ensure that you have enough available space on disk. If you use another platform, your computer may recompile code from source, so you should let it run overnight.

We plan to release a Docker image soon, so please check back for updates. 
