const Sidebar = ({ setCategory, setPrice }) => {
  const handleCategory = (e) => {
    const value = e.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="sidebar">
      <div className="filter-group">
        <h3>Category</h3>

        <label>
          <input type="checkbox" value="electronics" onChange={handleCategory} />
          Electronics
        </label>

        <label>
          <input type="checkbox" value="men's clothing" onChange={handleCategory} />
          Clothing
        </label>
      </div>

      <div className="filter-group">
        <h3>Price</h3>

        <label>
          <input type="radio" name="price" value="low" onChange={(e) => setPrice(e.target.value)} />
          0 - 500
        </label>

        <label>
          <input type="radio" name="price" value="high" onChange={(e) => setPrice(e.target.value)} />
          500 - 2000
        </label>
      </div>
    </div>
  );
};

export default Sidebar;