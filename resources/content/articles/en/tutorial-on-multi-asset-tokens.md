## Assets and tokens

### Assets

An *asset* is an object that represents value on the blockchain. These objects can be a variety of things, such as a digital asset like ada, a role, a credential, or a quantity of goods.

The term *asset* can refer to either: 

- the identifier of a class of objects, such as “ada” or “couttscoins”;  or 
- a particular quantity of a specific object, such as “100 lovelace”, “24 couttscoins”, “this house” or “these 10 tonnes of coffee”

An asset is uniquely identified by an *asset ID*, which is a pair of both the *policy ID* and *asset name*. It is important to note that although ada can *act* as an asset, it is not represented using an explicit policy ID. 

Tokens that have the same asset ID have the property of being fungible with each other, and are not fungible with tokens that have a different asset ID. An asset ID is a unique identifier for a collection of fungible tokens.

- *PolicyID* - the unique identifier that is associated with a minting policy. Let’s take a look at two policy ID examples: `NFLPlayerCardsPolicyID` and `RushConcertPolicyID`. The ID is computed by applying a hash function to the policy itself, and is thus a sequence of letters and numbers. For example:

```
NFLPlayerCardsPolicyID = e0d123e5f316bef7
```

- *Asset name* - an (immutable) property of an asset that is used to distinguish different assets within the same policy. Unlike the *policyID*, the asset name does not refer to any code or set of rules, and can be common words, such as `‘tickets’` or `‘VIPTickets’`, for example. However, the policy under which an asset is scoped can specify some constraints on valid asset names. 

Different policies can use the same asset names for different tokens. For example, the token bundle:

```
FAKERushConcertPolicyID {  (Tickets, 500),
                           (VIPTickets, 50)}
```

contains the `Tickets` and `VIPTickets` asset names, but these are not fungible with the `RushConcertPolicyID` tickets that have been defined in another token bundle, since they are scoped under different policies.

### Tokens

A *token* is a short term for “asset token”, which is the on-chain representation of an asset and its basic accounting unit. A token can represent one ada, one house, or the value of ten tonnes of coffee, for example. 

## Currencies

*Currency* is a medium of exchange for goods and services that commonly refers to a payment unit. Cardano supports currencies such as ada and native tokens, which act similarly in the network. 

However, ada is the *principal currency* that, at this time, is accepted as fee-payment, to make deposits, and is also the only currency in which rewards are distributed. This property of ada (and no other type of asset) is due to the construction of the underlying consensus protocol. 

Native tokens represent some value and act as an accounting unit, which can be used for payments, transactions, and can be sent to an exchange address. *Native* means that these tokens are supported by the Cardano accounting ledger without the need for additional smart contracts, as the ledger features built-in support to track ownership and transfer of more than one type of asset.

While both ada and native tokens hold value and act as a payment and transaction unit, only ada is used for fees and rewards, while only native tokens can be customly created. 

## Using ada for administrative operations

Ada is Cardano’s principal currency. It is essential to hold ada (besides other currencies) to transfer multi-asset tokens between addresses, since each address must hold a minimum ada value (`min-ada-value`, currently set at 1 ada). 

As a consequence of this design, the following apply:

1. It is impossible to create outputs that contain only custom tokens.
2. The number of each kind of token in an output does not affect the `min-ada-value` of the output, but the **number of types of tokens** contained in an output increases the `min-ada-value`. 
*(The reason for this is that the names and policy IDs of each of the types of tokens take up additional space in the output.)*
3. Sending custom tokens to an address *always* involves sending the `min-ada-value` of ada to that address alongside the custom tokens (by including the ada in the same output). If the address is not spendable by the user that is sending the tokens, the ada sent alongside the tokens no longer belongs to the sender.
> Note: Before transferring custom tokens, users may choose to use off-chain communication to negotiate who supplies the ada to cover the min-ada-value in the output made by the transferring transaction.
4. To recover the ada stored alongside custom tokens in an output O, the user must either:
- Spend the output O, and *burn* the custom tokens that are stored therein
- Spend an output O and an output O’, and consolidate the tokens therein with the same collection of types of custom tokens stored in another output (spent within the same transaction)

> For example:
`(CryptoDoggiesPolicy, poodle, 1)` contained in O can be consolidated with `(CryptoDoggiesPolicy, poodle, 3)` in O’, for a total of `(CryptoDoggiesPolicy, poodle, 4)` in a new output that is made by the consolidating transaction.

5. Splitting custom tokens into more outputs than they were contained in before the transaction was processed requires more total ada to cover the `min-ada-value`, since some ada must be supplied in each output.

## Token bundles

A token bundle is a heterogeneous (‘mixed’) collection of tokens. Any tokens can be bundled together. Token bundles are the standard - and only - way to represent and store assets on the Cardano blockchain.

Token bundles organize tokens into a particular kind of data structure (see example and explanation below), so that which tokens are fungible with which other tokens explicitly adheres to this organization.

In previous versions of the Cardano ledger, ada amounts were specified in transaction and UTxO outputs. With the introduction of multi-asset support, these amounts have been extended with token bundles, which can specify an ada amount alongside quantities of other assets in a single output.

Token bundles are contained in outputs and mint fields of transactions, and the outputs in the UTxO set tracked by the ledger. Note that certain fields of a transaction must still explicitly specify ada amounts, such as the fee field.

**Token bundle example**

Here is an example of a token bundle, let’s call it **TB_Example**:

```
{
NFLPlayerCardsPolicyID {(SomeNFLPlayerCard, 1), 
                        (SomeOtherNFLPlayerCard, 1),
                        (YetAnotherNFLPlayerCard, 1)}


RushConcertPolicyID {(Tickets, 500),
                     (VIPTickets, 50)}
}
```

**How and where are token bundles stored?**

Token bundles can be found: 

1. As the mint field of a transaction, indicating that the transaction is creating the tokens in the bundle.
2. In an output of a transaction or an output in the current UTXO tracked by the ledger, alongside the address of the output, e.g.
`Multi { MyAddress, value: TB_Example }`

**Splitting and combining token bundles**

Transactions can arbitrarily split and combine token bundles into different bundles. For example, we can split the bundle `TB_Example` into two:

*TB_Example_Part1:*

```
NFLPlayerCardsPolicyID {(SomeNFLPlayerCard, 1)}


RushConcertPolicyID {(Tickets, 200),
                     (VIPTickets, 20)}
```

*TB_ExamplePart2:*

```
NFLPlayerCardsPolicyID {(SomeOtherNFLPlayerCard, 1),
                        (YetAnotherNFLPlayerCard, 1)}
 
RushConcertPolicyID {(Tickets, 300),
                     (VIPTickets, 30)}
```

## Comparison with ERC20 tokens

ERC20 is an Ethereum token standard, widely used for the purpose of token issuance on various platforms today. The peculiarity of this token type lies in the fact that it can represent value and serve for such purposes as payments, value transfer, exchange, rewards or incentives, access to services and products, represent voting rights, etc. Also, these tokens can hold both utility and security features, which opens a range of possible use cases for businesses, applications, and enterprises. 

On Cardano, users can create native tokens that will serve the above-mentioned purposes and in addition, it is possible to create *unique* (non-fungible) assets representing value like real estate or intellectual rights, for example (in Ethereum, this functionality requires a separate standard, ERC721). 

Unlike ERC20 tokens, the tracking and accounting of native tokens is supported by the ledger natively (ERC20 tokens require smart contracts to achieve the same thing). An important benefit of using native tokens is that they do not require smart contracts to transfer their value and can be transferred alongside other token types. Also, unlike ERC20, native tokens do not require special transfer fees or additional event-handling logic to track transactions. 

Another advantage of native tokens over ERC20 is security. ERC20 tokens have proven vulnerable to a wide range of [security issues](https://peckshield.medium.com/alert-new-batchoverflow-bug-in-multiple-erc20-smart-contracts-cve-2018-10299-511067db6536). This is conditioned by the fact that ERC20 token creation requires manual modification of the contract standard, which can result in errors and possible bugs. Creating and transacting tokens natively removes the possibility of human error, since the ledger itself handles the token logic. Additionally, over- and under-flow vulnerabilities that are present for ERC20 are eliminated for native tokens, as Cardano’s scripting language does not have fixed-size integers and the ledger itself (rather than the ERC20 user code) tracks tokens movement.

## The multi-asset token lifecycle

The multi-asset token lifecycle consists of five main phases:

1. minting
2. issuing
3. using
4. redeeming
5. burning

Each of these logical phases involves transactions on the Cardano blockchain, which may incur fees in ada. The main groups of actors are:

- **Asset controllers**, who define the policy for the asset class, and *authorise* token issuers to mint/burn tokens. They may also retain co-signing rights for any tokens that are issued/burnt.
- **Token issuers**, who mint new tokens, maintain the reserve of tokens in circulation, issue them to token holders, and burn tokens when they are no longer of use.
- **Token holders**, who hold tokens, send them to other users, use them for payment, and who may redeem them with the issuers when they have finished using them. Token users may include normal users, exchanges etc.

The lifecycle of multi-asset tokens starts with their creation – ***minting***, which refers to the process whereby new tokens are created by one or more *token issuers* in accordance with the *monetary policy script* that the *asset controller* has defined. New tokens will usually be created to fulfil specific purposes. For example, *fungible* or *non-fungible* (unique) tokens may be created to be used for specific payment, purchasing, or exchange needs. When a new token is minted, the total *token supply* for that token increases, but there is no impact on the *ada supply*. Minting coins and transferring them to new addresses may require an ada deposit to be paid, which may be proportional to the number of different tokens that are held, for example.

Token holders will hold tokens in their wallets, may pass them on to other users, exchange them for items of value (including non-native tokens), etc. in exactly the same way that they can use ada. When a user has finished using the token, they may choose to ***redeem*** them. This means that tokens are returned to an issuer (perhaps in return for a product, service, or some other currency, for instance). Once redeemed, tokens could then be re-issued to other users as needed. Token holders will need to maintain some ada in their wallets to pay for transaction fees.

When tokens become redundant, they can be ***burned***, if desired, in accordance with the underlying monetary policy script. The process of burning destroys these tokens (removes them from circulation), and the total token supply decreases. Any deposits will be returned at this point. The burning process is identical for fungible and non-fungible tokens.

> Note: The multi-asset token lifecycle potentially allows tokens to be obtained and reissued by other parties - token holders who act as *reissuers* for the token. This can be done to e.g. enable trading in multiple asset classes, maintain liquidity in one or more tokens (by acting as a broker), or to eliminate the effort/cost of token minting, issuing or metadata server maintenance. Thus, both reissuers and issuers can gain from such a deal - eliminating cost and effort, maintaining separation and integrity, and injecting value into the asset class. 

# How to use multi-asset tokens in the Cardano node

## Prerequisites

This section is for advanced users who are proficient with the Cardano-node [command line interface (CLI)](https://docs.cardano.org/projects/cardano-node/en/latest/reference/cardano-node-cli-reference.html).

This section describes how to:

- create new currencies and assets;
- submit and send transactions containing multi-asset tokens;
- send and receive token bundles;
- manage your addresses and values.

> Note: Users who do not need to create new assets (“token holders”) will be able to send and receive existing multi-asset tokens using a wallet such as Daedalus or Yoroi, and with no requirement to use any CLI commands.

To start, please ensure that you are familiar with setting up and operating the [Cardano node](https://github.com/input-output-hk/cardano-node). Alternatively, see instructions on how to [start your node](https://docs.cardano.org/projects/cardano-node/en/latest/stake-pool-operations/start_your_nodes.html) to submit the commands. You will not need to set up and start a full block producing node (“stake pool”), just a much simpler relay node. This node will need to connect to a Cardano network that is capable of processing native tokens (e.g., the native token pre-production environment (PPE), or the Cardano Mainnet once it has been upgraded).

## How to configure a relay node to connect to the Cardano native tokens pre-production environment

*This document describes how to interact with the node from a bash command line, but it is also possible to download and run the node as a `docker` image, which will involve less system configuration. The docker image is `input-output/cardano-node` - please ensure you have the [latest version](https://github.com/input-output-hk/cardano-node/releases) (1.24.x).*

To configure a relay node to communicate with the pre-production environment for the Mary era, first build and install the node as described in [https://github.com/input-output-hk/cardano-node](https://github.com/input-output-hk/cardano-node), and then set up its configuration:  

```
mkdir -p mary-ppe/config
cd mary-ppe
# download and save the configuration files to the config subdirectory
```

You may then use the following command from the `mary-ppe` directory to start the relay node. Note that you **do not need** to configure and run the node as a “stake pool” (block producing node):

```
export CARDANO_NODE_SOCKET_PATH=socket
 
cardano-node run --topology config/topology.json  
--database-path db --config config/config.json --port 3001 
--socket-path "$CARDANO_NODE_SOCKET_PATH"
```

The latest configuration files can be found [here](https://hydra.iohk.io/job/Cardano/cardano-node/cardano-deployment/latest-finished/download/1/index.html). You will need to download all the files that are associated with the `launchpad` cluster and copy them to your `config` subdirectory.

Once you have started the node, leave it running in its own terminal window (or run it in the background if you prefer).

## Using the Cardano CLI

Once a relay node has been set up, the `cardano-cli` command can be used to interact with the network as usual: 

```
cd mary-ppe
cardano-cli ...
```

Note that multi-asset support is provided as part of the Mary consensus era, so many commands will require the `--mary-era` flag:

```
cardano-cli ... --mary-era
```

## Syntax of multi-asset values

The `cardano-cli` can specify multi-asset values in transaction outputs and when minting or burning tokens. The syntax for these values has been designed to be backwards-compatible with the previous ada-only syntax (`address+lovelace`):

- ada values are defined as integer (INT) lovelace, e.g. `42 lovelace`
- multi-asset values can be defined as:
  - `INT policyid.assetname`, e.g. `42 $MYPOLICY.myassetname`
  - `INT policyid`, e.g. `42 $MYPOLICY` (No asset name specified)
  - `policyid.assetname`, e.g `$MYPOLICY.myassetname` (This will mint only one of `myassetname`)
- Multiple assets can be combined in the same multi-asset value using the `+` operator, e.g:

`100 lovelace + 42 $MYPOLICY.foo + -2 $MYPOLICY.bar + 10 lovelace`

### How to create a transaction 

The multi-asset syntax can be used in the following contexts:

- `cardano-cli transaction build-raw --tx-out="..."`
- `cardano-cli transaction build-raw --mint="..."`

The CLI command `cardano-cli transaction build-raw` creates the transaction body. The `--tx-out` option specifies the transaction output in the usual way *(This is expressed as address+lovelace, where address is a Bech32-encoded address, and lovelace is the amount in lovelace)*, and the `--mint` option specifies the value to be minted or burnt.

### Transaction outputs (TxOuts)

The syntax for TxOut values has been extended to include multi-asset tokens. These values can be specified in two different ways:

- `$address $value`
- `${address}+${value}`

(where *address* is a Cardano address and *value* is a value). The second form is provided for backwards compatibility with earlier versions of the node.

To receive tokens, you just need to specify any address. It is not necessary to use special addresses to hold multi-asset tokens.

### Values

Lovelace values can be specified in two ways:

- `${quantity} lovelace` (where quantity is a signed integer)
- `${quantity}` (where quantity is a signed integer)

Values for other assets can be specified as:

- `${quantity} ${policyId}.${assetName}`
- `${quantity} ${policyId}` 

Where `quantity` is a signed integer and `policyId` is a hex-encoded policy ID [a script hash]), and `assetName` is an alphanumeric asset name. 

**Negating individual values**

Any individual value can be negated using the `-` prefix operator. For example:

- `-42 $MYPOLICY`
- `-72191 $MYPOLICY.foo`
- `-100`
- `-920 lovelace`

**Combining individual values**

Values can be combined using the binary operator `+`. For example:

- `42 lovelace + -1 (this would result in a Value of 41 lovelace)`
- `20 $MYPOLICY + 12 $MYPOLICY.foo + -2 $MYPOLICY.bar`
- `201 4$MYPOLICY.foo + 12 + -1 + 9 lovelace + 10 $MYPOLICY`

To inspect the values in an address, you need to view a UTxO value using:

```
cardano-cli shelley query utxo --mary-era
```

This will show the content of any token bundles that you possess. You can choose to see a specific address using the `--address` `$ADDRESS` option:

```
cardano-cli shelley query utxo --address "$ADDRESS" --mary-era
```

# Working with multi-asset tokens

## Minting (creating) tokens

A transaction can be created to mint tokens using the `transaction build-raw` command with the `--mint` flag. For example:

```
SCRIPT=...
UTXO=...
ADDR=...
LOVELACE=1000
POLICYID=$(cardano-cli transaction policyid --script-file "$SCRIPT")
TX_BODY_FILE=...

cardano-cli transaction build-raw \
       	--mary-era \
        	--fee 0 \
        	--tx-in dacb...7a5 \
          	--tx-out="+$LOVELACE+5 $POLICYID.couttscoin" \
        	--mint="5 $POLICYID.couttscoin" \
        	--out-file "$TX_BODY_FILE"
```

Here, the `$UTXO` is a valid UTxO entry, `$ADDR` is a valid address, `$LOVELACE` is the amount of lovelace that is contained in the `$UTXO` address, and `$SCRIPT` is the path to the file that contains the script for the minting policy. The policy ID has been derived from the minting policy using the corresponding CLI command.

> Note: The transaction has to balance: the amount of lovelace in the output (plus the fee) has to be the same as the value in the consumed UTxO entry; and the amount of tokens in the output has to match the value that is specified in the `--mint` field.

## Token minting policies

In Mary, token minting policies are written using multi-signature scripts. This allows the asset controller to express conditions such as the need for specific token issuers to agree to mint new tokens, or to forbid minting tokens after a certain slot (if [token locking](https://docs.cardano.org/en/latest/explore-cardano/what-is-a-hard-fork-combinator.html#token-locking-shelley-protocol-update) is also used).

Here’s an example of a very simple minting policy, which grants the right to mint tokens to a single key:

```
{
  "keyHash": "fe38d7...599",
  "type": "sig"
}
```

This minting policy requires any transaction that mints tokens to be witnessed by the key with the hash `fe38d7...599`. More involved examples can be found in the [multi-signature simple scripts documentation](https://github.com/input-output-hk/cardano-node/blob/c6b574229f76627a058a7e559599d2fc3f40575d/doc/reference/simple-scripts.md).

## Submitting a transaction

Before submitting the transaction to the network, it needs to be signed. We need witnesses from two keys - one to spend the input `$UTXO`, and one to satisfy the minting policy script:

```
SPENDING_KEY=...
MINTING_KEY=...
TX_BODY_FILE=...
TX_FILE=...

cardano-cli transaction sign \
        	--signing-key-file "$SPENDING_KEY" \
        	--signing-key-file "$MINTING_KEY" \
        	--script-file "$SCRIPT" \
        	--testnet-magic 3 \
        	--tx-body-file  "$TX_BODY_FILE" \
        	--out-file  	"$TX_FILE"
```

Here, `$SPENDING_KEY` is the key that allows spending from `$UTXO`, and `$MINTING_KEY` is the key that hashes to the value specified in the `$SCRIPT`.

To submit a transaction to the network, use the following command:

```
cardano-cli transaction submit --tx-file  "$TX_FILE" --testnet-magic 3
```

The newly minted tokens will appear in the UTxO, and can be checked by:

```
cardano-cli query utxo --mary-era --testnet-magic 3
```

The corresponding output shows the different types of asset that are embedded in the UTxO:

```
 TxHash         TxIx    	Amount


-----------------------------------------------------------------


377eab...ad7 	0    	500000000 lovelace + 5 1cc8a9...a25.couttscoin
377eab...ad7 	1    	500000000 lovelace
```

Once tokens are minted, they can be communicated using ordinary transactions, without using the `--mint` field. Note that in order to be valid, a transaction has to be *balanced*, and you should also have a minimum value of lovelace in every transaction output.

## Transferring tokens

Tokens can be sent just like ada by any token holder. There is a caveat: every transaction output *must* contain some ada. This is because there is a minimum value of ada that is needed per transaction output. This value is given by a protocol parameter. In particular, it is not possible to send *only* multi-asset tokens in a transaction, as some ada always needs to be included in each output.

For example, some `couttscoin` tokens could be sent using the following commands:

```
TXID=$(cardano-cli transaction txid --tx-body-file "$TX_BODY_FILE")
TX_BODY_FILE_1=...
TX_FILE_1=...
 
cardano-cli transaction build-raw \
        	--mary-era \
        	--fee 0 \
        	--tx-in "$TXID"#0 \
          	--tx-out="$ADDR+$LOVELACE+5 $POLICYID.couttscoin" \
        	--out-file "$TX_BODY_FILE_1"
 
cardano-cli transaction sign \
        	--signing-key-file "$SPENDING_KEY" \
         	--testnet-magic 3 \
        	--tx-body-file  "$TX_BODY_FILE_1" \
        	--out-file  	"$TX_FILE_1"
 
cardano-cli transaction submit --tx-file "$TX_FILE_1" --testnet-magic 3
```

## Buying and spending tokens

Token holders “buy” tokens from a token issuer. This will usually involve sending some ada to a specific address that has been set up by the token issuer and informing the token issuer about the address where the tokens should be sent. The token issuer will then set up a transaction that will transfer a multi-asset token to the specified address.

Tokens that have been issued to a token holder can be “spent” by returning them to a token issuer (i.e. by redeeming the tokens). This is done using a normal transaction. The token issuer will then provide the token holder with the agreed object in return (which may be an item of value, a service, a different kind of token, some ada, etc).

```
cardano-cli transaction build-raw ... --out-file txbody
 
cardano-cli transaction sign ... --tx-body-file txbody --out-file tx

cardano-cli transaction submit ... --tx-file tx 
```

## Destroying (burning) tokens

Tokens can be destroyed by a token issuer according to the token policy by supplying a negative value in the `--mint` field. That allows acquiring tokens in the UTxO entry in the input of a transaction, without adding them to one of the outputs, effectively destroying them. For example, tokens created in the previous section can be destroyed as follows:

```
TXID1=$(cardano-cli transaction txid --tx-body-file "$TX_BODY_FILE_1")
TX_BODY_FILE_2=...
TX_FILE_2=...
 
cardano-cli transaction build-raw \
        	--mary-era \
        	--fee 0 \
        	--tx-in "$TXID1"#0 \
          	--tx-out="$ADDR+$LOVELACE" \
         	--mint="-5 $POLICYID.couttscoin" \
       	--out-file "$TX_BODY_FILE_2"
 
cardano-cli transaction sign \
        	--signing-key-file "$SPENDING_KEY" \
         	--signing-key-file "$MINTING_KEY" \
        	--script-file "$SCRIPT" \
 
        	--testnet-magic 3 \
        	--tx-body-file  "$TX_BODY_FILE_2" \
        	--out-file  	"TX_FILE_2"
 
cardano-cli transaction submit --tx-file  "$TX_FILE_2" --testnet-magic 3
```

> Note: Destroying tokens requires both the payment credential for using the UTxO entry with the tokens, *and* a credential for the minting policy script.













