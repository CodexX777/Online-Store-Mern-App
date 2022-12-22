import React from "react";
import { useFormik } from "formik";
import Button from "../Shared/FormElements/Button";
import "./SellerSignUp.css";
import { sellerSignUpSchema } from "../schemas/sellerSignUpSchema";

const SellerLogin = (props) => {
  const initialValues = {
    name: "",
    phoneNo: "",
    email: "",
    GstNo: "",
    password: "",
    confirmPassword: "",
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
    validationSchema: sellerSignUpSchema,
    onSubmit: props.authSubmitHandler,
  });
  return (
    <form className="auth-form seller-signup-form" onSubmit={handleSubmit}>
      <div className="seller-input-field1">
        <input
          type="text"
          name="name"
          id="name"
          required
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="seller-placeholder">Name</span>
      </div>

      {errors.name && touched.name && (
        <p className="seller-input-error1">{errors.name}</p>
      )}

      <div className="seller-input-field2">
        <input
          type="tel"
          name="phoneNo"
          id="phoneNo"
          required
          value={values.phoneNo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="seller-placeholder">Phone Number</span>
      </div>

      {errors.phoneNo && touched.phoneNo && (
        <p className="seller-input-error2">{errors.phoneNo}</p>
      )}

      <div className="seller-input-field3">
        <input
          type="text"
          name="email"
          id="email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="seller-placeholder">E-mail</span>
      </div>

      {errors.email && touched.email && (
        <p className="seller-input-error3">{errors.email}</p>
      )}

      <div className="seller-input-field4">
        <input
          type="text"
          name="GstNo"
          id="GstNo"
          required
          value={values.GstNo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="seller-placeholder">Gst number</span>
      </div>

      {errors.GstNo && touched.GstNo && (
        <p className="seller-input-error4">{errors.GstNo}</p>
      )}

      <div className="seller-input-field5">
        <input
          type="password"
          name="password"
          id="password"
          required
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="seller-placeholder">Password</span>
      </div>

      {errors.password && touched.password && (
        <p className="seller-input-error5">{errors.password}</p>
      )}

      <div className="seller-input-field6">
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="seller-placeholder">Confirm Password</span>
      </div>

      {errors.confirmPassword && touched.confirmPassword && (
        <p className="seller-input-error6">{errors.confirmPassword}</p>
      )}

      <Button type="submit" className="form-submit-btn">
        SignUp
      </Button>
      <Button linkLike className="seller-signup-btn" onClick={props.sellerModeHandler}>
        Already have an account? Login here.
      </Button>
    </form>
  );
};

export default SellerLogin;
