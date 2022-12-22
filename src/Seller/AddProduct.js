import React, { useState, useRef, useContext } from "react";
import "./AddProduct.css";
import { useFormik } from "formik";
import { AddProdSchema } from "../schemas/AddProdSchema";
import previewErrorImg from "../utilities/istockphoto-1095047472-612x612.jpg";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../Shared/FormElements/ErrorModal";
import { useHttpClient } from "../Hooks/http-hook";
import { AuthContext } from "../context/auth-context";

const AddProduct = () => {
  const [preview, setPreview] = useState({});

  const auth = useContext(AuthContext);

  const filePicker = useRef();

  const pickImageHandler = () => {
    filePicker.current.click();
  };

  const { sendRequest, error, isLoading, clearError } = useHttpClient();

  const navigate = useNavigate();

  const addProdSubmitHandler = async (event) => {
    console.log(event);
    console.log(auth.uid);
    try {
      const formData = new FormData();
      formData.append("prodName", event.prodName);
      formData.append("prodStock", event.prodStock);
      formData.append("prodPrice", event.prodPrice);
      formData.append("prodDesc", event.prodDesc);
      formData.append("uid", auth.uid);
      formData.append("file", event.file);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+"/api/myproducts/add",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/");
    } catch (err) {}
  };

  const initialValues = {
    prodName: "",
    prodDesc: "",
    prodPrice: 0,
    prodStock: 0,
    file: null,
  };

  const {
    values,
    handleBlur,
    touched,
    handleChange,
    errors,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddProdSchema,
    onSubmit: addProdSubmitHandler,
  });

  if (values.file) {
    const reader = new FileReader();
    reader.readAsDataURL(values.file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <div className="add-prod-panel">
        <div className="seller-addprod-panel">
          <form onSubmit={handleSubmit}>
            <div className="prod-form">
              <div className="prod-details-panel">
                <div className="input-field prodName">
                  <input
                    type="text"
                    name="prodName"
                    id="prodName"
                    value={values.prodName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="placeholder">Product Name</span>
                </div>

                {errors.prodName && touched.prodName && (
                  <p className="form-input-error">{errors.prodName}</p>
                )}

                <div className="input-field prodPrice">
                  <input
                    type="number"
                    name="prodPrice"
                    id="prodPrice"
                    value={values.prodPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="placeholder">Product Price</span>
                </div>

                {errors.prodPrice && touched.prodPrice && (
                  <p className="form-input-error">{errors.prodPrice}</p>
                )}
                <div className="input-field prodStock">
                  <input
                    type="number"
                    name="prodStock"
                    id="prodStock"
                    value={values.prodStock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="placeholder">Stock available</span>
                </div>

                {errors.prodStock && touched.prodStock && (
                  <p className="form-input-error">{errors.prodStock}</p>
                )}
                <input
                  name="file"
                  id="file"
                  ref={filePicker}
                  type="file"
                  hidden
                  onChange={(e) => {
                    setFieldValue("file", e.target.files[0]);
                  }}
                  onBlur={handleBlur}
                />
              </div>
              <div className="prod-desc-panel">
                <div className="input-field prodDesc">
                  <textarea
                    type="text area"
                    name="prodDesc"
                    id="prodDesc"
                    value={values.prodDesc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write the product description here."
                  />
                  <span className="placeholder"></span>
                </div>

                {errors.prodDesc && touched.prodDesc && (
                  <p className="form-input-error">{errors.prodDesc}</p>
                )}
              </div>
            </div>
            <div className="preview-panel">
              {values.file ? (
                <img
                  className="preview-img-panel"
                  src={preview}
                  alt="productName"
                />
              ) : (
                <img
                  className="preview-img-panel"
                  src={previewErrorImg}
                  alt="productName"
                />
              )}
            </div>

            <button
              type="button"
              className="pick-image-btn"
              onClick={pickImageHandler}
            >
              Pick Image
            </button>
            <button className="add-prod-submit-btn" type="submit">
              Add Product
            </button>
            {errors.file && touched.file && (
              <p className="form-input-error img-pick-error">{errors.file}</p>
            )}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
