import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./Items.css";
import Modal from "../Modal/Modal";
import { useFormik } from "formik";
import { ProdUpdateSchema } from "../../schemas/ProdUpdateSchema";
import { useHttpClient } from "../../Hooks/http-hook";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import ErrorModal from "../FormElements/ErrorModal";

const Items = (props) => {
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const navigate = useNavigate();
  const [stock, setStock] = useState(props.stock);
  const [price, setPrice] = useState(props.price);

  const auth = useContext(AuthContext);
  const [buyPortal, setBuyPortal] = useState(false);
  const openBuyPortal = () => {
    setBuyPortal(true);
  };
  const closeBuyPortal = () => {
    setBuyPortal(false);
  };

  const buyNowHandler = async () => {
    if (auth.uid == null) {
      navigate("/auth");
    }

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/api/products/buynow`,
        "POST",
        JSON.stringify({
          pid: props.id,
          uid: auth.uid,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setBuyPortal(false);
      if(!error){
        setStock(stock-1);
      }
      
    } catch (error) {}
  };

  const addToCartHandler = async () => {
    if (auth.uid == null) {
      navigate("/auth");
    }

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/api/products/addtocart`,
        "POST",
        JSON.stringify({
          uid: auth.uid,
          pid: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setBuyPortal(false);
    } catch (error) {}
  };

  let footerCustContent =
    stock >= 1 ? (
      <div>
        <button className="buy-btn" onClick={buyNowHandler}>
          BUY NOW
        </button>
        <button className="add-btn" onClick={addToCartHandler}>
          ADD TO CART
        </button>
      </div>
    ) : (
      <div className="out-of-stock">
        <p>Out of Stock</p>
      </div>
    );

  const prodUpdateHanlder = async (event, action) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/api/myproducts/update`,
        "PATCH",
        JSON.stringify({
          pid: props.id,
          uid: props.uid,
          prodStock: event.stock,
          prodPrice: event.price,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setPrice(event.price);
      setStock(event.stock);
      closeBuyPortal();
    } catch (error) {}
  };

  const initialValues = {
    stock,
    price,
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ProdUpdateSchema,
    onSubmit: prodUpdateHanlder,
  });

  let footerSellerContent = (
    <div className="seller-footer">
      <input
        type="number"
        name="stock"
        id="stock"
        required
        value={values.stock}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="seller-placeholder">Stock</span>

      <input
        type="number"
        name="price"
        id="price"
        required
        value={values.price}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="seller-placeholder">₹</span>

      <button type="submit" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={buyPortal}
        onCancel={closeBuyPortal}
        header={props.name}
        contentClass="item__modal-content"
        footerClass={
          props.sellerProd === true
            ? "item__modal-actions seller"
            : "item__modal-actions"
        }
        footer={
          props.sellerProd === true ? footerSellerContent : footerCustContent
        }
      >
        <div className="buymodal-item-image">
          <img src={process.env.REACT_APP_BACKEND_URL+`/${props.image}`} alt="product" />
        </div>

        <div className="buymodal-item-content">
          <p className="buymodal-item-price">Price : {price}</p>
          <p className="buymodal-item-description">{props.description}</p>
        </div>
      </Modal>

      <li className="item" onClick={openBuyPortal}>
        <div className="item-card">
          <div>
            <img
              className="item-image"
              src={process.env.REACT_APP_BACKEND_URL+`/${props.image}`}
              alt="gamepad"
            />
          </div>
          <div className="item-name">
            <p className="item-name">{props.name}</p>
          </div>

          <div className="item-price">
            <p className="item-price">Price : ₹{price}</p>
          </div>
          <div className="item-rating">
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
            <p className="item-rating">{props.rating || "4.5"}</p>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default Items;
