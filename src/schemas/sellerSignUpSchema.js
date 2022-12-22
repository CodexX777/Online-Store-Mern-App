import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const sellerSignUpSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  phoneNo: Yup.string()
    .required("Please enter a valid phone no.")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
  GstNo: Yup.string()
    .required("Enter a valid Gst number")
    .min(15, "too short")
    .max(15, "too long"),
  email: Yup.string()
    .email()
    .required("Please enter a valid e-mail."),
  password: Yup.string()
    .min(6)
    .max(25)
    .required("Please enter atleast 6 characters."),
  confirmPassword: Yup.string()
    .required("Please re-enter your password ")
    .oneOf([Yup.ref("password"), null], "Password should match."),
});
