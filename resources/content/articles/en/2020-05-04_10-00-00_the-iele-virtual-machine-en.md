---
title: The IELE Virtual Machine
description: IELE about
parent: 2020-05-04_10-00-00_about
order: 2
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/iele/about/the-iele-virtual-machine/
    type: "301"
---
## The IELE Virtual Machine

In the 1990’s, Java demonstrated the feasibility of the virtual machine (VM) in production “real world” systems. Roughly, a VM acts as an intermediate layer between the real hardware and high-level programming languages. It provides a base language tailored to the needs of the higher-level language. Programs written in that higher-level language run on the VM, which dynamically transforms them to run on real hardware. The reason Java was revolutionary was that it had been thought that those intermediate runtime transformations would make the higher-level languages impractically slow on ordinary hardware.

That turns out not to be true. As a result, virtual machines are now widely used. For example, it was a natural choice for the Ethereum Foundation to create a virtual machine tailored to smart contracts.

### IELE represents a next stage in VM technology

The problem with VMs is that they’re written by people working from an informal specification. Or, often, the specification isn’t written down until after the VM is finished. That leads to mismatches between what the VM should do and what it does do. (That is: bugs.) Even where the VM is correct, informal specifications encourage misinterpretation by the implementors of higher-level languages, leading to bugs in their compilers.

IELE is a virtual machine developed in a different way. The specification was written first, and it was written in a formal (extremely precise) language. Then, using a suite of tools called the K framework, the virtual machine was generated from the formal specification, rather than being implemented by people. While a bug in the generator could still produce a bug in the VM, the chances of that are much, much lower than from a human implementation.

Moreover, the impact of mistakes in deciding what the VM should do (that is, mistakes in the specification) are much smaller. Instead of forcing people to rewrite the corresponding VM code, you just regenerate the entire VM. Because of that, the entire effort of producing a working virtual machine of the complexity of the Ethereum VM was only ten person-months.

Just as people in the pre-Java era thought all VMs would be too slow, it’s commonly thought that generated VMs can’t be competitive with hand-crafted ones. However, the IELE VM is only an order of a magnitude slower than the Ethereum virtual machine. That sounds scary but it’s sufficient for the specialized domain of smart contracts. Just as with Java, which has gone from “fast enough that it’s a viable competitor for C for web work” to “fast enough for all but specialized applications”, we can expect further generations of IELE to speed up.

More information on the on the technical report: IELE: An Intermediate-Level Blockchain Language Designed and Implemented Using Formal Semantics
