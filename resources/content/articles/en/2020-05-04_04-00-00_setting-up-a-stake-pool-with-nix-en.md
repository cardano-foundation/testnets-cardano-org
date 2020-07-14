---
title: Setting up a stake pool with Nix
description: Shelley getting started
order: 7
parent: 2020-05-04_04-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/setting-up-a-stake-pool-with-nix/
    type: "301"
---
## Setting up a stake pool with Nix

_This section is brought to you by Samuel Leathers, DevOps lead engineer at IOHK._

The benefits of running a stake pool with Nix are the easy integration and that, using NixOS or a cloud provider that supports NixOps, everything can be deployed across a variety of physical hardware. 

To do this you need to have a running machine with Nix installed from which you can deploy.

### Nix sample scenario

In this example scenario, we will create a stake pool called steak where we assume that the Nix deployment uses the digitalOcean backend. This can be abstracted easily to a number of different cloud providers or physical hardware running NixOS with minimal changes, such as AWS, packer.net, hetzner, or vultr. 

You should start with a basic configuration file that runs jormungandr without any secrets or public IP addresses configured on digital ocean:

```nix
infrastructure.nix

{

    resources.sshKeyPairs.ssh-key = {};

    steak = { config, pkgs, ... }: {

      deployment.targetEnv = "digitalOcean";

      deployment.digitalOcean.region = "nyc3";

      deployment.digitalOcean.size = "s-1vcpu-1gb";

    

      imports = [ ./steak.nix ];

    };

}

steak.nix

{ lib, config, pkgs, ... }:

{

    disabledModules = [ "services/networking/jormungandr.nix" ];

imports = let

    jormungandrNixSrc = builtins.fetchTarball https://github.com/input-output-hk/jormungandr-nix/archive/master.tar.gz;

in [

    (import (jormungandrNixSrc + "/nixos"))

];

environment.systemPackages = with pkgs; [

    jq    # CLI JSON processor

    vim   # Prefered editor, replace with your own

];

}
```


To deploy, run the following commands in the same directory as the above files:

```shell
export DIGITAL_OCEAN_AUTH_TOKEN=YOURAPITOKEN

nix-shell -p nixops

nixops create -d steak-pool infrastructure.nix

nixops deploy -d steak-pool
```


After a brief interval the machine will be fully deployed. You can now login using nixops ssh -d steak-pool steak.

Next you need to create the secrets for the stake pool and register it, using  jormungandr-nix:
```shell
nix-shell -A shells.testnet https://github.com/input-output-hk/jormungandr-nix/archive/master.tar.gz

create-stake-pool -n steak

delegate-stake -s state-jormungandr/steak_owner_wallet.prv -p $(cat state-jormungandr/steak.id)

mkdir keys

cp state-jormungandr/steak-secret.nix keys/jormungandr-secret.nix

cat state-jormungandr/steak_owner_wallet.address

cp state-jormungandr/steak_owner_wallet.prv /some/where/safe/wallet-creds.txt
```


It is important that you copy the prv file to an encrypted password database or other safe location.

At this point, your wallet needs funds. To access funds, go to the [faucet](/en/itn/tools/faucet/) website and request funds for the address output as listed above.

You can also use the key on that page with the send-funds command:

`send-funds -s faucet_address -d your_wallet_address -a 500`

Once you have funds, start jormungandr locally with this command: 

`run-jormungandr`

Now you can register the stake pool and begin to delegate. However, you will need to wait for the stake pool to fully sync first. In another window (also running the nix-shell command above) run:

`send-pool-registration -s $(cat state-jormungandr/steak_owner_wallet.prv) -c state-jormungandr/steak.cert`

`send-delegation -s $(cat state-jormungandr/steak_owner_wallet.prv) -c state-jormungandr/stake_delegation.cert`

Next, you should enable secrets on the stake pool and ensure that the service can listen on port 3000.

`infrastructure.nix`



```nix
    imports = [ ./steak.nix ];

    deployment.keys."jormungandr-secret.nix" = {

      keyFile = ./. + "/keys/jormungandr-secret.nix";

      user = "jormungandr";

      };
    };
}

```

`steak.nix`

```nix

services = {

    jormungandr = {

      enable = true;

      genesisBlockHash = "adbdd5ede31637f6c9bad5c271eec0bc3d0cb9efb86a5b913bb55cba549d0770";

      trustedPeersAddresses = [

      "/ip4/3.123.177.192/tcp/3000"

      "/ip4/52.57.157.167/tcp/3000"

      "/ip4/3.123.155.47/tcp/3000"

      "/ip4/3.115.57.216/tcp/3000"

      "/ip4/3.112.185.217/tcp/3000"

      "/ip4/18.139.40.4/tcp/3000"

      "/ip4/18.140.134.230/tcp/3000"

      ];

      publicAddress = "/ip4/YOURPUBLICIP/tcp/3100";

      topicsOfInterest = {

      messages = "high";

      blocks = "high";

      };

      secrets-paths = [ "/run/keys/jormungandr-secret.nix" ];

      rest.listenAddress = "127.0.0.1:3101";

      logger = {

      level = "info";

      output = "gelf";

      backend = "monitoring.stakepool.cardano-testnet.iohkdev.io:12201";

      logs-id = "steak-and-eggs";

      };

    };

};

networking.firewall.allowedTCPPorts = [ 3100 ];

users.users.jormungandr.extraGroups = [ "keys" ];

}

nixops deploy -d steak-pool
```

At this point you can use the power of NixOS services to update steak.nix to run monitoring. Please note that the sample configuration is not secure so you should run this behind a virtual private network (VPN), or use oauth2.

```nix

    jormungandr-monitor = {

      enable = true;

      port = 3102;

      monitorAddresses = [ ];

    };

    prometheus = {

      enable = true;

      extraFlags = [

      "--storage.tsdb.retention.time 8760h"

      ];

      scrapeConfigs = [

      {

          job_name = "jormungandr";

          scrape_interval = "10s";

          static_configs = [

            {

            targets = [ "127.0.0.1:3102" ];

            labels = { alias = "jormungandr"; };

            }

          ];

      }

      ];

    };

};

networking.firewall.allowedTCPPorts = [ 3000 9090 ];

users.users.jormungandr.extraGroups = [ "keys" ];

}
```

Once you redeploy your node will be ready to create blocks when the stake registers in two epochs. You can also access full monitoring at port 9090 of your instance.

Now you can launch your very own stake pool for jormungandr either on physical hardware running NixOS, or on any cloud provider NixOps currently supports.
