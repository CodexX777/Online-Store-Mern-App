import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import "./Cart.css";
import CartItem from "./CartItem";
import { useHttpClient } from "../Hooks/http-hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorModal from "../Shared/FormElements/ErrorModal";

const Cart = () => {
  const auth = useContext(AuthContext);

  const [cartTotal, setCartTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  let cartItems = [];
  let newCartItems = [];
  let newCartTotal = 0;

  useEffect(() => {
    console.log("here");
    const fetchCartItems = async () => {
      try {
        cartItems = await sendRequest(
          `http://localhost:5000/api/user/cart/${auth.uid}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
      } catch (error) {}
    };
    fetchCartItems().then(() => {
      for (let i = 0; i < cartItems.length; i++) {
        let flag = false;
        let j;
        for (j = 0; j < newCartItems.length; j++) {
          if (cartItems[i]._id === newCartItems[j]._id) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          cartItems[i].quantity = 1;
          newCartItems.push(cartItems[i]);

          newCartTotal += cartItems[i].prodPrice;
        } else {
          newCartItems[j].quantity += 1;
          newCartTotal += cartItems[i].prodPrice;
        }
      }

      setProducts(newCartItems);
      setCartTotal(newCartTotal);
    });
  }, [sendRequest]);

  const itemDeleteHandler = async (id, quantity, price) => {
    let deleteItems = [];
    for (let i = 0; i < quantity; i++) {
      deleteItems.push(id);
    }

    try {
      await sendRequest(
        "http://localhost:5000/api/products/remove",
        "POST",
        JSON.stringify({
          uid: auth.uid,
          deleteItems,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (!error) {
        let i = cartTotal - quantity * price;
        setCartTotal(i);

        const updatedProducts = products.filter((item) => item._id !== id);

        setProducts(updatedProducts);
      }
    } catch (error) {}
  };

  const cartBuyHandler = async () => {
    let ItemsId = [];
    products.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        ItemsId.push(item._id);
      }
    });

    try {
      await sendRequest(
        "http://localhost:5000/api/products/buycart",
        "POST",
        JSON.stringify({
          uid: auth.uid,
          cartItems: ItemsId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (!error) {
        setProducts([]);
        setCartTotal(0);
      }
    } catch (error) {}
  };

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
                image={item.prodImage}
                rating={item.prodRating}
                quantity={item.quantity}
                itemDeleteHandler={itemDeleteHandler}
                MyOrder={false}
              />
            ))}
          </ul>
        </div>
        <div className="order-summary">
          <h2>Order summary</h2>
          <h3>Total = {cartTotal}</h3>
          <button className="cart-buy-btn" onClick={cartBuyHandler}>
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
