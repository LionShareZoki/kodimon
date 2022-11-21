// This is second page of the project. Here the game is played.
import logo from "../images/Kodi-logo.svg";
import kodimon from "../images/kodimon 1.png";
import arrow from "../images/arrow.svg";
import "./GamePage.css";
import PokeCard from "../Components/PokeCard";
import Button from "../Components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
// import { MDCLinearProgress } from "@material/linear-progress";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const GamePage = (props) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemon1, setPokemon1] = useState([]);
  const [num, setNum] = useState([]);
  const [num1, setNum1] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [attacking, setAttacking] = useState([]);
  const [attackClick, setAttackClick] = useState([1]);
  const [attackDamage, setAttackDamage] = useState([]);
  const [attackDamage1, setAttackDamage1] = useState([]);
  const [health, setHealth] = useState([100]);
  const [health1, setHealth1] = useState([100]);
  const [text, setText] = useState(["The better should win!"]);
  const [end, setEnd] = useState();
  const [winner, setWinner] = useState();
  const clickHandler = () => {
    setClicked((current) => !current);
    setEnd((end) => (end = 0));
  };

  function randomNumberInRange(min, max) {
    const number = (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(
      0
    );

    return number;
  }

  useEffect(() => {
    setNum(randomNumberInRange(1, 600));
    setText((text) => (text = []));
  }, [clicked]);
  useEffect(() => {
    setNum1(randomNumberInRange(1, 600));
  }, [clicked]);

  const getFirstPokemon = async () => {
    const response = await axios(
      `https://pokeapi.co/api/v2/pokemon/${num}`
    ).then((response) => {
      setPokemon({
        name: response.data.name,
        image: response.data.sprites?.other?.dream_world.front_default,
        hp:
          response.data.stats?.[0].base_stat &&
          response.data.stats[0].base_stat,
        attack:
          response.data.stats?.[1].base_stat &&
          response.data.stats[1].base_stat,
        defense:
          response.data.stats?.[2].base_stat &&
          response.data.stats?.[2].base_stat,
        speed:
          response.data.stats?.[5].base_stat &&
          response.data.stats[5].base_stat,
      });
    });
  };
  const getSecondPokemon = async () => {
    const response = await axios(
      `https://pokeapi.co/api/v2/pokemon/${num1}`
    ).then((response) => {
      setPokemon1({
        name: response.data.name,
        image: response.data.sprites?.other?.dream_world.front_default,
        hp:
          response.data.stats?.[0].base_stat &&
          response.data.stats[0].base_stat,
        attack:
          response.data.stats?.[1].base_stat &&
          response.data.stats[1].base_stat,
        defense:
          response.data.stats?.[2].base_stat &&
          response.data.stats?.[2].base_stat,
        speed:
          response.data.stats?.[5].base_stat &&
          response.data.stats[5].base_stat,
      });
    });
  };
  const getPokemons = () => {
    getFirstPokemon();
    getSecondPokemon();
  };
  getPokemons();

  const speedCheck = () => {
    pokemon.speed > pokemon1.speed ? setAttacking(false) : setAttacking(true);
  };
  useEffect(
    () => {
      speedCheck();
      setAttackDamage(
        pokemon1.defense <= 90
          ? ((pokemon.attack / 2) * (100 - pokemon1.defense)) / 100
          : ((pokemon.attack / 2) * (100 - 90)) / 100
      );
      setAttackDamage1(
        pokemon.defense <= 90
          ? ((pokemon1.attack / 2) * (100 - pokemon.defense)) / 100
          : ((pokemon1.attack / 2) * (100 - 90)) / 100
      );
      setHealth(pokemon.hp);
      setHealth1(pokemon1.hp);
    },
    [pokemon.speed],
    []
  );
  const attackHandler = () => {
    setAttacking((current) => !current);
    setAttackClick((current) => !current);
  };

  const attack = () => {
    attacking
      ? setHealth1(health1 - attackDamage)
      : setHealth(health - attackDamage1);
  };

  useEffect(() => {
    randomNumberInRange(1, 5) == 5 ? promasaj() : napad();
  }, [attackClick]);

  const napad = () => {
    setEnd(
      (end) => (end = attackDamage > health1 || attackDamage1 > health ? 1 : 0)
    );
    logs(1);
    setWinner((winner) => (winner = attacking ? pokemon.name : pokemon1.name));
    setText((text) => (text = !end ? [...text] : [...text, `${winner} won.`]));
    attack();
  };
  const promasaj = () => {
    logs(0);
  };

  const logs = (x) => {
    x && attacking
      ? setText((current) => [
          ...current,
          `${pokemon.name} attacked ${pokemon1.name} for ${attackDamage} dmg.`,
        ])
      : x && !attacking
      ? setText((current) => [
          ...current,
          `${pokemon1.name} attacked ${pokemon.name} for ${attackDamage1} dmg.`,
        ])
      : x && attacking
      ? setText((current) => [...current, `${pokemon1.name} missed.`])
      : setText((current) => [...current, `${pokemon.name} missed.`]);
  };

  const showHealth = () => {
    return ((health / pokemon.hp) * 100).toFixed(1) < 0
      ? 0
      : ((health / pokemon.hp) * 100).toFixed(1);
  };
  const showHealth1 = () => {
    return ((health1 / pokemon1.hp) * 100).toFixed(1) < 0
      ? 0
      : ((health1 / pokemon1.hp) * 100).toFixed(1);
  };

  return (
    <div className="wrapper">
      <div className="box">
        <div className="logo-holder">
          <img className="logo1" src={logo} />
          <img className="kodimon1" src={kodimon} />
        </div>
        <div className={end ? "poke-holder1" : "poke-holder"}>
          <div className="poke-left">
            {" "}
            <PokeCard {...pokemon} health={showHealth()} />
          </div>
          <div className="poke-right">
            <PokeCard {...pokemon1} health={showHealth1()} />
          </div>
        </div>
        <h1 className={end ? "winner1" : "winner"}>{winner} won!</h1>
        <div className={end ? "menu-rectangle1" : "menu-rectangle"}>
          <h2 className="menu">Menu</h2>
          <Button className={"button-menu"} to="/">
            Home
          </Button>
          <Button className={"button-menu"} onClick={clickHandler}>
            New game
          </Button>
          <Button className={"button-menu"}>New opponent</Button>
        </div>
        <div className={end ? "logs-rectangle1" : "logs-rectangle"}>
          <h1 className="menu">Logs</h1>
          <p className="capitalize">
            {text.map((name, index) => {
              return (
                <div>
                  <li key={index}>{name}</li>
                </div>
              );
            })}
          </p>
        </div>
        <div className={end ? "attack1" : "attack"}>
          <img className={attacking ? "arrow1" : "arrow"} src={arrow} />
          <Button onClick={attackHandler} className={"button-attack"}>
            Attack!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
