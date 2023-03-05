import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Sidebar from "./components/Sidebar.js";
import ProductDetails from "./components/ProductDetails.js";
import CompareProducts from "./components/CompareProducts.js";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleStateChange = (neweArray) => {
    console.log("surya ", neweArray, products);
    setSelectedProducts(neweArray);
    console.log("surya ", products);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data["products"]);
        console.log(products, response.data["products"]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main">
          <Sidebar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProductDetails
                  products={products}
                  isLoading={isLoading}
                  error={error}
                  selectedProducts={selectedProducts}
                  onStateChange={handleStateChange}
                />
              }
            />
            {/* <Route
              exact
              path="/product/:id"
              element={
                <ProductDetails
                  products={products}
                  isLoading={isLoading}
                  error={error}
                />
              }
            /> */}
            <Route
              exact
              path="/compare"
              element={
                <CompareProducts
                  products={products}
                  isLoading={isLoading}
                  error={error}
                  selectedProducts={selectedProducts}
                  onStateChange={handleStateChange}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
