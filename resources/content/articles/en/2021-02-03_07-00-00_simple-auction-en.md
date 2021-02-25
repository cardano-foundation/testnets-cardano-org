---
parent: 2021-02-03_07-00-00_glow-tutorial
title: Simple Auction
description: How does the Simple Auction (auction.glow) contract work?
order: 6
last_updated: "2021-02-25T09:00:00+01:00"
---
# How does the Simple Auction (auction.glow) contract work?

Imagine an auction where each one of the bidders tries to outbid the previous bidder.
However, in a blockchain auction, each bidder has to declare the money first to become the top bidder.
They get their money back when they are outbid.


## Visualization

![img](https://ucarecdn.com/ba79de1d-e526-466f-9d4f-b1747c7ad3b8/auction.png)


## Glow code

     1  #lang glow
     2  data Action = Bid(TokenAmount) | BuyItNow | Close;
     3
     4  @interaction([Seller])
     5  let simpleAuction = (goods : Assets, expirationTime : Timestamp, buyItNowPrice: TokenAmount) => {
     6     require! Assets.is_positive(goods);
     7     require! expirationTime > currentTime();
     8     deposit! Seller -> goods;
     9
    10     @interaction([Seller, CurrentBidder])
    11     let rec auction = (currentBid) => {
    12       assert! @deposited == goods + currentBid;
    13       choice {
    14         | ForAllParticipant (NewBidder) {
    15             @NewBidder bid = Bid(input(["Enter next bid"], TokenAmout));
    16             publish! NewBidder -> bid ; deposit! NewBidder -> bid;
    17             @NewBidder assume! @value(goods) > @value(bid);
    18             require! currentTime() < expirationTime;
    19             require! bid > currentBid;
    20             require! bid < buyItNowPrice;
    21             withdraw! CurrentBidder <- currentBid;
    22             @interaction([Seller, NewBidder]) auction(bid);
    23         | ForAllParticipant (NewBidder) {
    24             publish! NewBidder -> BuyItNow ; deposit! NewBidder -> buyItNowPrice;
    25             require! currentTime() < expirationTime;
    26             withdraw! NewBidder <- goods;
    27             withdraw! CurrentBidder <- currentBid;
    28             withdraw! Seller <- buyItNowPrice;
    29        | @_ { publish! Close; } =>
    30           require! currentTime() >= expirationTime;
    31           withdraw! Seller <- currentBid;
    32           withdraw! CurrentBidder <- goods;
    33       };
    34     @interaction([Seller, Seller]) auction(0);
    35  }

-   2 Declares the possible commands that could be performed on this contract
-   4 Only the Seller can create an auction
-   **5:** In order to create an auction, a Seller must provide:

The `Goods` that could be anything that can be represented as an asset,
an `expirationTime` at which point the auction is over and
a price at which to buy it immediately `buyItNowPrice`.

-   8 The Seller must deposit the goods in the smart contract. This could, for example, a photograph.
-   34 The real auction begins at 0, and the "first bidder" is the Seller himself.
-   10 The real auction is an interaction between the Seller and the Current bidder.
-   11 This function is recursive, so it can call itself.
-   12 A sanity check, let's make sure that the amount deposited to the contract is the goods plus the current bidder.
-   14 This is key in this contract; anyone that bids may become a participant.
-   15 The contract as the new participant for their bid.
-   16 The new bid should be public and it's deposited into the contract.
-   19 The new bid must be bigger than the current one in order to replace it.
-   21 The previous highest bidder gets its money back since it has been replaced by the new bid.
-   22 Now the auction may continue, recursively, with a new highest bidder.
-   23 If the new bidder, reaches the *buy it now* price. Then the auction is settled right now.
-   29 If the expiration time is reached, then the auction is settled.


## Lessons learned

-   Recursive function definitions
-   How to involve participants that are not known beforehand.
-   How to use an expiration date
