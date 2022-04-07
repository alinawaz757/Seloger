import SearchBar from "./components/SearchBar/SearchBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import { useEffect, useState } from "react";
import SampleProducts from "./components/SampleProducts/SampleProducts";
import axios from "axios";
import FilterProducts from "./components/FilterProducts/FilterProducts";
import NavBar from "./components/NavBar";

const App = () => {
  const [data, setData] = useState([]);
  const [filterby, setFilterby] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8080/api/categories");
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
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
        <Route path="/notfound" element={<h1>Not Found</h1>} />
        <Route path="/item/:id" exact element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
