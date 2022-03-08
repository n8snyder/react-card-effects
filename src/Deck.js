import axios from "axios";
import { useEffect, useState } from "react";

const NEW_DECK_URL = "https://deckofcardsapi.com/api/deck/new/";

function Deck() {
  const [deckId, setDeckId] = useState(null);

  useEffect(function fetchDeckIdWhenMounted() {
    async function fetchDeckId() {
      const results = await axios.get(NEW_DECK_URL);
    }
  })

  return null;
}

export default Deck;