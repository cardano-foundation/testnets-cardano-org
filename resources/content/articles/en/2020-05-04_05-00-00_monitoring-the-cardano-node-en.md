---
parent: 2020-05-04_05-00-00_monitor
title: Monitoring the Cardano node
description: Shelley monitor
order: 2
last_updated: 2020-05-01T08:00:00.000Z
redirects:
  - from: /en/shelley-haskell/monitor/monitoring-the-cardano-node/
    type: 301
---
## Monitoring the Cardano node

When your node is up and running you should monitor its behaviour regularly. By doing this you can see how everything is running, if your system is performing as it should to keep the node running, and if there is anything that you can do to fine tune system performance. 

You can activate a trace on the node so that you can access metrics about how the node is performing, such as network traffic, memory usage, and general blockchain data. You turn on monitoring in the node configuration file by turning on the Cardano real time view service flag. When this flag is enabled the node forwards metrics to this external service. This gives you access to the performance of the node and a trace of the node components. It provides you with a web-based view of the node metrics and covers aspects such as chain density, slot information, and epoch details. 

If you have the node running on a local machine, you can also use the Haskell library EKG to monitor node performance using [these steps](https://github.com/input-output-hk/cardano-tutorials/blob/brunjlar/node-setup/node-setup/ekg.md).
