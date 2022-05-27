---
title: Plutus fee estimator
description: Plutus fee estimator
parent: 2020-05-04_05-00-00_tools
order: 4
last_updated: '2021-09-6T12:30:00+01:00'
---

## Plutus fee estimator

The Plutus fee estimator has been developed by IOG performance experts for price benchmarking and comparison. It uses information from real-world Plutus transactions and current mainnet settings to predict the fees that will be charged for a transaction. The estimator can be used to calculate fees for actual transactions (e.g. to determine the fees that will be charged if the network parameters change), and also to estimate fees for individual script transactions or complete DApps before or during development. It may be useful to determine the effect of script changes or optimizations on fees.

The fee estimator needs three simple pieces of information:

-   **The total on-chain transaction size in bytes**: a simple transaction, for example, is around 300 bytes, one with metadata is around 650 bytes, and Plutus scripts are typically 4,000-8,000 bytes (future optimizations and improvements will reduce this).
-   **The number of computational (CPU) steps** that the script uses: each step represents 1 picosecond of execution time on a benchmark machine. Typical scripts should consume less than 1,000,000,000 (1 millisecond).
- **The number of memory units** that the script uses: this represents the number of bytes that the script allocates. Typical scripts should consume less than 1,000,000 memory units (1MB of memory allocation).


It calculates the cost for the corresponding transaction using current mainnet parameter settings, providing results both ada and in US dollars.

The information that the fee estimator uses can either be obtained:

-   directly from a specific Plutus transaction using the Cardano node
-   from information that the Plutus system provides.

Users may also provide estimated values if they want to explore what-if scenarios. This allows a range of possible fee estimates to be obtained prior to or during smart contract development, which facilitates experimentation with alternative implementation decisions.

<!-- include components/SmartContractCalculator -->
