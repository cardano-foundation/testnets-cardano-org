---
parent: 2020-05-05_12-27-39_get-started
title: Pledging and Rewards
description: Pledging and Rewards
order: 1
external_href: ""
last_updated: 2020-05-05T13:47:27+01:00
---

## Pledging and Rewards

Pledging is an important mechanism that encourages the growth of a healthy ecosystem within the Cardano blockchain. When you register a stake pool you can choose to pledge some, or all, of your ada to the pool, to make it more attractive to people that want to delegate. Although pledging is not required when setting up a stake pool, it can make the stake pool more attractive to delegators, as the higher the amount of ada that is pledged, the higher the rewards that will be paid out. The a0 protocol parameter defines the influence of the pledge on the pool reward.

*Understanding rewards*

During each epoch, rewards are distributed amongst all stakeholders who have delegated to a stake pool, either to their own stake pool, or another pool. These rewards come from two sources:
* All transaction fees: collated from the set of transactions included in a block that was minted during that epoch.
* Monetary expansion: involves distinguishing between the total supply of ada and the maximal supply of ada. The total supply consists of all ada currently in circulation, as well as the ada in the treasury. The maximal supply is the maximal amount of ada that can ever exist. The difference between these two figures is called the reserve. During each epoch, a fixed, (but parameterizable) percentage of the remaining reserve is taken from the reserve and used for epoch rewards and treasury, where the amount being sent to the treasury is a fixed percentage of the amount taken from the reserve.


The following formula outlines how the rewards mechanism works. The available rewards amount, transaction fees, plus monetary expansion, is denoted by R. 
First, the share of all available rewards that a specific pool can receive is we determined, as follows:
![image info](pledge_formula.png)



These elements are defined as follows:
* R - total available rewards for this epoch
* a0 - pledge influence factor (can be between 0 and infinity)
* z0 - relative pool saturation size, i.e. 0.5% for a number of desired pool k=200
* σ - stake delegated to the pool (including stake pledged by the owners and stake delegated by others)
* σ’ = min(σ, z0) - as σ, but capped at z0
* s - stake pledged by the owners
* s’ = min(s, z0) - as s, but capped at z0

Note that z0,, σ and s are all relative, so they are fractions of the total supply, as they all lie between zero and one.

Two important considerations are:
1. Rewards increase with σ, but stop increasing once σ reaches z0, that is. once the pool becomes saturated.
2. If a0, (the pledge influence,) is zero, this formula simply becomes R·σ’, so it is proportional to pool stake, up to the point of saturation. For larger values of a0, the pledge s becomes more important.

Remember that the pledge is declared during pool registration, (alongside the cost and margin values), and has to be honored by the pool owners who are delegating to the pool: If they collectively delegate less than the declared pledge, pool rewards for that epoch will be zero. Note that the pool will be public, if its operator margin is set to less than 100%. 

The rewards that are produced by this formula are now adjusted by pool performance: We multiply by β/σ, where β is the fraction of all blocks produced by the pool during the epoch.

For a perfectly performing pool, one that produces all blocks that it can produce, this factor will be one, on average. The actual value will fluctuate due to the stochastic nature, or random process. of the Ouroboros Praos consensus algorithm.

After pool rewards have been calculated and adjusted for pool performance, they are distributed amongst the pool operator and the pool members, or people who delegated part, or all of their stake, to the pool. This happens in several steps:

* First, the declared costs are subtracted and given to the pool operator.
* Next, the declared margin is subtracted and given to the pool operator..
* Finally the remainder is split fairly (proportional to delegated stake), amongst all people who delegated to the pool, including the pool owners.




