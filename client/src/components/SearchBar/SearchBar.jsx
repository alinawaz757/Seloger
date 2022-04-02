import React from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";

const SearchBar = ({ data }) => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const onSearch = () => {
    const filteredData = data.find((obj) => obj.listing_url === search);
    console.log(typeof filteredData);
    try {
      console.log("search", filteredData);
      navigate(`/item/${filteredData._id}`);
      return null;
    } catch (err) {
      navigate("/notfound");
    }
  };

  return (
    <div className="container">
      <div
        style={{ display: "flex", justifyContent: "flex-start", width: "60%" }}
      >
        <h1
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </h1>
        <h1 style={{ width: "80%", textAlign: "center",fontSize:"50px",textShadow:"4px 4px 5px purple", color:"yellow" }}>Type to search</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <div style={{ width: "100%" }}></div>
    </div>
  );
};

export default SearchBar;
