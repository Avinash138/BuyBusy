import { useProducts } from "../context/ProductContext";

const ProductCard = ({ product, isCart }) => {
  const { addToCart, increaseQty, decreaseQty } = useProducts();

  return (
    <div className="card">
      <img src={product.image} alt="" />

      <div className="card-body">
        <div className="card-title">{product.title}</div>
        <div className="card-price">₹{product.price}</div>

        {!isCart ? (
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        ) : (
          <div className="qty-control">
            <button onClick={() => decreaseQty(product.id)}>-</button>
            <span>{product.quantity}</span>
            <button onClick={() => increaseQty(product.id)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;