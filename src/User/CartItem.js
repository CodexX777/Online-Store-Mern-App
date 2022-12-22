import React from "react";
import "./CartItem.css";

const CartItem = (props) => {
  return (
    <li className="cart-item">
      <img
        className="cart-item-image"
        src={`http://localhost:5000/${props.image}`}
        alt={props.name}
      />
      <div className="item-details">
        <div className="name-container">
          <h5 className="cart-item-name">{props.name}</h5>
        </div>

        <div className="cart-item-rating">
          <svg
            width="44"
            height="27"
            viewBox="0 0 44 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="27" rx="5" fill="black" />
            <path
              d="M22.0224 3.53976C22.168 3.07058 22.832 3.07058 22.9776 3.53976L24.7483 9.24893C24.8132 9.45818 25.0067 9.60081 25.2258 9.60081H31.0036C31.4823 9.60081 31.6874 10.2087 31.3065 10.4987L26.5927 14.0865C26.4256 14.2137 26.3557 14.4319 26.418 14.6325L28.2089 20.407C28.3531 20.8717 27.8158 21.2477 27.4285 20.9529L22.8028 17.4321C22.6239 17.2959 22.3761 17.2959 22.1972 17.4321L17.5715 20.9529C17.1842 21.2477 16.6469 20.8717 16.7911 20.407L18.582 14.6325C18.6443 14.4319 18.5744 14.2137 18.4073 14.0865L13.6935 10.4987C13.3126 10.2087 13.5177 9.60081 13.9964 9.60081H19.7742C19.9933 9.60081 20.1868 9.45818 20.2517 9.24893L22.0224 3.53976Z"
              fill="#F09E00"
            />
          </svg>
          <p>{props.rating || "4.5"}</p>
        </div>
        <h4 className="cart-item-price">Price : ₹{props.price}</h4>
        {props.MyOrder === false && (
          <p className="cart-item-quantity">x{props.quantity}</p>
        )}
      </div>
      {props.MyOrder ? (
        <p className="myorder-prod">Will be delivered Soon.</p>
      ) : (
        <button
          className="item-remove-btn"
          onClick={() =>
            props.itemDeleteHandler(props.id, props.quantity, props.price)
          }
        >
          Remove
        </button>
      )}
    </li>
  );
};

export default CartItem;
