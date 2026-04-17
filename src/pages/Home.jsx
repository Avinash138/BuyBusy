import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");

  // 🔥 Combined filter logic
  const filteredProducts = products.filter((p) => {
    // Search filter
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Category filter
    const matchesCategory =
      category.length === 0 || category.includes(p.category);

    // Price filter
    let matchesPrice = true;

    if (price === "low") {
      matchesPrice = p.price <= 500;
    } else if (price === "high") {
      matchesPrice = p.price > 500;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar setCategory={setCategory} setPrice={setPrice} />

      <div className="content">
        {/* Search */}
        <input
    className="search-bar"
    placeholder="Search products..."
    onChange={(e) => setSearch(e.target.value)}
  />

        {/* Products */}
        <div className="grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;