---
title: Metadata Submitter Tool
description: Tool used to submit metadata
parent: native-tokens
order: 5
last_updated: "2021-02-01"
---

## Metadata Submitter Tool

**Overview** 

The Metadata Submitter is a tool that enables users to submit metadata to the server.

The metadata associated with token and smart contract scripts submitted to the IOHK registry needs to be validated to ensure it contains no objectionable material (profanity, propaganda, or any other questionable material.) The metadata will go through a rigorous testing procedure involving both automated checks and manual vetting before it is approved and added to the Token Registry.

Third parties creating tokens or smart contracts will use a command line interface (CLI)-based tool called *metadata submitter* to generate their signed metadata record for validation. The submitter tool creates metadata file entries for the Token Registry. 

### Submitter Components

The metadata submitter tool includes two major components:

- Key and signature management
- Metadata record generation and signing

**Key and Signature Management**

A metadata record includes two types of cryptographic information:

- **Attestation signatures** - These digital signatures attest to the authenticity of some, or all of the fields. An attestation signature includes the public key that is attesting to that particular metadata, and the signature of that key on that metadata record.
- **Owner keys** - These indicate who is allowed to submit modifications to the record. 

**Metadata Record Generation and Signing**

Metadata follows a specific structure and can be signed with an attestation signature. The format is specified as a JSON schema.

### Creating a metadata entry using the submitter tool

Token and smart contract creators need to follow this process to create their metadata entry. (Operating system (Windows, MacOS, or Linux) is irrelevant, but code **must** be run in a Unix environment.

1. JSON file creation

```
cd cardano-metadata-submitter
nix-shell -A devops
cd
cd goguen-metadata-registry/registry

```
2. Key generation. The key will be used to sign metadata entries

```
cardano-metadata-submitter -K <name-of-key>
```

3. Getting the preimage hash

<SOME DATA> hashed to xxd becomes the preimage
When passing the preimage to the tool, you must pass it as its bytestring

```
echo -n "Test Script" | xxd -p
```

4. This returns the following output

```
504b205465737420536372697074
```
<SOME DATA> hashed to SHA256 becomes the subject

5. When getting the hash, you pass the actual string to sha256sum

```
echo -n "Test Script" | sha256sum
```

6. This returns the following output

```
1c7318d8af94547557f424102b0a625f3483f7785bc41d08df34d43b71fbd1cf
```

7. File creation (in json.draft format)

```
cardano-metadata-submitter -i 1c7318d8af94547557f424102b0a625f3483f7785bc41d08df34d43b71fbd1cf
```

8. Adding the preimage (-h = hash function, -p = preimage)

```
cardano-metadata-submitter 1c7318d8af94547557f424102b0a625f3483f7785bc41d08df34d43b71fbd1cf -H sha256 -p '504b205465737420536372697074
```
9. Adding fields 

Parameters:

n=name
d=description

```
cardano-metadata-submitter 1c7318d8af94547557f424102b0a625f3483f7785bc41d08df34d43b71fbd1cf -n "Test Script" -d "A script registered on chain"
```
10. Adding Attestation signature (key must be in the same directory)

```
cardano-metadata-submitter 1c7318d8af94547557f424102b0a625f3483f7785bc41d08df34d43b71fbd1cf -a <name-of-key>.prv
```

11. Adding owner signature

```
cardano-metadata-submitter 1c7318d8af94547557f424102b0a625f3483f7785bc41d08df34d43b71fbd1cf -o <name-of-key>.prv
```

12. Finalising the entry (this removes the .draft from the filename)

```
cardano-metadata-submitter 1c7318d8af94547557f424102b0a625f3483f7785bc41d08df34d43b71fbd1cf -f
```

13. Changing Git branch (create a new branch locally)

```
git checkout -b "new-branch-name"
```

14. Adding a new file to the branch

```
git add -A
```

15. Git commit

```
git commit -m "comment here"
```

16. Git push

```
git push origin new-branch-name
```

17. Go [here](https://github.com/cardano-foundation/goguen-metadata-registry) and create a pull request (PR) for your branch.

**Notes:**
- Only one file may be added to the “registry” folder (or one file being modified in the “registry” folder) per PR
- Renaming a file is **not** permitted
