import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainNav from "./components/Navbar/MainNav";
import { AuthContext } from "./context/auth-context";
import SellerAuth from "./Seller/SellerAuth";
import ItemDisplay from "./Shared/Items/ItemDisplay";
import Cart from "./User/Cart";
import AddProduct from "./Seller/AddProduct";
import MyProduct from "./Seller/MyProduct";
import MyOrder from "./User/MyOrder";
import Address from "./User/Address";
import SearchItems from "./Shared/Items/searchItems";
import { useAuth } from "./Hooks/auth-hook";

function App() {
  const {
    cart,
    address,
    uid,
    login,
    logout,
    sellerLogin,
    sellerLogout,
    isLoggedIn,
    isSeller,
    changeAddress,
  } = useAuth();

  let routes;

  if (isSeller) {
    routes = (
      <Routes>
        <Route path="/" element={<MyProduct />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/myprod" element={<MyProduct />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/sellerAuth" element={<Navigate replace to="/" />} />
        <Route path="/search" element={<SearchItems />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<ItemDisplay />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/address" element={<Address />} />
        <Route path="/sellerAuth" element={<SellerAuth />} />
        <Route path="/auth" element={<Navigate replace to="/" />} />
        <Route path="/search" element={<SearchItems />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<ItemDisplay />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Navigate replace to="/auth" />} />
        <Route path="/sellerAuth" element={<SellerAuth />} />
        <Route path="/search" element={<SearchItems />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!isLoggedIn,
        isSeller: !!isSeller,
        token: isSeller || isLoggedIn,
        login,
        sellerLogin,
        sellerLogout,
        logout,
        cart,
        uid,
        address,
        changeAddress,
      }}
    >
      <BrowserRouter>
        <MainNav />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
