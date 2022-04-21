import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { default as api } from "../store/apiSlice";

const RenderProducts = ({ id, url, price, name, renderDeleteButton }) => {
  const navigate = useNavigate();
  const [deleteItem] = api.useDeleteItemMutation();
  const onImageClick = () => {
    navigate(`/item/${id}`);
  };
  const onDeleteButton = () => {
    const userId = localStorage.getItem("id");
    console.log({ userId });
    deleteItem({ userId: userId, id: id });
  };
  return (
    <div
      style={{
        margin: "20px",
        height: "370px",
        width: "350px",
        boxShadow: "3px 3px 5px gray",
        backgroundColor: "white",
        padding: "10px",
      }}
    >
      <img
        src={url}
        alt="loading"
        style={{ height: "300px", width: "350px", marginBottom: "5px" }}
        onClick={onImageClick}
      />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>{name}</h4>
          {renderDeleteButton && (
            <button className="deleteButton" onClick={onDeleteButton}>
              delete
            </button>
          )}
        </div>
        <br />
        <h4>Price: ${price}</h4>
      </div>
    </div>
  );
};

export default RenderProducts;
