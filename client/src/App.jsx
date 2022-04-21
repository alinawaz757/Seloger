import SearchBar from "./components/SearchBar/SearchBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import { useEffect, useState } from "react";
import SampleProducts from "./components/SampleProducts/SampleProducts";
import axios from "axios";
import FilterProducts from "./components/FilterProducts/FilterProducts";
import NavBar from "./components/NavBAr/NavBar";
import User from "./components/user/user";
import Form from "./components/Form/Form";

const App = () => {
  const [data, setData] = useState([]);
  const [filterby, setFilterby] = useState("");
  const [isSignedIn, setIsSignedIn] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/categories");
      setData(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1087669028902-afkns6qrjqrln9kocnvbtbp63c2vdjuj.apps.googleusercontent.com",
          scope: "email",
        })
        .then((err) => {
          if (err) return err;
          const authenticate = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authenticate.isSignedIn.get());
          authenticate.isSignedIn.listen(onAuthChange);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);
  const onAuthChange = () => {
    setIsSignedIn(!isSignedIn);
  };
  return (
    <BrowserRouter>
      <NavBar isSignedIn={isSignedIn} />
      <SearchBar data={data} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FilterProducts setFilterby={setFilterby} />
              <SampleProducts data={data} filterby={filterby} />
            </>
          }
        />
        <Route path="/users/:userid" element={<User value={isSignedIn}/>} />
        <Route path="/users/:userid/create" element={<Form />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route path="/item/:id" exact element={<ProductDetail />} />
        <Route path="/item/undefined" exact element={<h1>Product not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
