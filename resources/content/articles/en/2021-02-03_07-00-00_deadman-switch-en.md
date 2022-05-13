---
parent: 2021-02-03_07-00-00_glow-tutorial
title: Deadman switch
description: How to create a deadman switch?
order: 5
last_updated: "2021-02-25T09:00:00+01:00"
---

*Warning:* This contract will compile on the /future/ Glow release.


## How to create a [deadman switch](https://gitlab.com/mukn/glow/-/blob/master/future/deadmanswitch.glow)?

Let's suppose a millionaire uncle has called you because he will give you the password to all his fortune.
However, while you are traveling he passes away, and only he knew the password for the safe!

Six months later, you get an email with the password.
It turns out that your uncle had a *dead man switch* that would automatically,
reveal the information after six months of inactivity.

In this contract, we are going to see how your uncle implemented that contract in Glow.

## Visualization

![img](https://ucarecdn.com/8b0ba880-443f-4b43-991d-ed5ac2dd2350/deadmanswitch.png)


## Glow Code

     1  #lang glow
     2  // -*- JavaScript -*-
     3  // Inspired by https://github.com/KarolTrzeszczkowski/Electron-Cash-Last-Will-Plugin
     4
     5    data Command = Withdraw(x : Nat) | Inherit(x : Nat)
     6
     7    @interaction([Owner, Heir])
     8    let deadManSwitch = (expirationDelay) => {
     9      let rec loop = (expirationTimestamp) =>
    10        choice {
    11        | @_ deposit! x ;
    12        loop (expirationtimestamp);
    13        | @owner publish! withdraw(x);
    14        withdraw! owner <- x ;
    15        loop (now() + expirationdelay);
    16        | @heir publish! inherit(x);
    17        require! now() >= expirationtimestamp;
    18        withdraw! heir <- x;
    19      };
    20      loop(now() + expirationdelay);
    21    }

-    on this contract, there are only two actions, either withdraw or inherit.
-    and there are only two participants, the Owner of the fortune and you.
-    When creating the contract, the Owner must say how often he wants it to renew. For example, every six months.
-    The first time we go into the loop, it starts
-    Now the `loop` is a function that can call itself (recursive).
-    Is like pattern matching but based on whom performs the action
-    If there is a deposit, the contract continues.
-    In order to show that it's still alive, the Owner publishes on the blockchain that he wants to withdraw a little bit of the funds in the contract.
-    It renews the *dead man switch* with a new deadline.
-    When the `@heir` signals on the blockchain that is ready to inherit.

The contract checks if the current block is past the expiration day.
If this is the case, the funds are released to the `heir`.


## Lessons learned

-   How to use explicit timestamps
-   How to use recursive functions
