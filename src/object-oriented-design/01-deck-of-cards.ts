// 07.01. Deck of Cards
//
// Design the data structures for a generic deck of cards. Explain how you
// would subclass the data structures to implement blackjack.
//
// Approach:
//   - Create a Suit enum and a Card class holding suit and face value.
//   - A Deck class holds an array of cards and supports shuffle and deal.
//   - A Hand class accumulates dealt cards and computes a generic score.
//   - BlackjackHand extends Hand with blackjack scoring: face cards = 10,
//     aces count as 11 unless the total exceeds 21, in which case they
//     count as 1. The hand can report whether it is busted (> 21) or a
//     blackjack (21 with two cards).
//
// Example:
//   const deck = new Deck();
//   deck.shuffle();
//   const hand = new BlackjackHand();
//   hand.addCard(deck.dealCard()!);
//   hand.addCard(deck.dealCard()!);
//   hand.score();  // blackjack-aware score
//
// Constraints:
//   - A standard deck has 52 cards (4 suits x 13 face values).
//   - Aces are flexible: 1 or 11 depending on the hand total.
//   - Dealing from an empty deck returns undefined.

export enum Suit {
  Clubs,
  Diamonds,
  Hearts,
  Spades,
}

export class Card {
  readonly suit: Suit;
  readonly faceValue: number; // 1 = Ace, 2-10, 11 = Jack, 12 = Queen, 13 = King

  constructor(suit: Suit, faceValue: number) {
    this.suit = suit;
    this.faceValue = faceValue;
  }

  /** Default value used in generic scoring. */
  value(): number {
    return this.faceValue;
  }

  isAce(): boolean {
    return this.faceValue === 1;
  }

  isFaceCard(): boolean {
    return this.faceValue >= 11 && this.faceValue <= 13;
  }
}

export class Deck {
  private cards: Card[] = [];
  private dealtIndex: number = 0;

  constructor() {
    this.init();
  }

  private init(): void {
    this.cards = [];
    this.dealtIndex = 0;
    const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    for (const suit of suits) {
      for (let face = 1; face <= 13; face++) {
        this.cards.push(new Card(suit, face));
      }
    }
  }

  shuffle(): void {
    // Fisher-Yates shuffle
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    this.dealtIndex = 0;
  }

  remainingCards(): number {
    return this.cards.length - this.dealtIndex;
  }

  dealCard(): Card | undefined {
    if (this.dealtIndex >= this.cards.length) return undefined;
    return this.cards[this.dealtIndex++];
  }
}

export class Hand {
  protected cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  score(): number {
    let total = 0;
    for (const card of this.cards) {
      total += card.value();
    }
    return total;
  }
}

export class BlackjackHand extends Hand {
  /** Returns the best blackjack score (aces = 1 or 11). */
  score(): number {
    let total = 0;
    let aces = 0;

    for (const card of this.cards) {
      if (card.isAce()) {
        aces++;
        total += 11;
      } else if (card.isFaceCard()) {
        total += 10;
      } else {
        total += card.faceValue;
      }
    }

    // Convert aces from 11 to 1 while busted
    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  }

  isBusted(): boolean {
    return this.score() > 21;
  }

  isBlackjack(): boolean {
    return this.cards.length === 2 && this.score() === 21;
  }
}
