---
title: Sample Marlowe smart contracts
description: Marlowe getting started
order: 2
parent: 2020-05-04_08-00-00_getting-started
last_updated: "2020-05-01T09:00:00+01:00"
redirects:
  - from: /en/marlowe/get-started/sample-marlowe-smart-contracts/
    type: 301
---
## Sample Marlowe smart contracts

In Marlowe, the type of contract is defined by the following Haskell data type: 

```haskell
CommitCash (IdentCC 1) 1
           (ConstMoney 100)
           10 200
           (CommitCash (IdentCC 2) 2
                       (ConstMoney 20)
                       20 200
                       (When (PersonChoseSomething (IdentChoice 1) 1)
                             100
                             (Both (RedeemCC (IdentCC 1) Null)
                                   (RedeemCC (IdentCC 2) Null))
                             (Pay (IdentPay 1) 2 1
                                  (ConstMoney 20)
                                  200
                                  (Both (RedeemCC (IdentCC 1) Null)
                                        (RedeemCC (IdentCC 2) Null))))
                       (RedeemCC (IdentCC 1) Null))
           Null
```

This type provides a Null contract, which as you may suspect, does nothing. 

The following constructs form contracts that do something, and then continue according to another contract.

* **CommitCash**: waits for a participant to make a commitment.
* **RedeemCC**: allows for a commitment to be redeemed.
* **Pay**: allows a payment between participants to be claimed by the recipient. 
* **Both**: has the behavior of both of its components.
* **Choice**: chooses between two contracts on the basis of an observation.
* **When**: is quiescent until a condition, in this case an observation, becomes true.

Additionally, many of the contracts have timeouts that also determine their behavior

### Example:

Think of a contract where Alice (person 1) commits 450 Adas to pay for a product sold by Bob (person 2). The payment is conditioned to the delivery of the product. 

If before a timeout (block 90), both Alice and Bob agree that the product has been delivered, the funds can be transferred to Bob, or if both agree that the product was not delivered, the funds can be transferred back to Alice. If they do not agree, Carol (person 3) will solve the dispute. 

If by block 90, there is no consensus (because at least one participant has not acted), the funds will be refunded to Alice, unless two out of three participants choose to stop that and agree that funds should be transferred to Bob instead. Also, if by block 100 funds have not been claimed by Bob, the Ada will also be refunded to Alice. 

Let us see how this contract looks in Marlowe:

```haskell
CommitCash (IdentCC 1) 1    -- Person 1 makes a Commitment identified with IdentCC 1. 
        (ConstMoney 450) -- commits 450 Ada 
        10 100           -- before block 10. Redeemable until block 100

-- The constructor 'When', waits for one of three things to happen: 
-- 1. The observation becomes True because two out of three have chosen 0 (Refund Alice). 
-- 2. The -- observation becomes True because two out of three have chosen 1 (Pay Bob). 
-- 3. The observation remains False until block 90 is published in the blockchain.

        (When (OrObs (OrObs (AndObs (PersonChoseThis (IdentChoice 1) 1 0)
                                (OrObs (PersonChoseThis (IdentChoice 2) 2 0)
                                        (PersonChoseThis (IdentChoice 3) 3 0)))
                        (AndObs (PersonChoseThis (IdentChoice 2) 2 0)
                                (PersonChoseThis (IdentChoice 3) 3 0)))
                        (OrObs (AndObs (PersonChoseThis (IdentChoice 1) 1 1)
                                (OrObs (PersonChoseThis (IdentChoice 2) 2 1)
                                        (PersonChoseThis (IdentChoice 3) 3 1)))
                        (AndObs (PersonChoseThis (IdentChoice 2) 2 1)
                                (PersonChoseThis (IdentChoice 3) 3 1))))
                
-- Block 90 imposes a timeout. This is to prevent the contract being stuck forever waiting for a participant to act. 
-- Money will be refunded to Alice, unless two out of three participants choose to pay Bob instead.
                90
                (Choice (OrObs (AndObs (PersonChoseThis (IdentChoice 1) 1 1)
                                        (OrObs (PersonChoseThis (IdentChoice 2) 2 1)
                                        (PersonChoseThis (IdentChoice 3) 3 1)))
                                (AndObs (PersonChoseThis (IdentChoice 2) 2 1)
                                        (PersonChoseThis (IdentChoice 3) 3 1)))

-- If Bob wins the decision, he can claim the funds. But only before block 100 is reached. 

                        (Pay (IdentPay 1) 1 2             -- Payment 1 from person 1 to person 2
                        (AvailableMoney (IdentCC 1)) -- Using the funds committed in the identifier IdentCC 1 
                        100                          -- Before block 100 is reached or funds will go back to Alice.  
                        (RedeemCC (IdentCC 1) Null))
                        (RedeemCC (IdentCC 1) Null))
                (RedeemCC (IdentCC 1) Null))
        Null
```


As you can see, Marlowe code is neat, clean, easy to read and understand. 

However, if you have no experience with code, do not worry. You can model your smart contract using the Blockly editor. This utility allows you to visualise and edit smart contracts as interlocking blocks that can be dragged, dropped and configured easily. Once you have modeled your contract with Blockly, you can click on the  ‘Blockly to code’ button and Meadow will generate the corresponding Marlowe code for you. 

![Marlowe Playground blockly](https://ucarecdn.com/3c19bd31-00c2-4599-b9fe-3980532f6729/)

You can find more examples of smart contracts with Marlowe in [input-output-hk.github.io/marlowe/](https://input-output-hk.github.io/marlowe/) where you can also model and test your own smart contracts.
