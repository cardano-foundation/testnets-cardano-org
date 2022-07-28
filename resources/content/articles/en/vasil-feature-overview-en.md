---
title: Vasil feature overview
description: About Vasil
parent: 2020-05-04_05-00-00_about
order: 2
---

## Diffusion pipelining

Diffusion pipelining is a feature that improves block propagation times and further leads to higher throughput. In essence, it streamlines the process of sharing information about newly created blocks among network participants. The goal of this upgrade is to ensure that blocks can be shared (propagated) in the network within five seconds after their creation. For this, diffusion pipelining propagates blocks before their full validation thus overlapping the time spent on diffusion with the time needed on validation.

Pipelining also ensures that the block header referencing the hash of a previous block is propagated correctly. The body of the block is retained within the metadata included in the next block, which is essential for DDoS attack resistance even without full block confirmation.

Diffusion pipelining provides more space for block size increase and Plutus script improvements, leading to a more scalable setting overall. 

## Plutus Core changes

Plutus Core is a scripting language used in the Cardano ledger. It consists of basic core  language constructs and also includes built-in types (integers, strings etc.) and built-in functions (integer addition etc.) that provide functionality that would be difficult or expensive to implement in the Plutus Core code. Built-in functions mostly operate on built-in types. Built-in types come with a size metric that is used by costing functions. For example, the size metric for integers returns the bit-size of the integer.

The performance of Plutus Core scripts relates to how expensive it is to run a script in the ledger. The cost model describes CPU and memory fees for each language primitive and can be used off-chain to predict fees for running such scripts.

Model performance is calculated by `costing _evaluation_` in abstract resource units (exunits) of CPU and memory. Individual steps of evaluation are costed, and built-in functions must also come with a `_costing function_` that provides costing information for them. The costing function for a built-in function is a mathematical function that takes the sizes of the arguments (as computed by their size metrics) and returns an estimate of the budget that will be used to perform that function. 

For example, the costing function for addition says that the CPU and memory costs are both proportional to the maximum of the sizes of the input integers (with some appropriate constants). Determining costing functions is done empirically by running the function in question against a large number of inputs and choosing a costing function that fits the data well.

### Scripts in the Cardano ledger

The Cardano ledger recognizes various types of scripts that are identified by ‘language’ version. This language tag allows the ledger to distinguish between different script types. When a new behavior or functionality is introduced, so is a new language.  Each new version of Plutus will be its own language, and all Plutus Core language versions are supported forever in the ledger. This provides the ability to validate the history of the chain indefinitely.

Part of the specification of a language in the ledger explains how language scripts run, what arguments they are given, and how those arguments are structured. Languages also have an associated subset of Cardano protocol parameters that control some aspects of the script evaluation. For Plutus, this is the cost model that is associated with each new language version.

### Plutus evaluator speed improvements

Due to performance improvements in the Plutus evaluator, both Plutus v1 and Plutus v2 scripts have lower cost model parameters than before, resulting in 20-30% improvements in script resource usage. 

### Updated cost model parameters

The updated cost model parameters include the following changes:

1.  Extend the set of built-in functions by adding these new built-ins:

-   `serialiseData`
-   `verifyEcdsaSecp256k1Signature`
-   `verifySchnorrSecp256k1Signature`
    
2.  Given the two new signature verification built-in functions referenced immediately above, the built-in function `verifySignature` was renamed `verifyEd25519Signature` to make it more clear what its function is.

3.  Recalibrate the cost model for the version of the evaluator in the node to align with the CPU parameter changes.

### New Plutus Core built-ins

The built-in types and type operators remain unchanged from the Alonzo release. All the new built-in functions are backward compatible. Adding them does not break any older script validators. The Vasil release continues to support the Alonzo built-in functions and adds the following new functions: 
    
**serialiseData**

A new Plutus built-in is added for serializing `BuiltinData` to `BuiltinByteString`. The serialiseData function takes a data object and converts it into a [CBOR](https://cbor.io/) object.

Plutus already provides a built-in for hashing data structure, for example, `sha2_256 :: BuiltinByteString -> BuiltinByteString`, it does not provide generic ways of serializing some data types to `BuiltinByteString`.

The overall memory and CPU costs are reduced by having a new built-in to serialize any Plutus ‘BuiltinData’ to ‘BuiltinByteString’ such that validators can leverage more optimized implementations and bytestring builders via built-ins than what is available on-chain.

**verifyEcdsaSecp256k1Signature**

The `verifyEcdsaSecp256k1Signature` function performs elliptic curve digital signature verification over the `secp256k1` curve and conforms to a uniform interface for digital signature verification algorithms.

The ECDSA scheme admits two distinct valid signatures for a given message and private key. We follow the restriction imposed by Bitcoin and only accept the smaller signature: `verifyEcdsaSecp256k1Signature` will return false if the larger one is supplied.

The keys for `verifyEcdsaSecp256k1Signature` exceed the maximum size that can be encoded in a constant bytestring and therefore must be split into 2 bytestrings and concatenated in the validator script.

**verifySchnorrSecp256k1Signature**

The `verifySchnorrSecp256k1Signature` function performs verification of Schnorr signatures over the `secp256k1` curve and conforms to a uniform interface for digital signature verification algorithms. 

For more explanations, how-to guides, and tutorials, see [Plutus Docs.](https://plutus.readthedocs.io/en/latest/index.html)

### Plutus Contract Addresses

*A Plutus v2 script will not have the same hash value as a Plutus v1 script.*

Since scripts must match their on-chain hashes exactly, it is important that the scripts which an application uses do not accidentally change. For example, changing the source code or updating dependencies or tooling may lead to small changes in the script. As a result, the hash will change. In cases where the hashes must match exactly, even changes which do not alter the functionality of the script can be problematic.

In light of this consideration, some DApp developers might expect that when doing a migration from Plutus v1 scripts to Plutus v2 scripts, the same source code, when recompiled, will generate the same hash value of that script address. However, it is impossible for a compiled v2 script to have the same script hash and address as a compiled v1 script. Given Plutus compiler version changes, changes in the dependencies, and multiple other improvements, it is expected that the hash value of the contract address will change after the source code is recompiled.

For example, suppose you write your Haskell source code (Plutus Tx), compile it into Plutus Core code (PLC), generate its hash value, then use it in a transaction. If you don’t save your compiled code, and then decide to use the same script in the future, you would have to recompile it. This would result in a different hash value of the contract address even without upgrading from Plutus v1 to Plutus v2 scripts. This is because the hash is computed based on the output of the compiled code.

Using the exact same script with different language versions will result in different hashes. The exact same script (as in UPLC.Program) can be used as a Plutus v1 script or a Plutus v2 script, and since the language version is part of the hash, the two hashes will be different.

**When to export and save the output of a compiled script**

Once you expect that you will not modify the on-chain part of your application and you don’t want the hash value of your script address to change, the best way to keep it the same is to save the output of your final compiled Plutus Core code (PLC) to a file.

For details on how to export scripts, please see: [How to export scripts, datums and redeemers](https://plutus.readthedocs.io/en/latest/howtos/exporting-a-script.html) in the Plutus Core user documentation.

## Reference inputs (CIP-31)

Transaction outputs carry datums, which enable access to information on the blockchain. However, these datums are constrained in a number of ways. For example, to access information in the datum, you’d have to spend the output that the datum is attached to. This requires the re-creation of a spent output. Any user who wishes to look at the data cannot spend the old output (which is gone), but must spend the new output (which they will not know about until the next block). In practice, this limits some applications to one ‘operation’ per block, thus decreasing the desired performance.

CIP-31 introduces a new mechanism for accessing information in datums – a reference input. Reference inputs allow looking at an output without spending it. This will facilitate access to information stored on the blockchain without the need for spending and re-creating unspent transaction outputs (UTXOs).

The key use case of CIP-31 is to support reference scripts (CIP-33). Other use cases include:

1.  Inspecting the state (datum, or locked value) of an on-chain application without having to consume the output. For example, checking the current state of a stablecoin state machine.
2.  The ability to reference on-chain data providers that store data in outputs by other scripts.
    
## Inline datums (CIP-32)

Datums carrying transaction information are commonly implemented by attaching hashes of datums to outputs. This is quite inconvenient for users. Datums tend to represent the result of computation done by the party who creates the output, and as such, there is almost no chance that the spending party will know the datum without communicating with the creating party. This means that either the datum must be communicated between parties off-chain, or on-chain by including it in the witness map of the transaction that creates the output (‘extra datums’). Such a case requires the spending party to watch the whole chain to find the datum, which is also inconvenient.

CIP-32 suggests a solution that allows datums themselves to be attached to outputs instead of datum hashes. This will allow much simpler communication of datum values between users.

**Use cases** include:

-   Creating a single UTXO with data to be used in multiple subsequent transactions, but only paying the cost for submitting it once.
-   Storing little information on-chain. For example, Oracles can benefit from this by simply adding some off-chain data to the main chain.
    
## Reference scripts (CIP-33)

When you spend an output locked with a Plutus script, you must include the script in the spending transaction. Hence, the size of the scripts contributes to transaction size, which directly influences Cardano’s throughput.

Large script sizes pose problems for users because:

1.  Larger transactions result in higher fees.
2.  Transactions have size limits. Large scripts can hit the limits. Even if one script fits, multiple scripts in one transaction might not fit. This makes it difficult to execute complex transactions that rely on several scripts.
    
CIP-33 introduces the ability to reference a script without including it in each transaction. This hugely reduces the contribution of scripts to the transaction size.

You can find some [Plutus script examples here](https://github.com/input-output-hk/cardano-node/tree/master/doc/reference/plutus).

## Transaction redeemers

Two important elements in Plutus are *datums* and *redeemers*. The datum is a piece of information that can be associated with a UTXO and is used to carry script state information. It is frequently used in combination with a redeemer, which is like an instruction or command to the contract.

With the Vasil hard fork, developers will be able to see redeemers for all inputs rather than just the one being passed to the currently executing script. For more details, read [how to work with datums and redeemers here](https://docs.cardano.org/plutus/datums-redeemers).

## Collateral change address

[Script collateral](https://docs.cardano.org/plutus/collateral-mechanism) is the monetary guarantee a user gives to assure that the transaction that uses a contract has been carefully constructed and thoroughly tested before submission to the validators. It is used to guarantee that nodes are compensated for their work in case phase-2 validation fails. The collateral amount is specified at the time of constructing the transaction and is reserved to allow for the on-chain script execution. 

Currently, on Cardano mainnet, the collateral amount is set to 150% of the transaction fee, and no change is provided to the collateral UTXO. This means that if a script fails phase-2 validation, the DApp user will lose all the funds that are stored in the UTXO chosen for the collateral.

With the Vasil hard fork, DApp developers will have the possibility to specify a change address for the script collateral. This means that in case the script fails phase-2 validation, only the right amount will be taken, and the remaining funds will be sent to the provided change address.

## Single VRF implementation

On Cardano, the Verifiable Random Function (VRF) determines which SPO creates the next block. Before Vasil, there were two VFR functions executed on every network hop to validate a block.

With the Vasil hard fork, one of these functions will be dropped, resulting in faster block validation and overall network syncing times. Please note that when syncing the chain, the performance improvement will be available only after the Vasil hard fork epoch. Until this point, the performance will remain the same.

