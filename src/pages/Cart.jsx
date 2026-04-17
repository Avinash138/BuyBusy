import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const { cart } = useProducts();

  return (
    <div className="grid">
      {cart.map(item => (
        <ProductCard key={item.id} product={item} isCart />
      ))}
    </div>
  );
};

export default Cart;