import React from "react";
import RenderProducts from "./RenderProducts";

const SampleProducts = ({ data, filterby }) => {
  const sampleItems = data?.slice(0, 20).map((product) => {
    const item = {
      url: product.images[0],
      id: product._id,
      price: product.price,
      name: product.name,
    };
    return item;
  });
  const filteredItems = data
    .filter((item) => item.name === filterby)
    .slice(0, 40)
    .map((product) => {
      const item = {
        url: product.images[0],
        id: product._id,
        price: product.price,
        name: product.name,
      };
      return item;
    });

  const renderProducts = () => {
    if (data.length < 1) {
      return <h1>Loading...</h1>;
    } else if (filterby) {
      return filteredItems.map((item) => {
        return <RenderProducts {...item} key={item.id} />;
      });
    } else {
      return sampleItems.map((item) => {
        return <RenderProducts {...item} key={item.id} />;
      });
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {renderProducts()}
    </div>
  );
};

export default SampleProducts;
