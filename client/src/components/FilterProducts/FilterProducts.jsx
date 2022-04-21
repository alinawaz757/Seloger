import React from "react";

const FilterProducts = ({ setFilterby }) => {
  const onRadioChange = (e) => {
    setFilterby(e.target.value);
  };
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",marginTop:"20px"}}>
      <h2>Filter By: </h2>
      <div  style={{width:"60%",display:"flex",justifyContent:"space-between"}}>
        <span>
          <input type="radio" value="" name="Seloger" className="radio" onClick={onRadioChange} />
          All
        </span>
        <span>
          <input
            type="radio"
            value="Appartement"
            name="Seloger"
            className="radio"
            onClick={onRadioChange}
          />
          Appartement
        </span>
        <span>
          <input
            type="radio"
            value="Villa"
            name="Seloger"
            className="radio"
            onClick={onRadioChange}
          />
            Villa
        </span>
        <span>
          <input
            type="radio"
            value="Studio"
            name="Seloger"
            className="radio"
            onClick={onRadioChange}
          />
            Studio
        </span>
        <span>
          <input
            type="radio"
            value="Maison/Villa"
            name="Seloger"
            className="radio"
            onClick={onRadioChange}
          />
          Maison/Villa
        </span>
      </div>
    </div>
  );
};

export default FilterProducts;
