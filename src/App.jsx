import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProductForm from "./components/AddProductForm";

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Wara pa ako maisip</h1>
        <nav>
          <Link to="/" style={{ marginRight: 12 }}>Products</Link>
          <Link to="/add">Add Product</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add" element={<AddProductForm />} />
        </Routes>
      </main>
    </div>
  );
}
