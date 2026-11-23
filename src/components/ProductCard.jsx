import "./ProductCard.css";

const icons = {
  Electronics: "🖱️",
  Books: "📚",
  "School Supplies": "✏️",
  Accessories: "🎒",
  General: "🛍️",
};

function ProductCard({ title, price, category = "General", inStock, onAddToCart, children }) {
  const formattedPrice = price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const slug = category.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`product-card ${inStock ? "" : "out-of-stock"}`}>
      {children && <div className="badge">{children}</div>}

      <div className={`card-art cat-${slug}`}>
        <span className="card-icon">{icons[category] || icons.General}</span>
      </div>

      <div className="card-body">
        <p className="category">{category}</p>
        <h3>{title}</h3>
        <p className="price">₱{formattedPrice}</p>
        <p className={inStock ? "status in-stock" : "status no-stock"}>
          {inStock ? "In Stock" : "Out of Stock"}
        </p>
        <button disabled={!inStock} onClick={() => onAddToCart(title)}>
          {inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;