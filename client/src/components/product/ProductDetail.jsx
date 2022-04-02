import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const params = useParams()
  console.log(params)
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/categories");
      const filteredData = data.find((obj) => obj._id === params.id);
      console.log(filteredData)
      setData(filteredData);
    };
    fetchData();
  }, [params]);
  if (Object.keys(data).length < 1) return <h1>Loading</h1>;
  return (
    <div className="container">
      <div className="p-detail">
        <div>
          {data && (
            <>
              <h3>
                Name: <span>{data.name}</span>
              </h3>
              <h3>
                Price: <span>{data.price}</span>
              </h3>
              <h3>
                Listing_URL: <span>{data.listing_url}</span>
              </h3>
              <h3>
                Specification: <span>{data?.specification?.join(", ")}</span>
              </h3>
            </>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              margin: "10px",
              boxShadow: "3px 3px 5px gray",
              padding: "5px",
            }}
          >
            Images
          </h1>
          {data?.images.map((url) => {
            return (
              <span
                key={url}
                style={{
                  margin: "auto",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <img
                  key={url}
                  src={url}
                  alt=""
                  style={{ display: "flex", height: "300px", width: "350px" }}
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
