import "./SearchBar.css";

function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClear,
}) {
  return (
    <div className="search-bar">
      <div className="field field-search">
        <label htmlFor="search">🔍 Search</label>
        <input
          id="search"
          type="text"
          placeholder='Try "mouse"...'
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <button type="button" className="clear-btn" onClick={onClear}>
        ✖ Clear Filters
      </button>
    </div>
  );
}

export default SearchBar;