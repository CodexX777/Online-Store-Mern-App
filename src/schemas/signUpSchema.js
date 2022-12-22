import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email()
    .required("Please enter a valid e-mail."),
  password: Yup.string()
    .min(6)
    .max(25)
    .required("Please enter atleast 6 characters."),
    phoneNo: Yup.number()
    .required("Please enter a valid phone no.")
});
