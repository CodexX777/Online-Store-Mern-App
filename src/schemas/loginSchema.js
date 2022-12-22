import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Please enter a valid e-mail."),
  password: Yup.string()
    .min(6)
    .max(25)
    .required("Please enter atleast 6 characters.")
});
