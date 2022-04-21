import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { HOC } from "../HOC/HOC";
import { default as api } from "../store/apiSlice";
import { ID, isValidHttpUrl } from "../utils";



const Form = () => {
  const [images, setImages] = useState([])
  const { register, handleSubmit, reset } = useForm();
  const [addItem] = api.useAddItemMutation()
  const { enqueueSnackbar } = useSnackbar();
  const { userid } = useParams()

  const onFormSubmit = (data) => {
    let id= ID()
    const { specification, images, ...formValues } = data;
    const specArray = specification.split(",");
    const imagesArray = images.split(",")
    const create = { ...formValues, specification: specArray, images: imagesArray, _id:id }
    console.log("create", create)
    addItem({ id: userid, ...create })
    enqueueSnackbar("Form Submitted Successfully");
    reset()
    setImages([])
  };

  const fetchUrlsFromInput = e => {
    if (e.target.value === "") return setImages([])
    const fetchUrls = e.target.value.split(",")
    setImages(fetchUrls)

  }
  const renderImages = () => {
    return images.map((url, i) => {
      if (isValidHttpUrl(url) === false) return null;
      return <img
        src={url}
        alt=""
        key={i}
        style={{ maxHeight: "200px", width: "100%" }}
      />
    })
  }
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
            {...register("name", { required: true })}
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
            {...register("price", { required: true })}
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
            {...register("listingUrl")}
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
            {...register("specification")}
          />
          <p style={{ margin:"5px 0" }}>Note:separate with comma</p>
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
            {...register("images", { required: true })}
            onChange={e => fetchUrlsFromInput(e)}

          />
          <p style={{ margin:"5px 0" }}>Note:separate with comma</p>
          <div style={{ display: "grid",gridTemplateColumns:"repeat(4,1fr)",gridGap:"10px",margin:"10px 0" }}>
            {renderImages()}
          </div>
        </span>
        <button style={{ marginTop: "20px" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HOC(Form);
