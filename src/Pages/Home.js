// This is a home page where you see the game's logo and you click a button to start a new game.
import logo from "../images/Kodi-logo.svg";
import kodimon from "../images/kodimon 1.png";
import "./Home.css";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="parent">
      <div className="homeImagesHolder">
        <img className="logo" src={logo}></img>
        <img className="kodimon" src={kodimon}></img>
        <div className="button-container">
          <Button className={"button"} to="/game">
            New Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
