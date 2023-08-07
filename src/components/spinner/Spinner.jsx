import React from "react";
import "./spinner.css";

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
}

export default Spinner;
