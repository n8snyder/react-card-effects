import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";


const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(function fetchDeckIdWhenMounted() {
    async function fetchDeckId() {
      const results = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(results.data.deck_id);
    }
    fetchDeckId();
  }, []);

  async function draw() {
    const response = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
    console.log(response.data);
    const card = response.data.cards[0];
    setCards(c => [...c, card]);
  }

  if (!deckId) {
    return <div className="Deck">Loading...</div>
  }

  return (
    <div className="Deck">
      <button className="gimmeCard" onClick={draw}>
        GIMME A CARD!
      </button>
      <ul className="cards">
        {cards.map(c => <li key={c.code}><Card card={c} /></li>)}
      </ul>
    </div>);
}

export default Deck;