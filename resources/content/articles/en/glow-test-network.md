---
title: Setting up the Test Network
description: Setting up the Test Network
parent: 2021-02-03_07-00-00_getting-started
order: 3
last_updated: "2021-02-25T09:00:00+01:00"
---
## Setting up the Test Network

By default, Glow will use the Cardano EVM Devnet (“ced”)—a public network on which you can interact with other users. You may experience a short delay of a minute or so when confirming each step of the interaction.

For faster local-only tests with confirmations in a couple of seconds, you can instead run your own private Ethereum test network (“pet”) on your computer with these instructions. You should add the flags --evm-network pet to your invocations of Glow, as follows:

`git clone https://github.com/fare/gerbil-ethereum.git
cd gerbil-ethereum
./scripts/run-ethereum-test-net.ss`

### Creating Keys
Each participant must first generate their own identity on their own machine, with their own secret key, as follows:

Alice:
`glow generate-identity --nickname Alice`

Bob:
`glow generate-identity --nickname Bob`

### Sharing Contact Information
After creating your key, you must share it with the other participant in the interaction (for example, using a chat application such as Slack).

First, each participant lists their address using:
`glow list-identities`

The listed addresses will appear in the following format (these are examples):
`Alice [ 0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1 ]`
`Bob [ 0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD ]`

Each participant then uses a copy and paste function to share their address with the other participant, who will register it as follows:
Alice replaces the address with Bob’s actual address, as follows:
`address=0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD`
`glow add-contact --nickname Bob --address ${address}`

Bob replaces the address with Alice’s actual address, as follows:
`address=0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1`
`glow add-contact --nickname Alice --address ${address}`

### Getting Tokens from the Faucet:
As your address is a new address it does not have any tokens to spend, or to use to pay for gas. To get some tokens for your address you can use the test network’s faucet, as follows:

Alice runs:
`glow faucet --to Alice --evm-network pet`

Bob runs:
`glow faucet --to Bob --evm-network pet`

(If you are using your own private Ethereum test network, the two commands above and every command below (with the exception of the digest command) are where you must add the flags --evm-network pet to your invocations of glow.)

### Configuring the Interactions
This section outlines how you should configure the contract interactions of Alice and Bob. 

#### Setting up Alice’s Interaction
One of the two participants writes a document for the other to sign. For example, Alice prepares the following document and sends it to Bob for review:

`echo “Bob sells BLAH to Alice” > document.txt`

When both agree on the document, they should each compute its digest with:

`glow digest document.txt`

Now, Alice can sign the interaction. In the scenario where you are running the interactions on the same machine, you should specify a database so the two users will not conflict with each other’s data; the extra database specification is not necessary if the users are running on different machines.

`glow start-interaction --database run/Alice --evm-network pet`

The CLI will then prompt Alice to select an application, choose which identity to use for the interaction, which role they will play in it, assign addresses to roles of the other identities, enter the interaction parameters, and finally, print the interaction agreement for Alice to send to Bob, so that he can configure his side of the interaction with the same parameters.

Here is an example of what the setup should look like from Alice’s side:

Choose application:
1) coin_flip
2) buy_sig
3) rps_simple
Enter number
> 2

Choose your identity:
1) Alice - 0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1
Enter number
> 1

Choose your role:
1) Buyer
2) Seller
Enter number
> 1

Assign roles
Select address for Seller:
1) Bob - 0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD
Enter number
> 1

Define parameters
Enter digest
> 0x07887c5873ad098e96297f041eb0736ed50d33cf7010f1786f63cddf3b0b8b20
Enter price
> 1000

Max initial block [ Current block number is 350 ]
> 500

One line command for other participants to generate the same agreement:
./glow start-interaction --agreement '{"glow-version":"Glow v0.0-894-g575c859","interaction":"mukn/glow/examples/buy_sig#payForSignature","participants":{"Buyer":"0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1","Seller":"0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD"},"parameters":{"digest":"0x07887c5873ad098e96297f041eb0736ed50d33cf7010f1786f63cddf3b0b8b20","price":"0x3e8"},"reference":{},"options":{"blockchain":"Private Ethereum Testnet","timeoutInBlocks":"0x1f4","maxInitialBlock":"0x1f4"},"code-digest":"0x16c5659f6e3c70f0c53ac5abf3977e658093f1f5880bd478de8d3a87c92d9607"}'
Setup interaction (Bob)

Bob has a lot less steps since the agreement contains all of the parameters. He just needs to specify which identity and role he is going to use in the interaction. Note also the database option that was appended to separate Bob’s database from Alice’s when running both participants on the same machine.

glow start-interaction --agreement '{"glow-version":"Glow v0.0-894-g575c859","interaction":"mukn/glow/examples/buy_sig#payForSignature","participants":{"Buyer":"0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1","Seller":"0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD"},"parameters":{"digest":"0x07887c5873ad098e96297f041eb0736ed50d33cf7010f1786f63cddf3b0b8b20","price":"0x3e8"},"reference":{},"options":{"blockchain":"Private Ethereum Testnet","timeoutInBlocks":"0x1f4","maxInitialBlock":"0x1f4"},"code-digest":"0x16c5659f6e3c70f0c53ac5abf3977e658093f1f5880bd478de8d3a87c92d9607"}' --evm-network pet --database run/B

Choose your identity:
1) Bob - 0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD
Enter number
> 1

Choose your role:
1) Buyer
2) Seller
Enter number
> 2

Start interaction (Alice)

After setting up the interaction, the Glow runtime will deploy an EVM smart contract to the configured network and generate a handshake to send to Bob. The handshake is for Bob to verify that the on-chain contract corresponds to everything specified in the agreement.

Send the handshake below to the other participant:
{"agreement":{"glow-version":"Glow v0.0-894-g575c859","interaction":"mukn/glow/examples/buy_sig#payForSignature","participants":{"Buyer":"0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1","Seller":"0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD"},"parameters":{"digest":"0x07887c5873ad098e96297f041eb0736ed50d33cf7010f1786f63cddf3b0b8b20","price":"0x3e8"},"reference":{},"options":{"blockchain":"Private Ethereum Testnet","timeoutInBlocks":"0x1f4","maxInitialBlock":"0x1f4"},"code-digest":"0x16c5659f6e3c70f0c53ac5abf3977e658093f1f5880bd478de8d3a87c92d9607"},"contract-config":{"contract-address":"0x9533A6610DBd92fa5C9E46364b2b36b8D37C1874","code-hash":"0x30e92fcb774f9f205242dce3f112025f999f18c6d45971f4fc48ed8fa807c1d9","creation-hash":"0xb9a04dea24f5fee9b7cbb3f4446d124bc884e869195e9d91e975ad2e3bc2a30b","creation-block":"0x16de"},"published-data":"0x"}

Run interaction (Alice + Bob)

All Bob has left to do is paste the handshake when prompted and the runtime will handle everything from there. First by generating a signature of the digest and then publishing it on-chain. Alice’s runtime will then watch the network for transactions against the contract to see Bob’s move, and both runtimes should run to completion without requiring any more user input.

The last thing the runtime does is print all the variables that were bound during execution of the contract, with the signature being purchased highlighted for both participants.

#### Setting up Bob's Interaction
Bob’s interaction does not require as many steps since the agreement contains all of the parameters already. He just needs to specify which identity and role he is going to use in the interaction. Note also the database option that was appended to separate Bob’s database from Alice’s, when running both participants on the same machine.

glow start-interaction --agreement '{"glow-version":"Glow v0.0-894-g575c859","interaction":"mukn/glow/examples/buy_sig#payForSignature","participants":{"Buyer":"0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1","Seller":"0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD"},"parameters":{"digest":"0x07887c5873ad098e96297f041eb0736ed50d33cf7010f1786f63cddf3b0b8b20","price":"0x3e8"},"reference":{},"options":{"blockchain":"Private Ethereum Testnet","timeoutInBlocks":"0x1f4","maxInitialBlock":"0x1f4"},"code-digest":"0x16c5659f6e3c70f0c53ac5abf3977e658093f1f5880bd478de8d3a87c92d9607"}' --evm-network pet --database run/B

Choose your identity:
1) Bob - 0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD
Enter number
> 1

Choose your role:
1) Buyer
2) Seller
Enter number
> 2

#### Starting Alice’s Interaction
After setting up the interaction, the Glow runtime will deploy an EVM smart contract to the configured network and generate a handshake to send to Bob. The handshake is for Bob to verify that the on-chain contract corresponds to everything that is specified in the agreement.

Send the handshake below to the other participant:
{"agreement":{"glow-version":"Glow v0.0-894-g575c859","interaction":"mukn/glow/examples/buy_sig#payForSignature","participants":{"Buyer":"0xa71CEb0990dD1f29C2a064c29392Fe66baf05aE1","Seller":"0xb0bb1ed229f5Ed588495AC9739eD1555f5c3aabD"},"parameters":{"digest":"0x07887c5873ad098e96297f041eb0736ed50d33cf7010f1786f63cddf3b0b8b20","price":"0x3e8"},"reference":{},"options":{"blockchain":"Private Ethereum Testnet","timeoutInBlocks":"0x1f4","maxInitialBlock":"0x1f4"},"code-digest":"0x16c5659f6e3c70f0c53ac5abf3977e658093f1f5880bd478de8d3a87c92d9607"},"contract-config":{"contract-address":"0x9533A6610DBd92fa5C9E46364b2b36b8D37C1874","code-hash":"0x30e92fcb774f9f205242dce3f112025f999f18c6d45971f4fc48ed8fa807c1d9","creation-hash":"0xb9a04dea24f5fee9b7cbb3f4446d124bc884e869195e9d91e975ad2e3bc2a30b","creation-block":"0x16de"},"published-data":"0x"}

#### Running the Alice and Bob Interaction
All Bob has left to do is paste the handshake when he is prompted to do so and the runtime component will handle everything from there. The first thing that will happen is that a signature of the digest is generated and then published on-chain. Alice’s runtime component will then watch the network for transactions against the contract to see Bob’s move, and both runtimes should run to completion without requiring any more user input.

The last thing the runtime component does is to print all the variables that were bound during execution of the contract, with the signature that is being purchased highlighted for both participants.







