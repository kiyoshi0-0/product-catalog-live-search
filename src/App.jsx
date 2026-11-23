import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  // Lab 3: cart state
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Lab 4: search and filter state
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const handleAddToCart = (title) => {
    setCartCount(cartCount + 1);
    setLastAdded(title);
  };

  // Debounce effect: wait 300ms after the last keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, [searchText]);

  // Derived list: calculated during render, not stored in state
  let filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase()) &&
      (category === "All" || product.category === category)
  );

  // Copy before sorting so the original products array is never changed
  filteredProducts = [...filteredProducts];
  if (sortOrder === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Title effect: runs only when the number of results changes
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch(""); // reset instantly instead of waiting 300ms
    setCategory("All");
    setSortOrder("default");
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
        <p
          key={cartCount}
          className={`cart-message ${cartCount > 0 ? "has-items" : ""}`}
        >
          {cartCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
        </p>

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClear={handleClear}
        />

        <p className="result-count">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔎</span>
            <p>No products found. Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
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
        )}
      </main>
    </div>
  );
}

export default App;