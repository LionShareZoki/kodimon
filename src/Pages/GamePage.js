// This is second page of the project. Here the game is played.
import logo from "../images/Kodi-logo.svg";
import kodimon from "../images/kodimon 1.png";
import arrow from "../images/arrow.svg";
import "./GamePage.css";
import PokeCard from "../Components/PokeCard";
import Button from "../Components/Button";
import PokemonList from "../Components/PokemonList";
import { useEffect, useState } from "react";
import axios from "axios";

const GamePage = (props) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemon1, setPokemon1] = useState([]);
  const [num, setNum] = useState([]);
  const [num1, setNum1] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [attacking, setAttacking] = useState([]);

  ////// Ovdje je taj problem

  // useEffect(() => {
  //   if (pokemon?.stats[5]?.base_stat > pokemon1?.stats[5]?.base_stat) {
  //     setAttacking(pokemon);
  //   } else {
  //     setAttacking(pokemon1);
  //   }
  // }, []);

  const clickHandler = () => {
    setClicked((current) => !current);
  };
  // console.log(clicked);
  function randomNumberInRange() {
    return Math.floor(Math.random() * (600 - 1 + 1)) + 1;
  }

  useEffect(() => {
    setNum(randomNumberInRange());
  }, [clicked]);

  const fetchData = () => {
    let poke1 = `https://pokeapi.co/api/v2/pokemon/${num}`;
    let poke2 = "https://pokeapi.co/api/v2/pokemon/5";

    const getPokmon1 = axios.get(poke1);
    const getPokmon2 = axios.get(poke2);
    axios.all([getPokmon1, getPokmon2]).then(
      axios.spread((...allData) => {
        const allDataPokemon1 = allData[0].data;
        const allDataPokemon2 = allData[1].data;
        setPokemon(allDataPokemon1);
        setPokemon1(allDataPokemon2);
      })
    );
    // .catch((err) => {
    //   console.error(err);
    // });
  };
  useEffect(() => {
    fetchData();
  }, [pokemon]);
  if (pokemon.sprites == undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <div className="box">
        <div className="logo-holder">
          <img className="logo1" src={logo} />
          <img className="kodimon1" src={kodimon} />
        </div>
        <div className="poke-holder">
          <div className="poke-left">
            {" "}
            <PokeCard
              name={pokemon.name && pokemon.name}
              image={pokemon.sprites?.other?.dream_world.front_default}
              hp={pokemon?.stats[0].base_stat}
              attack={pokemon?.stats[1]?.base_stat}
              defense={pokemon?.stats[2]?.base_stat}
              speed={pokemon?.stats[5]?.base_stat}
            />
          </div>
          <div className="poke-right">
            <PokeCard
              name={pokemon1.name}
              image={pokemon1.sprites?.other?.dream_world.front_default}
              hp={pokemon1.stats[0].base_stat}
              attack={pokemon1.stats[1].base_stat}
              defense={pokemon1.stats[2].base_stat}
              speed={pokemon1.stats[5].base_stat}
            />
          </div>
        </div>

        <div className="menu-rectangle">
          <h2 className="menu">Menu</h2>
          <Button className={"button-menu"} to="/">
            Home
          </Button>
          <Button className={"button-menu"} onClick={clickHandler}>
            New game
          </Button>
          <Button className={"button-menu"}>New opponent</Button>
        </div>
        <div className="logs-rectangle">
          <h1 className="menu">Logs</h1>
        </div>
        <div className="attack">
          <img className={"arrow"} src={arrow} />
          <Button className={"button-attack"}>Attack!</Button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
