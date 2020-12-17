---
title: Working with Multi-Asset Tokens
description: Native tokens in Cardano
parent: native-tokens
order: 4
last_updated: "2020-12-10T12:31:00+01:00"
---

## Working with multi-asset tokens

### Minting (creating) tokens

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

### Token minting policies

In Mary, token minting policies are written using multi-signature scripts. This allows the asset controller to express conditions such as the need for specific token issuers to agree to mint new tokens, or to forbid minting tokens after a certain slot (if [token locking](https://docs.cardano.org/en/latest/explore-cardano/what-is-a-hard-fork-combinator.html#token-locking-shelley-protocol-update) is also used).

Here’s an example of a very simple minting policy, which grants the right to mint tokens to a single key:

```
{
  "keyHash": "fe38d7...599",
  "type": "sig"
}
```

This minting policy requires any transaction that mints tokens to be witnessed by the key with the hash `fe38d7...599`. More involved examples can be found in the [multi-signature simple scripts documentation](https://github.com/input-output-hk/cardano-node/blob/c6b574229f76627a058a7e559599d2fc3f40575d/doc/reference/simple-scripts.md).

### Submitting a transaction

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

### Transferring tokens

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

### Buying and spending tokens

Token holders “buy” tokens from a token issuer. This will usually involve sending some ada to a specific address that has been set up by the token issuer and informing the token issuer about the address where the tokens should be sent. The token issuer will then set up a transaction that will transfer a multi-asset token to the specified address.

Tokens that have been issued to a token holder can be “spent” by returning them to a token issuer (i.e. by redeeming the tokens). This is done using a normal transaction. The token issuer will then provide the token holder with the agreed object in return (which may be an item of value, a service, a different kind of token, some ada, etc).

```
cardano-cli transaction build-raw ... --out-file txbody
 
cardano-cli transaction sign ... --tx-body-file txbody --out-file tx

cardano-cli transaction submit ... --tx-file tx 
```

### Destroying (burning) tokens

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
