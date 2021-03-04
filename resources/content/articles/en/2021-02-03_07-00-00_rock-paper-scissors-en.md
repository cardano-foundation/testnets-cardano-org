---
parent: 2021-02-03_07-00-00_glow-tutorial
title: Rock, Paper Scissors
description: Playing Rock, Paper, Scissors in Glow?
order: 4
last_updated: "2021-02-25T09:00:00+01:00"

---
## Playing Rock, Paper, Scissors ([rps.glow](https://gitlab.com/mukn/glow/-/blob/master/dapps/rps.glow))

Rock, paper, scissors is the classic children's game where each child shows what they have chosen at the same time.
The decision on who has won is based on the following rules:

-   Both selected the same: Draw
-   Rock beats scissors
-   Paper beats rock
-   Scissors beats paper

How con you code this in Glow if there is no *at the same time*.
How does a player communicate their choice to the blockchain during the game?


## Visualization

![img](https://ucarecdn.com/d5dde20b-63c6-4cd7-b774-6694f4080cc8/rpsmin.png)


## Glow code

     1  #lang glow
     2  data Hand = | Rock | Paper | Scissors;
     3  data Outcome = | B_Wins | Draw | A_Wins;
     4
     5  let winner = (handA : Hand, handB : Hand) : Outcome => {
     6      Outcome.ofNat((Hand.toNat(handA) + (4 - Hand.toNat(handB))) % 3) }
     7
     8  /* The somewhat magic formula above is equivalent to the tedious definition below:
     9  let winner = (handA : Hand, handB : Hand) : Outcome => {
    10  switch (handA) {
    11    case Rock:
    12      switch(handB) {
    13      case Rock: return Draw;
    14      case Paper: return B_Wins;
    15      case Scissors: return A_Wins;
    16    }
    17    case Paper:
    18      switch(handB) {
    19      case Rock: return A_Wins;
    20      case Paper: return Draw;
    21      case Scissors: return B_Wins;
    22    }
    23    case Scissors:
    24      switch(handB) {
    25      case Rock: return B_Wins;
    26      case Paper: return A_Wins;
    27      case Scissors: return Draw;
    28      }
    29    }
    30  }
    31  */
    32
    33
    34  @interaction([A, B])
    35  let rockPaperScissors = (wagerAmount) => {
    36      @A assert! canReach(end, end.outcome == A_Wins);
    37      @A let handA = Hand.input("First player, pick your hand");
    38      @A let salt = randomUInt256();
    39      @verifiably!(A) let commitment = digest([salt, handA]);
    40      publish! A -> commitment; deposit! A -> wagerAmount;
    41
    42      @B assert! canReach(end, end.outcome == B_Wins);
    43      @B let handB = Hand.input("Second player, pick your hand");
    44      publish! B -> handB; deposit! B -> wagerAmount;
    45
    46      publish! A -> salt, handA;
    47      verify! commitment;
    48      let outcome = winner(handA, handB);
    49
    50  // end:
    51      switch(outcome) {
    52        | A_Wins => withdraw! A <- 2*wagerAmount
    53        | B_Wins => withdraw! B <- 2*wagerAmount
    54        | Draw => withdraw! A <- wagerAmount; withdraw! B <- wagerAmount };
    55
    56  outcome };

-   A `Hand` can only be `Rock, Paper or Scissors`
-   There are only three possible `Outcomes` either `B_wins`, `A_wins`, or its a `Draw`
-   Now define a function `winner`, that when given two hands can determine the `Outcome`
-   This is an arithmetic trick that translates each of the nine possible hand combinations to three possible outcomes
-   Alice and Bob use this contract
-   Declare the `rockPaperScissors` contract that has the `wagerAmount`
-   `@Alice` makes sure (`assert!`) that it's possible to reach the `end:` label
-   `@Alice` asks (`input`) and stores the value of her Hand.
-   `@Alice` creates a random value (`salt`) that will be used to obfuscate her Hand
-   `@Alice` store the obfuscated value of her Hand in a `verifiably` commitment
-   `@Alice` makes her commitment public and `deposit!` her wage.
-  `@Bob` makes sure he can reach the `end.outcome` where he wins
-  `@Bob` can `input` what hand he chooses to play
-  `@Bob` publishes his Hand and deposits his wager
-  Now it's possible to publish the `salt` and in the next step, use it to
-  `verify!` that the `commitment` was obfuscated with the salt
-  now we calculate the `outcome` as the result of evaluating the `winner` function with both hands.
-  `switch` for pattern matching, it's possible to select the appropriate outcome.
-  if `outcome` is `A_wins` `withdraw` to Alice both wages.
-  if `outcome` is `B_wins` `withdraw` to Bob both wages.
-  if `outcome` is `Draw` `withdraw` to give back their money to Alice and Bob.

## Lessons learned

-   You can define your data types with `data Hand`
-   You can define smaller functions that are used later in the contract. Like: `let winner = (handA:Hand, handB:Hand)`
-   You can use `switch` to do pattern matching
