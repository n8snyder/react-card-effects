function Card({ card }) {
  return (
    <img alt={card.code} src={card.image} />
  );
}

export default Card;