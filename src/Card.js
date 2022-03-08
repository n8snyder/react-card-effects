/**
 * Show card drawn in image
 * 
 * -prop 
 *    card: object {code, image, images, value, suit}
 * 
 * -state: none
 * 
 * Deck -> Card
 */

function Card({ card }) {
  return (
    <img alt={card.code} src={card.image} />
  );
}

export default Card;