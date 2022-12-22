import * as Yup from "yup";
export const AddProdSchema = Yup.object({
  prodName: Yup.string()
    .min(5)
    .required("Please enter a valid product name (min 5 characters)."),
  prodDesc: Yup.string()
    .min(6)
    .required("Please enter atleast 6 characters."),
  prodPrice: Yup.number().required("Please enter the product price."),
  prodStock: Yup.number().required(
    "Please enter the amount of stocks available."
  ),
  file: Yup.mixed()
    .nullable()
    .required("Please upload a product Image.")
    .test(
      "FILE_SIZE",
      "Uploaded file is too big.",
      (value) => value && value.size <= 2000000
    )
    .test(
      "FILE_TYPE",
      "Uploaded file has an unsupported format.",
      (value) =>
        value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    )
});
