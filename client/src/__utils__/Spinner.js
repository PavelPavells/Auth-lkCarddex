import React from "react";
import spinner from "../images/spinner.gif";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      <img className="indicator" src={spinner} alt="Loading..." />
    </div>
  );
};
export default Spinner;