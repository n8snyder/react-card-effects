import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";


const BASE_URL = "https://deckofcardsapi.com/api/deck";

/**
 * Get one shuffled deck
 * 
 * - props: none
 * - states
 *    deckId: string like '6vegxbnvad0s'
 *    cards: array of card objects [{card},{card}, ....]
 *    error: string of error message 'Not enough cards remaining ...'
 * 
 * App -> Deck -> Card
 */

function Deck() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [beingShuffled, setBeingShuffled] = useState(false);

  //Tip(Not TODO): Effect is for something user doesn't get involved
  useEffect(function fetchDeckIdWhenMounted() {
    async function fetchDeckId() {
      const results = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(results.data.deck_id);
    }
    fetchDeckId();
  }, []);

  // Draw one card from deck. If there's none, set error message.
  async function draw() {
    const response = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
    console.log(response.data);
    const card = response.data.cards[0];
    if (response.data.success) {
      setCards(c => [...c, card]);
    }
    else {
      setError(response.data.error);
    }
  }

  // Shuffle the drawn cards back into the deck
  async function shuffle() {
    setBeingShuffled(true);
    await axios.get(`${BASE_URL}/${deckId}/shuffle`);
    setCards([]);
    setBeingShuffled(false);
  }

  // print out loading message at very first when there's no deck yet
  if (!deckId) {
    return <div className="Deck">Loading...</div>
  }

  return (
    <div className="Deck">
      <button className="gimmeCard" onClick={draw}>
        GIMME A CARD!
      </button> <br />
      {!beingShuffled &&
        <button className="shuffle" onClick={shuffle}>
          SHUFFLE
        </button>}
      {beingShuffled &&
        <div>Deck is being shuffled...</div>}
      {error && <p>{error}</p>}
      <ul className="cards">
        {cards.map(c => <li key={c.code}><Card card={c} /></li>)}
      </ul>
    </div>);
}

export default Deck;