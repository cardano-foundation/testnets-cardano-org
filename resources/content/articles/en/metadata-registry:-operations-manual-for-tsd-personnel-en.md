---
title: Metadata Registry: Operations Manual for TSD personnel
description: Operational guide for TSD personnel to handle metadata
parent: native-tokens
order: 6
last_updated: "2021-02-01T09:00:00+01:00"
---

## Metadata registry: Operations manual for TSD personnel

**Overview** 

This operations manual is intended to be used by IOG’s Technical Support Desk (TSD) personnel, who are responsible for reviewing every metadata submission on the IOG’s registry, and determine whether submissions can be accepted or rejected, based on the results of the automated tests that occur prior to operator review, and the [Usage Policy](https://github.com/cardano-foundation/incentivized-testnet-stakepool-registry/blob/master/USAGE_POLICY.md].

All submissions must comply with a [specific set of parameters](https://github.com/cardano-foundation/goguen-metadata-registry#submission-well-formednessrules) before being accepted into the [metadata registry](https://github.com/cardano-foundation/goguen-metadata-registry).

## How the process works

- A third party submits one or more metadata files (‘records’) for review. Third parties can submit multiple records to be reviewed, but each record can only contain **one** metadata file *per Pull Request (PR)*.
- The submitted record undergoes automated testing (using buildkite validation scripts connected to the repo) to determine technical validity.
- If the metadata is *technically* valid (i.e., the *‘all checks have passed’* message is displayed), the operator commences the manual vetting process.


### Automated Testing Process

The following is tested: (All tests are automated, .i.e., they require no operator input.)

1. Git history validation:
This commit must either add or modify one file only, which must be located in the registry folder of the repository. 

2. Validation of the metadata file content:

The metadata file must:
-Be named after the subject hash.
-Correspond to the ‘subject’ value of the metadata file.
-Have a .json extension. (The metadata must be a valid JSON file that matches the JSON-schema given in this [README](https://github.com/cardano-foundation/goguen-metadata-registry) file. (This checks the name, presence, and format of the file).

3. Signature validation

Checks the validity of the attestation and ownership signatures (i.e., checks that the record was produced by the private key corresponding to the annotated public key.)

**Notes:**
-Refer to [Submission well-formedness rules](https://github.com/cardano-foundation/goguen-metadata-registry#submission-well-formedness-rules) for a full description of what is tested in CI.
-PRs that *do not pass* the automated check should be left in the queue *as is*. If the checks fail, the user (or TSD operator) can close the failed PR, and the user can then submit another PR for review.


### Manual Vetting Process

If the automated testing process confirms that the submitted metadata is technically valid, the TSD operator will start the manual vetting process.

Follow these steps to validate a record manually:

1. Review the [list of Pull Requests (PRs)](https://github.com/cardano-foundation/goguen-metadata-registry/pulls) in chronological order (from oldest to newest).

2. Check that the branch is up to date with the base. Click “Update branch” if necessary.

3. Rerun the tests and check that there is a green mark indicating “All checks have passed.”

4. Review the "Files changed" tab. Important: There should only be one .json file there. Check the contents of the file focusing on the name and description fields. These should be non-offensive, nor contain links to scam sites or any other inappropriate material. Generally speaking, the file contents should align with the [Usage Policy](https://github.com/cardano-foundation/incentivized-testnet-stakepool-registry/blob/master/USAGE_POLICY.md) and the Cardano Foundation’s [trademark policy](https://cardanofoundation.org/en/trademark-policy/).

### Possible Outcomes

The manual vetting process could result in two outcomes:

- The metadata record **does** comply with the guidelines
- The metadata record **does** not comply with the guidelines

If the metadata record **does** comply with the guidelines, the operator should:

- Approve the PR (right click on "Review changes", then "Approve" and "Submit review").
- Click "Merge Pull Request.” (This should be green now.)

	
If the metadata record **does not** comply with guidelines, the operator should:

- Click “Request changes Submit feedback that must be addressed before merging.”
- Add relevant comments. See [an example](https://github.com/cardano-foundation/incentivized-testnet-stakepool-registry/pull/81) of a PR that requires changes.
