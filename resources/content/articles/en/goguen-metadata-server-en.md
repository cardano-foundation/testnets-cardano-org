---
title: Goguen Metadata Server
description: Goguen Metadata Server operations
parent: native-tokens
order: 7
last_updated: "2021-02-01"
---

## Goguen Metadata Server

### What problem does a metadata server address?

The introduction of a new metadata server for the Goguen environment addresses one fundamental problem: Mapping opaque on-chain identifiers (typically, hashes representing output locking scripts, token forging policies, or public key hashes) to metadata suitable for human consumption and registering this metadata off-chain.

### Metadata API

A metadata-server exposes the functionality of a key-value store. Users and applications can query metadata entries in a database (key:value store) through a [RESTful API](https://api.cardano.org/staging/metadata).

The following HTTP methods are available:

- GET metadata/{subject}: Returns the value for all properties associated with the subject. [Example](https://api.cardano.org/staging/metadata/3ea0944c0f67d241f65ff239445b31c1030e11b2c5ce35908c71d1520bb932d9)
- GET metadata/{subject}/properties/{property}: Returns the value for the given property associated with the subject. [Example](https://api.cardano.org/staging/metadata/3ea0944c0f67d241f65ff239445b31c1030e11b2c5ce35908c71d1520bb932d9/properties/description)


### Why we don't store metadata on-chain

There are a number of reasons why we don’t want to store metadata on-chain:

- The trust model for metadata is different than the one used by the ledger and transactions. The only trust we have (and can expect to have) in the metadata is that it is signed by a particular key, regardless of the purpose or nature of the data. For instance, when posting a script, there is no explicit association between the script and the signing key other than the owner of the key choosing to post it.
- The metadata is precisely that: metadata. While it is about the chain, it does not directly affect ledger state transitions, and therefore we should not require it to be associated with a specific transaction.
- Higher cost to users for modifications and storage
- Increases in the UTXO size
- Difficulty in querying the data
- Size limits on transaction metadata

### Defining metadata in the Goguen environment

Blockchain data is usually represented in forms that are not very human- or user-friendly. Long strings of hashes or other types of obscure identifiers often pose a challenge for the human user who's used to clearer and more logical methods of interpreting and understanding data. 

The blockchain contains a lot of personal information in the form of metadata, hashed for space-saving and indexing. This hashed metadata is, by design, unintelligible and unreadable by human eyes, so a method is required to map the information contained in on-chain identifiers -such as hashes- to metadata suitable for human understanding. 

Much of the metadata which we want to store is not determined by the chain, so we propose a system that is independent from blockchain. A case exists to develop a metadata distribution system that includes several features that would benefit many aspects of the IOG environment: Plutus, for example, multi-asset support, and some of the existing Cardano infrastructure, to name but a few. 

- The identification of the hash's preimage (the script corresponding to an output locked by a script hash, and the public key corresponding to a public key hash)
- Inclusion of human- and user-friendly metadata, like the name of the metadata's creator, website address, avatars, icons, etc.
- The integration of the metadata into the UI of IOG's applications. An example of this would be the naming convention of a currency. The name should be displayed on the UI, rather than the hash that contains the name's cyphered form.
- A solid security model for the metadata.

### What metadata is used for: Use cases

Within the Goguen environment, a metadata distribution system could be applied to several use cases:

- Script hashes
- Datum hashes
- Public key hashes
- Stable addresses for oracle data
- Distributed exchange address listing
- Stake pool metadata

#### Script hashes

In the Goguen era of Cardano, script hashes will be used for locking outputs and forging policy identifiers, for example. In both cases, users will likely want to know the script that goes with the hash. This information might be contained on-chain, but in most instances, the chain will only display the hash until the time the script runs (when spending a script-locked output, for example.)

Some of our applications might also require the provision of other metadata:

- 'Higher level' forms of the code (such as the Plutus IR)
- Creator information (contact details, etc.)
- Human-readable names.

#### Datum hashes

In the Extended UTXO (EUTXO) model, datums are provided by hash, and the spending party must provide the full value, which is inconvenient since the spending party needs to find out what the datum is. A metadata server quick enough to register new entries might provide a convenient off-chain channel for datum communication.

#### Public key hashes

A perennial problem faced by communication via public keys is that people want to see names, rather than public keys, so an 'address book' is required. A metadata server would act as a decentralized address book for wallets, containing user contact details such as key servers for PGP keys.

#### Distributed exchange address listing

Users offering tokens for sale and exchange can lock them in contracts that specify "you can spend this UTXO if you send x amount of tokens to y address". In this context, an output constitutes an "offer", which can be considered as metadata about the output, and could be managed by a metadata server.

#### Stake pool metadata

Currently, stake pool metadata is handled by a metadata aggregation server (SMASH) because:

- The stake pool metadata system does have to monitor the chain, since the metadata is fetched from URLs posted to the chain.
- The stake pool metadata system is “pull-based”: it must monitor a large number of stake pool metadata URLs for updates. 
- The implementation cost for a metadata server is not extremely high, as it mostly consists of a database with a small HTTP API.
- The stakepool metadata has different restrictions on content. For instance, the size limit of stake pool MD is much smaller than what we would reasonably limit a script size by.

#### Token metadata

In a multi-asset support environment, token holders will need to see easy-to-understand ('human-readable') names for their tokens, rather than hash strings. 

In this same environment, metadata can also include logos, units (decimal places), or policy scripts.
