import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(function fetchDeckIdWhenMounted() {
    async function fetchDeckId() {
      const results = await axios.get(`${BASE_URL}/new`);
      setDeckId(results.data.deck_id);
    }
    fetchDeckId();
  }, []);

  async function draw(){
    const response = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
    const card = response.data.cards[0];
    setCards(c => [...c, card]);
  }
//From here
  return (
  <div className="Deck">
    <button className="gimmeCard" onClick={draw}>

    </button>
    <div className="showCard">

      <Card cards = {cards}/>
    </div>
    
  </div>);
}

export default Deck;