import React from "react";
import { useFormik } from "formik";
import { AddressSchema } from "../schemas/AddressSchema";
import "./Address.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../Hooks/http-hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorModal from "../Shared/FormElements/ErrorModal";

const Address = () => {
  const auth = useContext(AuthContext);
  const navigate=useNavigate();
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const addressSubmitHandler = async (event) => {
    try {
      console.log(auth.uid);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/api/user/address/${auth.uid}`,
        "PATCH",
        JSON.stringify(event),
        {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+auth.token
        }
      );
      auth.changeAddress(event.address);
      navigate('/');
    } catch (error) {}
  };

  const initialValues = {
    address: auth.address,
  };

  const {
    values,
    handleBlur,
    touched,
    handleChange,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddressSchema,
    onSubmit: addressSubmitHandler,
  });

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />

      <div id="updateAddress">
        <textarea
          className="address-textarea"
          type="text area"
          name="address"
          id="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Write your address here."
        />
        <span className="placeholder"></span>
      </div>

      {errors.address && touched.address && (
        <p className="address-input-error">{errors.address}</p>
      )}
      <button className="updateaddress" type="submit" onClick={handleSubmit}>
        Update Address
      </button>
    </>
  );
};

export default Address;
