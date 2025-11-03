import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext"; // 👈 add this

export default function ProductCard({ product }) {
  const { updateProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext); // 👈 use cart

  const subtotal = product.price * product.quantity;
  const lowStock = product.quantity < 5;

  function increment() {
    updateProduct(product.id, { quantity: product.quantity + 1 });
  }
  function decrement() {
    const newQty = Math.max(0, product.quantity - 1);
    updateProduct(product.id, { quantity: newQty });
  }

  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: 12,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        background: "#fff",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          borderRadius: 6,
        }}
      />
      <h3 style={{ margin: "8px 0" }}>{product.name}</h3>
      <div style={{ fontSize: 14, color: "#555" }}>
        {product.category} • Rating: {product.rating}
      </div>

      <div style={{ marginTop: 8 }}>
        <div>Price: ${product.price.toFixed(2)}</div>
        <div>
          Quantity:
          <button onClick={decrement} style={{ marginLeft: 8 }}>−</button>
          <span style={{ margin: "0 8px" }}>{product.quantity}</span>
          <button onClick={increment}>+</button>
        </div>
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
      </div>

      {lowStock && (
        <div
          style={{
            marginTop: 8,
            color: "white",
            background: "#e74c3c",
            padding: "6px 8px",
            borderRadius: 4,
            display: "inline-block",
          }}
        >
          Low Stock
        </div>
      )}

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <button>View Details</button>
        </Link>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
