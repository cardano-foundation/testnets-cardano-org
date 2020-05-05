---
title: Using the Marlowe Playground
description: Marlowe getting started
order: 2
parent: 2020-05-04_08-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/marlowe/get-started/using-marlowe-playground-the-marlowe-emulator/
    type: 301
---
## Using the Marlowe Playground

[The Marlowe Playground](https://prod.meadow.marlowe.iohkdev.io/) is an emulator that provides a browser-based graphical interface where you can easily play with and edit your contracts. It also runs the required actions to test your input and output transactions as if you were integrated with a live blockchain. This tool provides a simple yet robust and secure platform for modeling financial instruments.

With the Marlowe Playground you can simulate block-by-block execution of your contracts using the Blockly library and Marlowe’s semantics compiled to JavaScript by the Haste compiler. Interlocking building blocks are used to represent instructions, and the money amounts of your contracts and choices are accessed through observations.

The executable parts of Marlowe are represented as Haskell data types and use single step and per-block stages that are easy to use. You can also benefit from using the embedded [Fay code editor](https://github.com/faylang/fay/wiki), a subset of Haskell, to generate Marlowe code to use within The Marlowe Playground. There are some pre-loaded examples provided by The Marlowe Playground for deposit incentives, limited crowd-funding, and escrow contracts that you can play with. This will help you learn how to execute, import, and save both Fay and The Marlowe Playground code.
