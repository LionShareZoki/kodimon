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
import { useRouteLoaderData } from "react-router-dom";

const GamePage = (props) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemon1, setPokemon1] = useState([]);
  const [num, setNum] = useState([]);
  const [num1, setNum1] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [attacking, setAttacking] = useState([]);

  ////// Ovdje je taj problem

  const clickHandler = () => {
    setClicked((current) => !current);
  };
  const attackHandler = () => {
    setAttacking((current) => !current);
    const pushText = () => {};
    console.log(attacking);
  };
  // console.log(clicked);
  function randomNumberInRange() {
    return Math.floor(Math.random() * (600 - 1 + 1)) + 1;
  }

  useEffect(() => {
    setNum(randomNumberInRange());
  }, [clicked]);
  useEffect(() => {
    setNum1(randomNumberInRange());
  }, [clicked]);

  // const fetchData = () => {
  //   let poke1 = `https://pokeapi.co/api/v2/pokemon/${num}`;
  //   let poke2 = "https://pokeapi.co/api/v2/pokemon/5";

  //   const getPokmon1 = axios.get(poke1);
  //   const getPokmon2 = axios.get(poke2);
  //   axios.all([getPokmon1, getPokmon2]).then(
  //     axios.spread((...allData) => {
  //       const allDataPokemon1 = allData[0].data;
  //       const allDataPokemon2 = allData[1].data;
  //       setPokemon(allDataPokemon1);
  //       setPokemon1(allDataPokemon2);
  //     })
  //   );
  //   // .catch((err) => {
  //   //   console.error(err);
  //   // });
  // };

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
          response.data.stats[2].base_stat,
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
          response.data.stats[2].base_stat,
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
    },
    [pokemon.speed],
    []
  );

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
              // name={pokemon.name}
              // image={pokemon.image}
              // hp={pokemon.hp}
              // // attack={pokemon.attack}
              // // defense={pokemon.defense}
              // // speed={pokemon.speed}
              {...pokemon}
            />
          </div>
          <div className="poke-right">
            <PokeCard
              // name={pokemon1.name}
              // image={pokemon1.image}
              // hp={pokemon1.hp}
              // attack={pokemon1.attack}
              // defense={pokemon1.defense}
              // speed={pokemon1.speed}
              {...pokemon1}
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
          <text className="capitalize">
            {"  "}
            {!attacking ? pokemon.name : pokemon1.name} Is on the attack
          </text>
        </div>
        <div className="attack">
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
