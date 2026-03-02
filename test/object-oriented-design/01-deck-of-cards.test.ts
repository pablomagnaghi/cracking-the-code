import { Card, Suit, Deck, Hand, BlackjackHand } from '../../src/object-oriented-design/01-deck-of-cards';

describe('Deck of Cards', () => {
  test('Card stores suit and face value', () => {
    const card = new Card(Suit.Hearts, 1);
    expect(card.suit).toBe(Suit.Hearts);
    expect(card.faceValue).toBe(1);
    expect(card.isAce()).toBe(true);
    expect(card.isFaceCard()).toBe(false);
  });

  test('Card identifies face cards correctly', () => {
    const jack = new Card(Suit.Spades, 11);
    const queen = new Card(Suit.Diamonds, 12);
    const king = new Card(Suit.Clubs, 13);
    const ten = new Card(Suit.Hearts, 10);

    expect(jack.isFaceCard()).toBe(true);
    expect(queen.isFaceCard()).toBe(true);
    expect(king.isFaceCard()).toBe(true);
    expect(ten.isFaceCard()).toBe(false);
  });

  test('Deck has 52 cards', () => {
    const deck = new Deck();
    expect(deck.remainingCards()).toBe(52);
  });

  test('Deck deals cards and tracks remaining count', () => {
    const deck = new Deck();
    const card = deck.dealCard();
    expect(card).toBeDefined();
    expect(deck.remainingCards()).toBe(51);
  });

  test('Deck returns undefined when empty', () => {
    const deck = new Deck();
    for (let i = 0; i < 52; i++) {
      deck.dealCard();
    }
    expect(deck.remainingCards()).toBe(0);
    expect(deck.dealCard()).toBeUndefined();
  });

  test('Deck shuffle resets dealt index', () => {
    const deck = new Deck();
    deck.dealCard();
    deck.dealCard();
    expect(deck.remainingCards()).toBe(50);
    deck.shuffle();
    expect(deck.remainingCards()).toBe(52);
  });

  test('Hand accumulates cards and computes score', () => {
    const hand = new Hand();
    hand.addCard(new Card(Suit.Hearts, 5));
    hand.addCard(new Card(Suit.Clubs, 10));
    expect(hand.getCards()).toHaveLength(2);
    expect(hand.score()).toBe(15);
  });

  test('BlackjackHand scores face cards as 10', () => {
    const hand = new BlackjackHand();
    hand.addCard(new Card(Suit.Hearts, 11)); // Jack
    hand.addCard(new Card(Suit.Clubs, 12));  // Queen
    expect(hand.score()).toBe(20);
    expect(hand.isBusted()).toBe(false);
  });

  test('BlackjackHand handles ace as 11 when beneficial', () => {
    const hand = new BlackjackHand();
    hand.addCard(new Card(Suit.Hearts, 1));  // Ace = 11
    hand.addCard(new Card(Suit.Clubs, 13));  // King = 10
    expect(hand.score()).toBe(21);
    expect(hand.isBlackjack()).toBe(true);
  });

  test('BlackjackHand downgrades ace to 1 to avoid bust', () => {
    const hand = new BlackjackHand();
    hand.addCard(new Card(Suit.Hearts, 1));  // Ace
    hand.addCard(new Card(Suit.Clubs, 9));
    hand.addCard(new Card(Suit.Diamonds, 5));
    // 11 + 9 + 5 = 25 -> ace becomes 1 -> 1 + 9 + 5 = 15
    expect(hand.score()).toBe(15);
    expect(hand.isBusted()).toBe(false);
  });

  test('BlackjackHand detects bust', () => {
    const hand = new BlackjackHand();
    hand.addCard(new Card(Suit.Hearts, 10));
    hand.addCard(new Card(Suit.Clubs, 8));
    hand.addCard(new Card(Suit.Diamonds, 7));
    expect(hand.score()).toBe(25);
    expect(hand.isBusted()).toBe(true);
  });

  test('BlackjackHand with two aces scores correctly', () => {
    const hand = new BlackjackHand();
    hand.addCard(new Card(Suit.Hearts, 1)); // Ace
    hand.addCard(new Card(Suit.Clubs, 1));  // Ace
    // 11 + 11 = 22 -> one ace becomes 1 -> 12
    expect(hand.score()).toBe(12);
    expect(hand.isBusted()).toBe(false);
  });
});
