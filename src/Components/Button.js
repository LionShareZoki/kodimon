// This is a button component which can be used for all the buttons in the project
import "./Button.css";
import { Link } from "react-router-dom";

const Button = ({ onClick, children, to, className }) => {
  return (
    <Link to={to}>
      <div>
        <button className={className} onClick={onClick}>
          {children}
        </button>
      </div>
    </Link>
  );
};

export default Button;
