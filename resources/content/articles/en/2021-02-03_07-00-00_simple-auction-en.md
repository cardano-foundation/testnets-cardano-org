---
parent: 2021-02-03_07-00-00_glow-tutorial
title: Simple Auction
description: How does the Simple Auction (auction.glow) contract work?
order: 6
last_updated: "2021-02-25T09:00:00+01:00"
---

_Warning:_ This contract will compile on the /future/ Glow release.

## How does the Simple Auction ([auction.glow](https://gitlab.com/mukn/glow/-/blob/master/future/auction.glow)) contract work?

Imagine an auction where each one of the bidders tries to outbid the previous bidder.
However, in a blockchain auction, each bidder has to declare the money first to become the top bidder.
They get their money back when they are outbid.

## Visualization

![img](https://ucarecdn.com/ba79de1d-e526-466f-9d4f-b1747c7ad3b8/auction.png)

## Glow code

```javascript
    #lang glow
    data Action = Bid(TokenAmount) | BuyItNow | Close;

    @interaction([Seller])
    let simpleAuction = (goods : Assets, expirationTime : Timestamp, buyItNowPrice: TokenAmount) => {
    require! Assets.is_positive(goods);
    require! expirationTime > currentTime();
    deposit! Seller -> goods;

    @interaction([Seller, CurrentBidder])
    let rec auction = (currentBid) => {
    assert! @deposited == goods + currentBid;
    choice {
    | ForAllParticipant (NewBidder) {
    @NewBidder bid = Bid(input(["Enter next bid"], TokenAmout));
    publish! NewBidder -> bid ; deposit! NewBidder -> bid;
    @NewBidder assume! @value(goods) > @value(bid);
    require! currentTime() < expirationTime;
    require! bid > currentBid;
    require! bid < buyItNowPrice;
    withdraw! CurrentBidder <- currentBid;
    @interaction([Seller, NewBidder]) auction(bid);
    | ForAllParticipant (NewBidder) {
    publish! NewBidder -> BuyItNow ; deposit! NewBidder -> buyItNowPrice;
    require! currentTime() < expirationTime;
    withdraw! NewBidder <- goods;
    withdraw! CurrentBidder <- currentBid;
    withdraw! Seller <- buyItNowPrice;
    | @_ { publish! Close; } =>
    require! currentTime() >= expirationTime;
    withdraw! Seller <- currentBid;
    withdraw! CurrentBidder <- goods;
    };
    @interaction([Seller, Seller]) auction(0);
    }
```

- Declares the possible commands that could be performed on this contract
- Only the Seller can create an auction
- In order to create an auction, a Seller must provide:

The `Goods` that could be anything that can be represented as an asset,
an `expirationTime` at which point the auction is over and
a price at which to buy it immediately `buyItNowPrice`.

- The Seller must deposit the goods in the smart contract. This could, for example, a photograph.
- The real auction begins at 0, and the "first bidder" is the Seller himself.
- The real auction is an interaction between the Seller and the Current bidder.
- This function is recursive, so it can call itself.
- A sanity check, let's make sure that the amount deposited to the contract is the goods plus the current bidder.
- This is key in this contract; anyone that bids may become a participant.
- The contract as the new participant for their bid.
- The new bid should be public and it's deposited into the contract.
- The new bid must be bigger than the current one in order to replace it.
- The previous highest bidder gets its money back since it has been replaced by the new bid.
- Now the auction may continue, recursively, with a new highest bidder.
- If the new bidder, reaches the _buy it now_ price. Then the auction is settled right now.
- If the expiration time is reached, then the auction is settled.

## Lessons learned

- Recursive function definitions
- How to involve participants that are not known beforehand.
- How to use an expiration date
