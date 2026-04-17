import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css";
import App from './App';

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </AuthProvider>
);


