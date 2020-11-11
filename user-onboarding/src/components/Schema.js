import * as Yup from "yup";

export default Yup.object().shape({
  first_name: Yup.string()
    .min(3,"First name must be 3 characters long!")
    .required("First name is required!"),
  last_name: Yup.string()
    .min(3,"Last name must be 3 characters long!")
    .required("Last name is required!"),
  email: Yup.string()
    .email("Must be a valid email!")
    .required("Must include valid email address!"),
  password: Yup.string()
    .min(3,"Password must be 3 characters long!")
    .required("Password is required!"),
  terms: Yup.bool()
    .oneOf([true],"Must accept Terms of Service!")
    .required("Must accept Terms of Service!"),
})