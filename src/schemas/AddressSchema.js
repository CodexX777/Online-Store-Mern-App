import * as Yup from "yup";

export const AddressSchema = Yup.object({
  address: Yup.string()
    .required("Please enter a valid address.")
});
