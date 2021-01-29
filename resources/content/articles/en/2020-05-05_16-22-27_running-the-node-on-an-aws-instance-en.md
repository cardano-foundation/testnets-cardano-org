---
parent: 2020-05-05_16-12-19_installing-and-running-the-cardano-node
title: Running a node on an AWS instance
description: AWS - Shelley testnet
order: 4
external_href: ""
last_updated: 2020-05-19T16:21:56.000Z
redirects:
  - from: /en/shelley-haskell/get-started/installing-and-running-the-cardano-node/running-the-node-on-an-aws-instance/
    type: "301"
---
## Running a node using an AWS instance
If you don't have access to a Linux system, you can run the node on a virtual machine using an Amazon Web Services (AWS) instance.

1. Sign up for a free [AWS account](https://aws.amazon.com/), if you don't have one already. Log in as a root user.
1. Go to the [AWS Management Console](https://aws.amazon.com/console/).
1. Expand the _All Services_ section, and select _EC2_ to open the _EC2 Dashboard_.
1. In the _Resources_ section, select _Volumes_.
1. Click _Create Volume_ and assign the newly created volume a _Size_ of at least 24. This will ensure you have enough memory to successfully run a Cardano node on your AWS instance.
1. Return to the main _EC2 Dashboard_ and click _Launch Instance_.
1. When asked to choose an Amazon Machine Image (AMI), select the _64-bit (x86)_ version of the _Amazon Linux 2 AMI (HVM), SSD Volume Type_ option.
1. When asked to choose an Instance Type, choose _t2.medium_, then click the _Review and Launch_ button. Continue by clicking _Launch_ on the following screen.
1. Follow the instructions provided by AWS to create a key pair for your AWS instance, or use an existing key pair if you have one.
1. From the _Instances_ screen, click the _Connect_ button to connect to your new instance.
1. When asked which connection method to use, select _EC2 Instance Connect_. Press the _Connect_ button.
1. To verify that you new Linux instance is successfully connected, type `echo hello` into the console and press the return key. This should print `hello` to the console.

You now have access to a virtual machine running a Linux system. Follow the instructions on the [building a node from source](https://developers.cardano.org/en/testnets/cardano/get-started/installing-and-running-the-cardano-node/building-the-node-from-source/) page to build and run a Cardano node.
