import { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const handleAddToCart = (title) => {
    setCartCount(cartCount + 1);
    setLastAdded(title);
  };

  const badges = { 1: "New", 8: "Sale" };

  return (
    <div className="app">
      <header className="hero">
        <span className="hero-tag">✨ Official Campus Shop</span>
        <h1>CvSU Mini Store</h1>
        <p className="hero-sub">Everything you need for class, all in one place.</p>
      </header>

      <main className="content">
        <p key={cartCount} className={`cart-message ${cartCount > 0 ? "has-items" : ""}`}>
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {badges[product.id] && <span>{badges[product.id]}</span>}
            </ProductCard>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;