import * as Yup from "yup";

export const ProdUpdateSchema = Yup.object({
  stock: Yup.number()
    .required("Please enter valid stock."),
  price: Yup.number().min(1)
    .required("Please enter a valid price.")
});
