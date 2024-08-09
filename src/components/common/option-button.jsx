"use client";
import React from "react";

const OptionButton = ({ handleNext, handleBack, back, next,reset,handleReset,finish,justify }) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: justify ? justify : "space-between",
        marginTop: "10px","marginBottom":"10px"
      }}
    >
      {back && (
        <button className="btn btn-primary" onClick={handleBack}>
          {back}
        </button>
      )}
      {reset && handleReset && (
        <button className="btn btn-danger" onClick={handleReset}>
          {reset}
        </button>
      )}
      {next && (
        <button className="btn btn-primary" onClick={handleNext}>
          {next}
        </button>
      )}
      {finish && (
        <button className="btn btn-primary" onClick={handleNext}>
          {finish}
        </button>
      )}
    </div>
  );
};

export default OptionButton;
