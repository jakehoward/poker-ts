import {drop, flatMap, map, take} from "./functional";
import {shuffle} from "./random";
import {Second, Seconds, sleep} from "./utils";

type Spades = "Spades";
type Clubs = "Clubs";
type Hearts = "Hearts";
type Diamonds = "Diamonds";

type Suit = Spades | Clubs | Hearts | Diamonds;

type Ace = "Ace"
type King = "King"
type Queen = "Queen"
type Jack = "Jack"

type Rank = Ace | King | Queen | Jack | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2;

type Card = {
    suit: Suit,
    rank: Rank,
}
type Hand = [Card, Card]
type Deck = Card[];

const allRanks: Rank[] = ["Ace", "King", "Queen", "Jack", 10, 9, 8, 7, 6, 5, 4, 3, 2];
const allSuits: Suit[] = ["Spades", "Clubs", "Hearts", "Diamonds"];
const allCards: Deck = flatMap((rank: Rank) => map((suit: Suit) => ({suit, rank}), allSuits), allRanks);

function draw(numCards: number, deck: Deck): [Card[], Deck] {
    const cards = take(numCards, deck);
    const newDeck = drop(numCards, deck);
    return [cards, newDeck];
}

function toDisplayFmt(card: Card): string {
    return `${card.rank} of ${card.suit}`;
}

async function game() {
    console.log("Welcome to poker-ts! The game is bad but the code is good...");
    console.log("...");
    await sleep(1 * Second);

    console.log("Let's shuffle the deck...");
    const deck = shuffle(allCards);
    await sleep(1 * Second);

    const [hand, deckMinusHand] = draw(2, deck);
    console.log("And here's your hand:", hand.map(toDisplayFmt));
    await sleep(3 * Seconds);

    const [flop, deckMinusFlop] = draw(3, deckMinusHand);
    console.log("Here's the flop:", flop.map(toDisplayFmt));
    await sleep(3 * Seconds);

    const [turnCard, deckMinusTurn] = draw(1, deckMinusFlop);
    const turn = flop.concat(turnCard);
    console.log("Here's the turn:", turn.map(toDisplayFmt));
    await sleep(3 * Seconds);

    const [riverCard] = draw(1, deckMinusTurn);
    console.log("Here's the river:", turn.concat(riverCard).map(toDisplayFmt));
    await sleep(3 * Seconds);
}

game();
