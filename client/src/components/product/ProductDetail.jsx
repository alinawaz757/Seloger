import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetail.css";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/categories");
      const filteredData = data.find((obj) => obj._id === params.id);
      if (filteredData !== undefined) return setData(filteredData);
      if (filteredData === undefined) {
        const { data } = await axios.get(
          `http://localhost:8080/api/items/${params.id}`
        );

        if (data !== undefined) setData(data[0]);
      }
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns:"repeat(4,1fr)",
              
              gridGap:"10px",
              margin:"20px 8px 20px 8px"
            }}
          >
            {data?.images.map((url) => {
              return (
                <span key={url} style={{maxHeight:"200px"}}>
                  <img
                    src={url}
                    alt=""
                    style={{width:"100%"}}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
