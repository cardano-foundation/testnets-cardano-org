---
title: Diagnosing problems
order: 10
parent: shelley-itn-getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/cardano/shelley/get-started/diagnosing-problems/
    type: 301
---
## Diagnosing problems

If you experience any problems while setting up your network, we are 
here to help. Logs created by the nodes will help us classify any 
problems and suggest solutions. The log levels used are info, debug, and
trace.

We support Graylog extended log format ([Gelf](https://docs.graylog.org/en/3.1/pages/gelf.html))
output. If you want to use our Graylog server to capture logs, you need
to ensure that logging is configured to point to the location of [this server](https://monitoring.stakepool.cardano-testnet.iohkdev.io/) in your configuration file.

If you are running the node without peers, you will see an expected 
warning about skipping bootstrap. After a few minutes, depending on your
configured slot length, you will see logs indicating that blocks have 
been created successfully. You can also check the expected block 
creation schedule for a stake pool via the REST API.

We encourage you to share your ideas and suggestions on our dedicated [support page](https://iohk.zendesk.com/hc/en-us/categories/360002392053-Shelley-Incentivised-Testnet) so that we can create a library of solutions and support for the tasks that you need to perform.
