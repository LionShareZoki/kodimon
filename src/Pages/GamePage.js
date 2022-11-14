// This is second page of the project. Here the game is played.
import logo from "../images/Kodi-logo.svg";
import kodimon from "../images/kodimon 1.png";
import arrow from "../images/arrow.svg";
import "./GamePage.css";
import PokeCard from "../Components/PokeCard";
import Button from "../Components/Button";

const GamePage = (props) => {
  return (
    <div className="wrapper">
      <div className="box">
        <div className="logo-holder">
          <img className="logo1" src={logo} />
          <img className="kodimon1" src={kodimon} />
        </div>
        <div className="poke-holder">
          <div className="poke-left">
            <PokeCard
              health={50}
              hp={88}
              attack={100}
              defense={10}
              speed={1000}
            />
          </div>
          <div className="poke-right">
            <PokeCard
              health={50}
              hp={88}
              attack={100}
              defense={10}
              speed={1000}
            />
          </div>
        </div>

        <div className="menu-rectangle">
          <h2 className="menu">Menu</h2>
          <Button className={"button-menu"} to="/">
            Home
          </Button>
          <Button className={"button-menu"}>New game</Button>
          <Button className={"button-menu"}>New opponent</Button>
        </div>
        <div className="logs-rectangle">
          <h1 className="menu">Logs</h1>
        </div>
        <div className="attack">
          <img className="arrow" src={arrow} />
          <Button className={"button-attack"}>Attack!</Button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
