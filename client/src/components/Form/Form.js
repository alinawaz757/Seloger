import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const onFormSubmit = (data) => {
    const {specification, images,...formValues} = data;
    const specArray = specification.split(",");
    const imagesArray = images.split(",")
    const create = {...formValues, specification:specArray, images:imagesArray}
    console.log(create)
  };

  return (
    <div
      style={{
        display: "flex",
        width: "60%",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        padding: "20px",
        boxShadow: "4px 5px 10px purple",
      }}
    >
      <h1 style={{ padding: "5px" }}>Fill in the details</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
        }}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <span style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{ margin: "8px", fontWeight: "bold", fontSize: "20px" }}
          >
            Name
          </label>
          <input
            type="text"
            style={{ textAlign: "start" }}
            {...register("lastName", { required: true })}
          />
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{ margin: "8px", fontWeight: "bold", fontSize: "20px" }}
          >
            Price
          </label>
          <input
            type="number"
            style={{ textAlign: "start" }}
            {...register("price",{ required: true })}
          />
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{ margin: "8px", fontWeight: "bold", fontSize: "20px" }}
          >
            ListingUrl
          </label>
          <input
            type="text"
            style={{ textAlign: "start" }}
            {...register("listingUrl",{ required: true })}
          />
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{ margin: "8px", fontWeight: "bold", fontSize: "20px" }}
          >
            Specification
          </label>
          <input
            type="text"
            style={{ textAlign: "start" }}
            {...register("specification",{ required: true })}
          />
          <p style={{ marginTop: "-10px" }}>Note:separate with comma</p>
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{ margin: "8px", fontWeight: "bold", fontSize: "20px" }}
          >
            ImageUrls
          </label>
          <input
            type="text"
            style={{ textAlign: "start" }}
            {...register("images",{ required: true })}
          />
          <p style={{ marginTop: "-10px" }}>Note:separate with comma</p>
        </span>
        <button style={{ marginTop: "20px" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
