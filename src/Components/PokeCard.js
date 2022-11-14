// This is PokeCard component created so that GamePage is easier to read

import "./PokeCard.css";

const PokeCard = (props) => {
  return (
    <div className="poke-holder">
      <div className="poke">
        <div className="health">{props.health}%</div>
        <div className="row"></div>
        <div className="name">Pikachu</div>
        <div className="photo">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg" />
        </div>
        <div className="status">
          <div className="status-text">Status</div>
        </div>
        <div className="rectangle">
          <div className="rectangle-text">
            HP: {props.hp}
            <br />
            Attack: {props.attack} <br />
            Defense: {props.defense} <br />
            Speed: {props.speed}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default PokeCard;
