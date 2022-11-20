// This is PokeCard component created so that GamePage is easier to read
import { LinearProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./PokeCard.css";

const PokeCard = (props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#62ff84",
      },
      secondary: {
        main: "#FFCC00",
      },
      third: {
        main: "#ff3d3d",
      },
    },
  });

  return (
    <div className="poke-holder">
      <div className="poke">
        <div className="health">{props.health}%</div>
        <div className="row">
          <ThemeProvider theme={theme}>
            <LinearProgress
              className={
                props.health > 50
                  ? "row1"
                  : props.health > 30 && props.health <= 50
                  ? "row2"
                  : "row3"
              }
              variant="determinate"
              color={
                props.health > 50
                  ? "primary"
                  : props.health > 30 && props.health <= 50
                  ? "secondary"
                  : "third"
              }
              value={props.health}
            />
          </ThemeProvider>
        </div>
        <div className="name">{props.name}</div>
        <div className="photo">
          <img className="photo1" src={props.image} />
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
