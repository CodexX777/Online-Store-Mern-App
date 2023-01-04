import React from "react";
import CartItem from "./CartItem";
import "./MyOrder.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../Hooks/http-hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorModal from "../Shared/FormElements/ErrorModal";
import "./Cart.css";


const MyOrder = () => {
  const auth = useContext(AuthContext);
  const address = auth.address ? auth.address : "Update your address.";

  const [products, setProducts] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/products/myorders/${auth.uid}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setProducts(responseData);
        console.log(responseData);
      } catch (error) {}
    };
    fetchItems();
    
  }, [sendRequest]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <div className="cart">
        <div className="cart-panel">
          <ul className="cart-list">
            {products.map((item, index) => (
              <CartItem
                id={item._id}
                key={index}
                name={item.prodName}
                price={item.prodPrice}
                image={item.imageUrl}
                rating={item.rating}
                MyOrder={true}
              />
            ))}
          </ul>
        </div>
        <div className="myorder-address-panel">
          <h3>Address</h3>
          <p className="address">{address}</p>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
