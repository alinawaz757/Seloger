import React from "react";
import { useNavigate } from "react-router-dom";

const RenderProducts = ({ id, url, price, name }) => {
  const navigate = useNavigate();
  const onImageClick = () => {
    navigate(`/item/${id}`);
  };
  return (
    <div
      onClick={onImageClick}
      style={{
        margin: "20px",
        height: "370px",
        width: "350px",
        boxShadow:"3px 3px 5px gray",
        backgroundColor:"white",
        padding:"10px"
      }}
    >
      <img
        src={url}
        alt="loading"
        style={{ height: "300px", width: "350px", marginBottom:"5px" }}
      />
      <h4>{name}</h4><br />
      <h4>Price: ${price}</h4>
    </div>
  );
};

export default RenderProducts;
