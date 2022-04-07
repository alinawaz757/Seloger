import React from "react";

const FilterProducts = ({ setFilterby }) => {
  const onRadioChange = (e) => {
    setFilterby(e.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        marginTop: "30px",
        width: "80%",
      }}
    >
      <h2>Filter By: </h2>
      <div
        onClick={onRadioChange}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "80%",
          marginTop: "5px",
        }}
      >
        <span>
          <input type="radio" value="" name="Seloger" /> All
        </span>
        <span>
          <input type="radio" value="Appartement" name="Seloger" /> Appartement
        </span>
        <span>
          <input type="radio" value="Villa" name="Seloger" /> Villa
        </span>
        <span>
          <input type="radio" value="Studio" name="Seloger" /> Studio
        </span>
        <span>
          <input type="radio" value="Maison/Villa" name="Seloger" />{" "}
          Maison/Villa
        </span>
      </div>
    </div>
  );
};

export default FilterProducts;
