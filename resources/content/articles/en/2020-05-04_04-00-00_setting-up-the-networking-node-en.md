---
title: Setting up the networking node
description: Shelley ITN getting started
order: 3
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/setting-up-the-networking-node/
    type: 301
---
## Setting up the networking node

You can choose to download pre-compiled binaries directly from the Jörmungandr [releases page](https://github.com/input-output-hk/jormungandr/releases) where the list of assets we provide for each release is outlined.

To install the Jörmungandr networking node, follow [these steps for Mac](https://iohk.zendesk.com/hc/en-us/articles/360036898153), [these steps for Linux](https://iohk.zendesk.com/hc/en-us/articles/360039342934-How-to-install-Jormungandr-Networking-Linux-), or [these steps for Windows](https://iohk.zendesk.com/hc/en-us/articles/360036898353). As an alternative, you can use Nix to install Jörmungandr, please refer to the [Nix installation instructions](https://iohk.zendesk.com/hc/en-us/articles/360037059013-Nix-for-stakepool-oparators).

Also, you can use Chocolatey and Snappy installers to make the installation process easier.

If you are using Chocolatey for Windows, run this command:

```shell
choco install jormungandr --upgrade
```

If you are using Snappy for Linux, run this command:

```shell
snap install jormungandr
```
