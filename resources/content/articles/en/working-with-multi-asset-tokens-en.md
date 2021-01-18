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

## Example: Minting a new native asset

### Overview

This section describes how to manually mint a new native asset ('melcoin') using cardano-cli, and send a transaction of this newly minted asset to a new address. The code
used throughout pertains to the *Mary* Testnet. For the mainnet, replace `--network-magic 3` with `--mainnet` in all commands.
 
### Pre-requisites 

1. Download the node and config files for the Mary testnet (Launchpad) using this code

```bash
wget https://hydra.iohk.io/build/5266641/download/1/cardano-node-1.24.2-linux.tar.gz
tar xzvf cardano-node-1.24.2-linux.tar.gz
mkdir lpconfig && cd lpconfig
wget https://hydra.iohk.io/build/5102327/download/1/launchpad-config.json
wget https://hydra.iohk.io/build/5102327/download/1/launchpad-byron-genesis.json
wget https://hydra.iohk.io/build/5102327/download/1/launchpad-shelley-genesis.json
wget https://hydra.iohk.io/build/5102327/download/1/launchpad-topology.json
cd ..
```

2. Run cardano-node

```bash
./cardano-node run --topology ./lpconfig/launchpad-topology.json --database-path ./state-lp --port 3001
--config ./lpconfig/launchpad-config.json --socket-path ~/cardano-lp.socket

export CARDANO_NODE_SOCKET_PATH=~/cardano-lp.socket
```
3. Generate a verification key and a signing key

```bash
cardano-cli address key-gen \
    --verification-key-file pay.vkey \
    --signing-key-file pay.skey
```

The code should output something similar to this:

```bash
$ cat pay.skey 
{
    "type": "PaymentSigningKeyShelley_ed25519",
    "description": "Payment Signing Key",
    "cborHex": "5820aed07e0b1ddd946da278ffb1f671cc5b24c8453e6b47c24b0a6b15d818444fe8"
}
$ cat pay.vkey 
{
    "type": "PaymentVerificationKeyShelley_ed25519",
    "description": "Payment Verification Key",
    "cborHex": "582031752dd50ffe7ed90ba136ea775dacd5113ff67d13001a25aac953f719aa1f92"
}

```

4. Generate the payment address

```bash
./cardano-cli address build \
--payment-verification-key-file pay.vkey \
--out-file pay.addr \
--testnet-magic 3
```

This code produces the following payment address:

```bash
$ cat pay.addr 
addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz
```

5. Check the balance of the payment address

```bash
./cardano-cli query utxo --address addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz --testnet-magic 3 --mary-era
```
The response should show no funds:
```bash
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
```

6. Fund the address and check again

```bash
./cardano-cli query utxo --address addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz --testnet-magic 3 --mary-era

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
b1ddb0347fed2aecc7f00caabaaf2634f8e2d17541f6237bbed78e2092e1c414     0        1000000000 lovelace

```

7. Export the protocol parameters to a file for later use

```bash
cardano-cli  query protocol-parameters \
--mainnet \
--out-file protocol.json

```

### Start the minting process

1. Create a policy

```bash

mkdir policy

cardano-cli address key-gen \
    --verification-key-file policy/policy.vkey \
    --signing-key-file policy/policy.skey


touch policy/policy.script && echo "" > policy/policy.script 


echo "{" >> policy/policy.script 
echo "  \"keyHash\": \"$(./cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey)\"," >> policy/policy.script 
echo "  \"type\": \"sig\"" >> policy/policy.script 
echo "}" >> policy/policy.script 

cat ./policy/policy.script 
{
  "keyHash": "5805823e303fb28231a736a3eb4420261bb42019dc3605dd83cccd04",
  "type": "sig"
}

```

2. Mint the new asset

```bash 

$ ./cardano-cli transaction policyid --script-file ./policy/policy.script 
328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b

```

### Build the raw transaction

1. Use this code to build the raw transaction

```

./cardano-cli transaction build-raw \
	     --mary-era \
             --fee 0 \
             --tx-in b1ddb0347fed2aecc7f00caabaaf2634f8e2d17541f6237bbed78e2092e1c414#0 \
             --tx-out addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz+1000000000+"1000000000 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --mint="1000000000 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --out-file matx.raw

$ cat matx.raw 
{
    "type": "TxBodyMary",
    "description": "",
    "cborHex": "82a40081825820b1ddb0347fed2aecc7f00caabaaf2634f8e2d17541f6237bbed78e2092e1c41400018182581d6019fb71e45c300445430b35a7f395820df96554850c308bc29020cec7821a3b9a
    ca00a1581c328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47ba1476d656c636f696e1a3b9aca00020009a1581c328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47ba1476d656c636f696e1a3b9aca00f6"
}
```


### Calculate the minimum fee

Use this code to calculate the minimum fee required for the transaction.
```
./cardano-cli transaction calculate-min-fee \
--tx-body-file matx.raw \
--tx-in-count 1 \
--tx-out-count 1 \
--witness-count 2 \
--testnet-magic 3 \
--protocol-params-file protocol.json

180109 Lovelace

```

### Build the transaction again

The transaction will now include the fee.

```

./cardano-cli transaction build-raw \
	     --mary-era \
             --fee 180109 \
             --tx-in b1ddb0347fed2aecc7f00caabaaf2634f8e2d17541f6237bbed78e2092e1c414#0 \
             --tx-out addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz+999819891+"1000000000 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --mint="1000000000 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --out-file matx.raw

$ cat matx.raw 
{
    "type": "TxBodyMary",
    "description": "",
    "cborHex": "82a40081825820b1ddb0347fed2aecc7f00caabaaf2634f8e2d17541f6237bbed78e2092e1c41400018182581d6019fb71e45c300445430b35a7f3958
    20df96554850c308bc29020cec7821a3b980a73a1581c328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47ba1476d656c636f696e1a3b9aca00021a0002bf8d09a1581c328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47ba1476d656c636f696e1a3b9aca00f6"
}

```

### Sign the transaction

```
./cardano-cli transaction sign \
	     --signing-key-file pay.skey \
	     --signing-key-file policy/policy.skey \
	     --script-file policy/policy.script \
	     --testnet-magic 3 \
	     --tx-body-file matx.raw \
         --out-file matx.signed

$ cat matx.signed
{
    "type": "Tx MaryEra",
    "description": "",
    "cborHex": "83a40081825820b1ddb0347fed2aecc7f00caabaaf2634f8e2d17541f6237bbed78e2092e1c41400018182581d6019fb71e45c300445430b35a7f395820df96554850c308bc29020cec7821a3b980a73a1581c328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47ba1476d656c636f696e1a3b9aca00021a0002bf8d09a1581c328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47ba1476d656c636f696e1a3b9aca00a2008282582031752dd50ffe7ed90ba136ea775dacd5113ff67d13001a25aac953f719aa1f9258406c8639a645fabe8f040e1bc4d9aff6db25ad98aead2f5558f322087430ce3896e44fadb18d2d0fec9302c8a36a8a66653df6c181700dbdf5c2df2f1af4c4ab048258206829bde3df4b212def84a4d8c14aa5232356aa53395cbdc575fa01fac167439a58407d3171701eabd7e118e45beb9f23ac95b5a73ec3de0449917a27e18106e554473247978a8b02f9edbe489940047ce41f1922f93042d3157b4a5146692e848c0701818200581c5805823e303fb28231a736a3eb4420261bb42019dc3605dd83cccd04f6"
}


```

### Submit the transaction

```bash
./cardano-cli transaction submit --tx-file  matx.signed --testnet-magic 3
```
No response, which is the expected result. Check the Utxo for 

addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz
```bash
./cardano-cli query utxo --address addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz --testnet-magic 3 --mary-era

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
fd0790f3984348f65ee22f35480b873b4eb9862065514f3e3a9c0f04d0a6ad63     0        999821915 lovelace + 1000000000 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin

```

### Send the new native asset to another address

1. Generate a recipient address:

First, we need to generate an address to send the newly minted asset to.

```bash
mkdir recipient
```

2. Generate the key pair

```
cardano-cli address key-gen \
    --verification-key-file recipient/recipientpay.vkey \
    --signing-key-file recipient/recipientpay.skey
```    
    

2. Derive the payment address
```
./cardano-cli address build \
--payment-verification-key-file recipient/recipientpay.vkey \
--out-file recipient/recipientpay.addr \
--testnet-magic 3

$ cat recipient/recipientpay.addr 
addr_test1vp8s8zu6mr73nvlsjf935k0a38n8xvp3fptkyz2vl8pserqkcx5yz

```
3. Send 1 melcoin to the recipient address

```bash
./cardano-cli transaction build-raw \
	     --mary-era \
             --fee 0 \
             --tx-in fd0790f3984348f65ee22f35480b873b4eb9862065514f3e3a9c0f04d0a6ad63#0 \
             --tx-out addr_test1vp8s8zu6mr73nvlsjf935k0a38n8xvp3fptkyz2vl8pserqkcx5yz+10000000+"1 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --tx-out addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz+999821915+"999000000 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --out-file rec_matx.raw
```

4. Calculate the min fee

Use this code to calculate the minimum fee for the transaction.

```
./cardano-cli transaction calculate-min-fee \
--tx-body-file rec_matx.raw \
--tx-in-count 1 \
--tx-out-count 2 \
--witness-count 1 \
--testnet-magic 3 \
--protocol-params-file protocol.json

178393 Lovelace

./cardano-cli transaction build-raw \
	     --mary-era \
             --fee 178393 \
             --tx-in fd0790f3984348f65ee22f35480b873b4eb9862065514f3e3a9c0f04d0a6ad63#0 \
             --tx-out addr_test1vp8s8zu6mr73nvlsjf935k0a38n8xvp3fptkyz2vl8pserqkcx5yz+10000000+"1 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --tx-out addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz+989643522+"999999999 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin" \
             --out-file rec_matx.raw
```

### Sign the transaction

Sign the transaction using the keys generated earlier.
```
./cardano-cli transaction sign \
	     --signing-key-file pay.skey \
	     --testnet-magic 3 \
	     --tx-body-file rec_matx.raw \
         --out-file rec_matx.signed
```

### Submit the transaction

Submit the transaction to the chain.
```
./cardano-cli transaction submit --tx-file  rec_matx.signed --testnet-magic 3

```
Note that we must send more than 1000000 Lovelace in the transaction. This minimum value is specified in the config file:

```bash
$ cat lpconfig/launchpad-shelley-genesis.json | grep minUTxOValue
        "minUTxOValue": 1000000,

```

### Check the Utxo for address addr_test1vp8s8zu6mr73nvlsjf935k0a38n8xvp3fptkyz2vl8pserqkcx5yz

```bash
./cardano-cli query utxo --address addr_test1vp8s8zu6mr73nvlsjf935k0a38n8xvp3fptkyz2vl8pserqkcx5yz --testnet-magic 3 --mary-era

                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
f90b8457a2cf6a1aba9c0001ae2c7084f653083c6108826115a0a64e862333a3     0        10000000 lovelace + 1 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin

```
The recipient address we created now has 10000000 Lovelace and 1 melcoin.


### Check the utxo for address addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz

```bash

./cardano-cli query utxo --address addr_test1vqvlku0ytscqg32rpv660uu4sgxlje25s5xrpz7zjqsva3c8pfckz --testnet-magic 3 --mary-era
                           TxHash                                 TxIx        Amount
--------------------------------------------------------------------------------------
f90b8457a2cf6a1aba9c0001ae2c7084f653083c6108826115a0a64e862333a3     1        989643522 lovelace + 999999999 328a60495759e0d8e244eca5b85b2467d142c8a755d6cd0592dff47b.melcoin
```
The sender address now has 989643522 Lovelace and 999999999 melcoin.


Important: The testnet ada has not been removed from these addresses. If you are using these addresses for testing purposes, please take just a little ada and send the remainder back to the above addresses, so others can use them.

#### Further resources about native assets

[This page](https://developers.cardano.org/en/development-environments/native-tokens/native-tokens/) offers an overview about native assets.

