import React from "react";
import { useFormik } from "formik";
import "./Auth.css";
import { signUpSchema } from "../../schemas/signUpSchema";
import "./Auth.css";
import Button from "../../Shared/FormElements/Button";

const signUpForm = (props) => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNo: 0,
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
    validationSchema: signUpSchema,
    onSubmit: props.authSubmitHandler,
  });
  return (
    <form className="signup-auth-form" onSubmit={handleSubmit}>
      <div className="input-field1">
        <input
          type="text"
          name="name"
          id="name"
          required
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="placeholder">Name</span>
      </div>
      {errors.name && touched.name && (
        <p className="form-input-error1">{errors.name}</p>
      )}
      <div className="input-field2">
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
        <p className="form-input-error2">{errors.email}</p>
      )}
      <div className="input-field3">
        <input
          type="number"
          name="phoneNo"
          id="phoneNo"
          required
          value={values.phoneNo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="placeholder">Phone No</span>
      </div>
      {errors.phoneNo && touched.phoneNo && (
        <p className="form-input-error3">{errors.phoneNo}</p>
      )}
      <div className="input-field4">
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
        <p className="form-input-error4">{errors.password}</p>
      )}
      <Button type="submit" className="signup-form-submit-btn">
        SignUp
      </Button>
      <Button
        linkLike
        type="button"
        className="signup-btn"
        onClick={props.modeSwitchHandler}
      >
        Already have an account? Login here.
      </Button>
    </form>
  );
};

export default signUpForm;
