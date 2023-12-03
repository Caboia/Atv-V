import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./pages/users";
import Products from "./pages/products";
import ClienteForm from "./pages/clienteForm";
import ProdutoForm from "./pages/produtoForm";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/formCliente" element={<ClienteForm />} />
        <Route path="/formProduto" element={<ProdutoForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
