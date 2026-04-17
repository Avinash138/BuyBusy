import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const cartCollection = (uid) =>
  collection(db, `usersCarts/${uid}/myCart`);

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

 const fetchCart = async () => {
  if (!user) return;

  const snap = await getDocs(cartCollection(user.uid));
  const data = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  setCart(data);
};

useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };

  fetchProducts();
}, []);

  const addToCart = async (product) => {
  if (!user) return alert("Login first");

  const ref = doc(db, `usersCarts/${user.uid}/myCart`, product.id);

  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    await updateDoc(ref, {
      quantity: existing.quantity + 1
    });
  } else {
    await setDoc(ref, {
      ...product,
      quantity: 1
    });
  }

  fetchCart();
};

const increaseQty = async (id) => {
  const item = cart.find(p => p.id === id);
  const ref = doc(db, `usersCarts/${user.uid}/myCart`, id);

  await updateDoc(ref, {
    quantity: item.quantity + 1
  });

  fetchCart();
};

const decreaseQty = async (id) => {
  const item = cart.find(p => p.id === id);
  const ref = doc(db, `usersCarts/${user.uid}/myCart`, id);

  if (item.quantity === 1) {
    await deleteDoc(ref);
  } else {
    await updateDoc(ref, {
      quantity: item.quantity - 1
    });
  }

  fetchCart();
};

  return (
    <ProductContext.Provider
  value={{
    products,
    cart,
    addToCart,
    increaseQty,
    decreaseQty
  }}
>
      {children}
    </ProductContext.Provider>
  );
};