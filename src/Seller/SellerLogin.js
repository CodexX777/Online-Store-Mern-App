import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/loginSchema";
import Button from "../Shared/FormElements/Button";

const SellerLogin = (props) => {
 
  const initialValues = {
    email: "",
    password: "",
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
    validationSchema: loginSchema,
    onSubmit: props.authSubmitHandler,
  });
  return (
    <form className="auth-form seller-login" onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          type="text"
          name="email"
          id="email"
          required
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="placeholder">E-mail</span>
      </div>

      {errors.email && touched.email && (
        <p className="form-input-error">{errors.email}</p>
      )}

      <div className="input-field">
        <input
          type="password"
          name="password"
          id="password"
          required
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="placeholder">Password</span>
      </div>

      {errors.password && touched.password && (
        <p className="form-input-error">{errors.password}</p>
      )}

      <Button type="submit" className="form-submit-btn">
        Login
      </Button>
      <Button linkLike className="signup-btn" onClick={props.sellerModeHandler}>
        Dont have an Account? SignUp here.
      </Button>
    </form>
  );
};

export default SellerLogin;
